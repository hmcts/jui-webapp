
const jp = require('jsonpath');
const express = require('express');
const router = express.Router();


const caseInfo = require('../../raw-case.json');
const schema = require('../../benefit_schema.json');

const divorce = {
    sections: [
        {
            id: 'summary',
            name: 'Summary',
            sections: [
                {
                    id: 'case_details',
                    name: 'Case Details',
                    fields: [
                        {
                            label: 'Case number',
                            lookup: '$.id'
                        },
                        {
                            label: 'Case number',
                            lookup: '$.id'
                        }
                    ]
                }
            ]
        }
    ]
}




const sscs = {
    sections: [
        {
            id: 'summary',
            name: 'Summary',
            type: 'page',
            sections: [
                {
                    id: 'case_details',
                    name: 'Case Details',
                    type: 'summary-panel',
                    fields: [
                        {
                            label: 'Parties',
                            lookup: '$.id'
                        },
                        {
                            label: 'Case number',
                            lookup: '$.id'
                        },
                        {
                            label: 'Case type',
                            lookup: '$.case_type_id'
                        }
                    ]
                }
            ]
        },
        {
            id: 'parties',
            name: 'Parties',
            type: 'page',
            sections: [
                {
                    id: 'case_details',
                    name: 'Case Details',
                    type: 'parties-panel',
                    sections: [
                        {
                            id: 'petitioner',
                            name: 'Petitioner',
                            type: 'tab',
                            fields: [
                                {
                                    label: 'Parties',
                                    lookup: '$.id'
                                },
                                {
                                    label: 'Case number',
                                    lookup: '$.id'
                                },
                                {
                                    label: 'Case type',
                                    lookup: '$.case_type_id'
                                }
                            ]
                        },
                        {
                            id: 'respondent',
                            name: 'Respondent',
                            type: 'tab',
                            fields: [
                                {
                                    label: 'Parties',
                                    lookup: '$.id'
                                },
                                {
                                    label: 'Case number',
                                    lookup: '$.id'
                                },
                                {
                                    label: 'Case type',
                                    lookup: '$.case_type_id'
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            id: 'casefile',
            name: 'Case file',
            type: 'page',
            sections: [
                {
                    id: 'documents',
                    name: '',
                    type: 'document-panel',
                    fields: [
                        {
                            lookup: '$.case_data.evidence.documents'
                        }
                    ]
                }
            ]
        }
    ]
};



function replaceSectionValues(section, caseInfo) {
    if(section.sections && section.sections.length) {
        section.sections.forEach(childSection => {
            replaceSectionValues(childSection, caseInfo);
        });
    }
    else {
        section.fields.forEach(field => {
            field.value = jp.query(caseInfo, field.lookup);
            delete field.lookup;
        });
    }
}


//Get case
router.get('/:case_id', (req, res, next) => {
    const schema = JSON.parse(JSON.stringify(sscs));
    schema.sections.forEach(section => {
        replaceSectionValues(section, caseInfo);
    });
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).send(JSON.stringify(schema));
});


//List of cases
router.get('/', (req, res, next) => {
    res.status(200).send('Get list of cases');
});


module.exports = router;