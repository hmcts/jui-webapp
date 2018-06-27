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
                                    value: ["$.case_data.appeal.appellant.name.firstName", "$.case_data.appeal.appellant.name.lastName", "vs DWP"],
                                },
                                {
                                    label: 'Case number',
                                    value: '$.case_data.caseReference'
                                },
                                {
                                    label: 'Case type',
                                    value: '$.case_data.appeal.benefitType.code'
                                }
                            ]
                        },
                        {
                            name: 'Representatives',
                            fields: [
                                {
                                    label: 'Judge',
                                    value: '$.case_data.panel.assignedTo'
                                },
                                {
                                    label: 'Medical Member',
                                    value: '$.case_data.panel.medicalMember'
                                },
                                {
                                    label: 'Disability qualified member',
                                    value: '$.case_data.panel.disabilityQualifiedMember'
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
                                    value: '$.id'
                                },
                                {
                                    label: 'Case number',
                                    value: '$.id'
                                },
                                {
                                    label: 'Case type',
                                    value: '$.case_type_id'
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
                                    value: '$.id'
                                },
                                {
                                    label: 'Case number',
                                    value: '$.id'
                                },
                                {
                                    label: 'Case type',
                                    value: '$.case_type_id'
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
                            value: '$.case_data.sscsDocument'
                        }
                    ]
                }
            ]
        }
    ]
};;
