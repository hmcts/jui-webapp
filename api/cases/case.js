const sscsCaseTemplate = require('./sscsCase.template');
const generateRequest = require('../lib/request');
const config = require('../../config');
const valueProcessor = require('../lib/value-processor');
const {getEvents} = require('../events');
const {getDocuments} = require('../documents');

function getCase(caseId, userId, options, caseType = 'Benefit', jurisdiction = 'SSCS') {
    return generateRequest(`${config.services.ccd_data_api}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${caseType}/cases/${caseId}`, options)
}

function getCaseWithEvents(caseId, userId, options, caseType = 'Benefit', jurisdiction = 'SSCS') {
    return Promise.all([
        getCase(caseId, userId, options, caseType, jurisdiction),
        getEvents(caseId, userId, options, caseType, jurisdiction)
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

//GET case callback
module.exports = (req, res, next) => {
    const token = req.auth.token;
    const userId = req.auth.userId;
    const caseId = req.params.case_id;

    getCaseWithEvents(caseId, userId, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'ServiceAuthorization': req.headers.ServiceAuthorization
        }
    }).then(([caseData, events]) => {

        caseData.events = events;

        const schema = JSON.parse(JSON.stringify(sscsCaseTemplate));
        if (schema.details) {
            replaceSectionValues(schema.details, caseData);
        }
        schema.sections.forEach(section => replaceSectionValues(section, caseData));
        const docIds = caseData.documents
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
                doc.id = splitURL[splitURL.length-1];
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
