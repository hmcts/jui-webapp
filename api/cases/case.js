const sscsCaseTemplate = require('./sscsCase.template');
const generateRequest = require('../lib/request');
const config = require('../../config');
const valueProcessor = require('../lib/value-processor');

function getCase(caseId, userId, options, caseType = 'Benefit', jurisdiction = 'SSCS') {
    return generateRequest(`${config.services.ccd_data_api}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${caseType}/cases/${caseId}`, options)
}

function getCaseEvents(caseId, userId, options, caseType = 'Benefit', jurisdiction = 'SSCS') {
    return generateRequest(`${config.services.ccd_data_api}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${caseType}/cases/${caseId}/events`, options)
}

function getCaseWithEvents(caseId, userId, options, caseType = 'Benefit', jurisdiction = 'SSCS') {
    return Promise.all([
        getCase(caseId, userId, options, caseType, jurisdiction),
        getCaseEvents(caseId, userId, options, caseType, jurisdiction)
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

//GET case callback
module.exports = (req, res, next) => {
    const token = req.auth.token;
    const userId = req.auth.userId;
    const caseId = req.params.case_id;

    getCaseWithEvents(caseId, userId, {
        headers : {
            'Authorization' : `Bearer ${token}`,
            'ServiceAuthorization' : req.headers.ServiceAuthorization
        }
    }).then( ([caseData, events])=> {

        caseData.events = events != null ? events.map(e => reduceEvent(e)) : [];

        const schema = JSON.parse(JSON.stringify(sscsCaseTemplate));
        if(schema.details) {
            replaceSectionValues(schema.details, caseData);
        }
        schema.sections.forEach(section => replaceSectionValues(section, caseData));
        /**
         * DO NOT DELETE: commenting out spike until story is available
         */
        // const rawCaseFile = schema.sections.filter(section => section.id === 'casefile')
        //
        // const hasDocuments = rawCaseFile[0].sections[0].fields[0].value.length > 0;
        // const caseFile = hasDocuments ? caseFileReducer(caseId, rawCaseFile[0].sections[0].fields[0].value[0]) : null;
        //
        // schema.sections[schema.sections.findIndex(el => el.id === 'casefile')].sections = caseFile;

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).send(JSON.stringify(schema));
    }).catch(response => {
        console.log(response.error || response);
        res.status(response.error.status).send(response.error.message);
    });
};
