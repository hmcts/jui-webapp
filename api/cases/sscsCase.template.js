module.exports = {
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
                                    lookup: "$.case_data.appeal.appellant.name['firstName','lastName']",
                                    suffix: ' vs DWP'
                                },
                                {
                                    label: 'Case number',
                                    lookup: '$.case_data.caseReference'
                                },
                                {
                                    label: 'Case type',
                                    lookup: '$.case_data.appeal.benefitType.code'
                                }
                            ]
                        },
                        {
                            name: 'Representative',
                            fields: [
                                {
                                    label: 'Judge',
                                    value: 'na'
                                },
                                {
                                    label: 'Medical Member',
                                    value: 'na'
                                },
                                {
                                    label: 'Disability qualified member',
                                    value: 'na'
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
                            lookup: '$.case_data.sscsDocument'
                        }
                    ]
                }
            ]
        }
    ]
};;
