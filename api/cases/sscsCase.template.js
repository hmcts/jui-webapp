module.exports = {
    details: {
        fields: [
            {
                value: '$.case_data.caseReference'
            },
            {
                value: ["$.case_data.appeal.appellant.name.firstName", "$.case_data.appeal.appellant.name.lastName", "vs DWP"],
            }
        ]
    },
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
                            type: 'data-list',
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
                            type: 'data-list',
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
                        },
                        {
                            name: 'Recent events',
                            type: 'timeline',
                            fields: [
                                {
                                    value: '$.events'
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
                    name: 'Case file',
                    type: 'document-panel',
                    fields: [
                        {
                            value: '$.case_data.sscsDocument'
                        }
                    ]
                }
            ]
        },
        {
            id: 'timeline',
            name: 'Timeline',
            type: 'page',
            sections: [
                {
                    id: 'events',
                    name: 'Timeline',
                    type: 'timeline-panel',
                    fields: [
                        {
                            value: '$.events'
                        }
                    ]
                }
            ]
        }
    ]
};;
