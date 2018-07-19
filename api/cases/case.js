const sscsCaseTemplate = require('./sscsCase.template');
const generateRequest = require('../lib/request');
const generatePostRequest = require('../lib/postRequest');
const config = require('../../config');
const valueProcessor = require('../lib/processors/value-processor');
const {getEvents} = require('../events');
const {getDocuments} = require('../documents');

function getCase(caseId, userId, options, caseType = 'Benefit', jurisdiction = 'SSCS') {
    return generateRequest(`${config.services.ccd_data_api}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${caseType}/cases/${caseId}`, options)
}

function postHearing(caseId, userId, options, jurisdictionId = 'SSCS') {
    options.body = {
        case_id: caseId,
        jurisdiction: jurisdictionId,
        panel: [{identity_token: 'string', name: userId}],
        start_date: (new Date()).toISOString()
    };

    return generatePostRequest(`${config.services.coh_cor_api}/continuous-online-hearings`, options)
        .then(hearing => hearing.online_hearing_id);
}

function getHearingId(caseId, userId, options) {
    return generateRequest(`${config.services.coh_cor_api}/continuous-online-hearings?case_id=${caseId}`, options)
        .then(hearing => hearing.online_hearings[0] ? hearing.online_hearings[0].online_hearing_id : postHearing(caseId, userId, options));
}

function getCaseQuestions(hearingId, options) {
    return hearingId && generateRequest(`${config.services.coh_cor_api}/continuous-online-hearings/${hearingId}/questions`, options)
}

function getCaseWithEvents(caseId, userId, hearingId, options, caseType, jurisdiction) {
    return Promise.all([
        getCase(caseId, userId, options, caseType, jurisdiction),
        getEvents(caseId, userId, options, caseType, jurisdiction),
        getCaseQuestions(hearingId, options)
    ]);
}


function replaceSectionValues(section, caseData) {
    if (section.sections && section.sections.length) {
        section.sections.forEach(childSection => {
            replaceSectionValues(childSection, caseData);
        });
    } else {
        section.fields.forEach(field => {
            field.value = valueProcessor(field.value, caseData)
        });
    }
}

function getDraftQuestions(questions) {
    return questions.reduce((acc, item) => {
        if (item.current_question_state.state_name !== 'question_drafted') return;

        const key = parseInt(item['question_round']);

        if (!acc[key]) acc[key] = [];

        acc[key].push({
            id: item.question_id,
            header: item.question_header_text,
            body: item.question_body_text,
            owner_reference: item.owner_reference,
            state_datetime: item.current_question_state.state_datetime
        });

        return acc;
    }, []);
}

//GET case callback
module.exports = (req, res, next) => {
    const token = req.auth.token;
    const userId = req.auth.userId;
    const caseId = req.params.case_id;

    const options = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'ServiceAuthorization': req.headers.ServiceAuthorization
        }
    };

    getHearingId(caseId, userId, options)
        .then(hearingId => getCaseWithEvents(caseId, userId, hearingId, options))
        .then(([caseData, events, questions]) => {

            caseData.draft_questions_to_appellant = questions && getDraftQuestions(questions.questions);
            caseData.events = events;

            const schema = JSON.parse(JSON.stringify(sscsCaseTemplate));
            if (schema.details) {
                replaceSectionValues(schema.details, caseData);
            }
            schema.sections.forEach(section => replaceSectionValues(section, caseData));


            const docIds = (caseData.documents || [])
                .filter(document => document.value.documentLink)
                .map(document => {
                    const splitDocLink = document.value.documentLink.document_url.split('/');
                    return splitDocLink[splitDocLink.length - 1];
                });

            getDocuments(docIds, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'ServiceAuthorization': req.headers.ServiceAuthorization,
                    'user-roles': req.auth.data,
                }
            }).then(documents => {
                documents = documents.map(doc => {
                    const splitURL = doc._links.self.href.split('/');
                    doc.id = splitURL[splitURL.length - 1];
                    return doc;
                });

                schema.documents = documents;
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.status(200).send(JSON.stringify(schema));
            });
        }).catch(response => {
        console.log(response.error || response);
        res.status(response.error.status).send(response.error.message);
    });
};
