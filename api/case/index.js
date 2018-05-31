const jp = require('jsonpath');
const router = require('express').Router();
const rawCase = require('../raw-case.json');
const rawCases = require('../raw-cases.json');
//const schema = require('../benefit_schema.json');

const divorceCaseViewTemplate = {
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

const sscsCaseViewTemplate = {
    sections: [
        {
            id: 'summary',
            name: 'Summary',
            type: 'page',
            sections: [
                {
                    name: 'Summary',
                    type: 'summary-panel',
                    sections: [
                        {
                            name: 'Case Details',
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
                            name: 'Representative',
                            fields: [
                                {
                                    label: 'Judge',
                                    value: 'Prita Shah'
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

const caseListTemplate = {
  "columns": [
    {
      "label": "Parties",
      "order": 2,
      "case_field_id": "parties",
      "case_field_type": {
        "id": "Text",
        "type": "Text",
        "min": null,
        "max": null,
        "regular_expression": null,
        "fixed_list_items": [],
        "complex_fields": [],
        "collection_field_type": null
      }
    },
    {
      "label": "Type",
      "order": 3,
      "case_field_id": "type",
      "case_field_type": {
        "id": "Text",
        "type": "Text",
        "min": null,
        "max": null,
        "regular_expression": null,
        "fixed_list_items": [],
        "complex_fields": [],
        "collection_field_type": null
      }
    },
    {
      "label": "Status",
      "order": 4,
      "case_field_id": "status",
      "case_field_type": {
        "id": "Text",
        "type": "Text",
        "min": null,
        "max": null,
        "regular_expression": null,
        "fixed_list_items": [],
        "complex_fields": [],
        "collection_field_type": null
      }
    },
    {
      "label": "Date",
      "order": 5,
      "case_field_id": "caseCreated",
      "case_field_type": {
        "id": "Date",
        "type": "Date",
        "min": null,
        "max": null,
        "regular_expression": null,
        "fixed_list_items": [],
        "complex_fields": [],
        "collection_field_type": null
      }
    },
    {
      "label": "Docs",
      "order": 6,
      "case_field_id": "docs",
      "case_field_type": {
        "id": "Text",
        "type": "Text",
        "min": null,
        "max": null,
        "regular_expression": null,
        "fixed_list_items": [],
        "complex_fields": [],
        "collection_field_type": null
      }
    },
    {
      "label": "Last Action",
      "order": 7,
      "case_field_id": "caseLastActioned",
      "case_field_type": {
        "id": "Date",
        "type": "Date",
        "min": null,
        "max": null,
        "regular_expression": null,
        "fixed_list_items": [],
        "complex_fields": [],
        "collection_field_type": null
      }
    }
  ],
  "results": []
};

function replaceSectionValues(section, caseInfo) {
    if(section.sections && section.sections.length) {
        section.sections.forEach(childSection => {
            replaceSectionValues(childSection, caseInfo);
        });
    }
    else {
        section.fields.forEach(field => {
            if(field.lookup) {
                field.value = jp.query(caseInfo, field.lookup);
                delete field.lookup;
            }
        });
    }
}

function rawCasesReducer(cases) {
  return cases.reduce((acc, curr) => {
    acc.push({
      "case_id": curr.id,
      "case_fields": {
        "caseReference": null,
        "parties": `${curr['case_data'].appeal.appellant.name.firstName} vs ${curr['case_data'].appeal.appellant.name.lastName}`,
        "type": curr.jurisdiction,
        "status": 'unknown',
        "caseCreated": curr.created_date,
        "docs": `${curr['case_data'].evidence.documents.length} Docs`,
        "caseLastActioned": curr.last_modified
      }
    });
    
    return acc;
    
  }, []);
}

//Get case
router.get('/:case_id', (req, res, next) => {
    const schema = JSON.parse(JSON.stringify(sscsCaseViewTemplate));

    schema.sections.forEach(section => {
        replaceSectionValues(section, rawCase);
    });

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).send(JSON.stringify(schema));
});

//List of cases
router.get('/', (req, res, next) => {
  const aggregatedData = {...caseListTemplate, results: rawCasesReducer(rawCases)};
  
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).send(JSON.stringify(aggregatedData));
});

module.exports = router;
