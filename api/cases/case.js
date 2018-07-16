const sscsCaseTemplate = require('./sscsCase.template');
const generateRequest = require('../lib/request');
const generatePostRequest = require('../lib/postRequest');
const config = require('../../config');
const valueProcessor = require('../lib/value-processor');

function getCase(caseId, userId, options, caseType = 'Benefit', jurisdiction = 'SSCS') {
    return generateRequest(`${config.services.ccd_data_api}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${caseType}/cases/${caseId}`, options)
}

function getCaseEvents(caseId, userId, options, caseType = 'Benefit', jurisdiction = 'SSCS') {
    return generateRequest(`${config.services.ccd_data_api}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${caseType}/cases/${caseId}/events`, options)
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
        getCaseEvents(caseId, userId, options, caseType, jurisdiction),
        getCaseQuestions(hearingId, options)
    ]);
}

function reduceEvent(event) {
    if (event) {
        return {
            event_name:event.event_name,
            user_first_name:event.user_first_name,
            user_last_name:event.user_last_name,
            created_date:event.created_date
        }
    }
}

function replaceSectionValues(section, caseData) {
    if(section.sections && section.sections.length) {
        section.sections.forEach(childSection => {
            replaceSectionValues(childSection, caseData);
        });
    } else {
        section.fields.forEach(field => {
            field.value = valueProcessor(field.value, caseData)
        });
    }
}

function caseFileReducer(caseId, caseFile) {
    return caseFile.reduce((acc, curr) => {
        const fileName = curr.value.documentLink.document_filename;
        const docStoreId = curr.value.documentLink.document_url.split('/').pop();
        const docType = fileName.split('.').pop();
        const isImage = ['gif', 'jpg', 'png'].includes(docType);
        const isPdf = 'pdf' === docType;
        const isUnsupported = !isImage && !isPdf;

        acc.push({
            'id' : docStoreId,
            'href' : `/viewcase/${caseId}/casefile/${docStoreId}`,
            'label' : curr.value.documentType,
            'src' : `/api/documents/${docStoreId}`,
            'isImage' : isImage,
            'isPdf' : isPdf,
            'isUnsupported' : isUnsupported
        });

        return acc;

    }, []);
}

function getDraftQuestions(questions) {
    return questions.reduce((acc, item) => {
        if (item.current_question_state.state_name !== 'DRAFTED') return;
        
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
    const caseId = req.params.case_id; // 1531309876267122
    const options = {
        headers : {
            'Authorization' : `Bearer ${token}`,
            'ServiceAuthorization' : req.headers.ServiceAuthorization
        }
    };
    
    getHearingId(caseId, userId, options)
        .then(hearingId => getCaseWithEvents(caseId, userId, hearingId, options))
        .then( ([caseData, events, questions])=> {
            const schema = JSON.parse(JSON.stringify(sscsCaseTemplate));
            
            caseData.events = events != null ? events.map(e => reduceEvent(e)) : [];
            caseData.draft_questions_to_appellant = questions && getDraftQuestions(questions.questions);
            
            if(schema.details) replaceSectionValues(schema.details, caseData);
            
            schema.sections.forEach(section => replaceSectionValues(section, caseData));
    
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.status(200).send(JSON.stringify(schema));
        }).catch(response => {
            console.log(response.error || response);
            res.status(response.error.status).send(response.error.message);
        });
};
