const sscsCaseTemplate = require('./sscsCase.template');
const generateRequest = require('../lib/request');
const config = require('../../config');
const jp = require('jsonpath');

function getCase(caseId, userId, options, caseType = 'Benefit', jurisdiction = 'SSCS') {
    return generateRequest(`${config.services.ccd_data_api}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${caseType}/cases/${caseId}`, options)
}

function replaceSectionValues(section, caseData) {
    if(section.sections && section.sections.length) {
        section.sections.forEach(childSection => {
            replaceSectionValues(childSection, caseData);
        });
    } else {
        section.fields.forEach(field => {
            if(field.lookup) {
                let value = jp.query(caseData, field.lookup);
                
                field.value = Array.isArray(value) ? value.join(' ') : value;
                if (field.value && field.suffix) {
                    field.value += field.suffix;
                }
                
                delete field.suffix;
                delete field.lookup;
            }
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
    
    getCase(caseId, userId, {
        headers : {
            'Authorization' : `Bearer ${token}`,
            'ServiceAuthorization' : req.headers.ServiceAuthorization
        }
    }).then(caseData => {
        
        const schema = JSON.parse(JSON.stringify(sscsCaseTemplate));
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
    }).catch(e => console.log(e))
};
