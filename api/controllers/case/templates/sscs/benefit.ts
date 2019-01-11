export const template = {
    details: {
        fields: [
            { value: '$.case_data.caseReference' },
            {
                value: [
                    '$.case_data.appeal.appellant.name.firstName',
                    ' ',
                    '$.case_data.appeal.appellant.name.lastName',
                    ' ',
                    'v',
                    ' ',
                    'DWP'
                ]
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
                            name: 'Recent events',
                            type: 'timeline',
                            fields: [{ value: '$.events' }]
                        },
                        {
                            name: 'Action on',
                            type: 'case-action-alert',
                            fields: [{ value: '$.state|case_status_processor' }]
                        },
                        {
                            name: 'Case details',
                            type: 'data-list',
                            fields: [
                                {
                                    label: 'Parties',
                                    value: [
                                        '$.case_data.appeal.appellant.name.firstName',
                                        ' ',
                                        '$.case_data.appeal.appellant.name.lastName',
                                        ' ',
                                        'v',
                                        ' ',
                                        'DWP'
                                    ]
                                },
                                {
                                    label: 'Case number',
                                    value: '$.case_data.caseReference'
                                },
                                {
                                    label: 'Case type',
                                    value: '$.case_data.appeal.benefitType.code'
                                },
                                {
                                    label: 'Tribunal centre',
                                    value: '$.case_data.region'
                                },
                                {
                                    label: 'Additional requirements',
                                    value: 'A$.case_data.appeal.hearingOptions.arrangements[*]|newline_processor'
                                }
                            ]
                        },
                        {
                            name: 'Panel members',
                            type: 'data-list',
                            fields: [
                                {
                                    label: 'Judge',
                                    value: '$.case_data.panel.assignedTo'
                                },
                                {
                                    label: 'Medical member',
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
                    id: 'parties-tabs',
                    name: 'Parties',
                    type: 'parties-panel',
                    sections: [
                        {
                            id: 'appellant',
                            name: 'Appellant',
                            type: 'tab',
                            fields: [
                                {
                                    label: 'Full name',
                                    value: [
                                        '$.case_data.appeal.appellant.name.title',
                                        ' ',
                                        '$.case_data.appeal.appellant.name.firstName',
                                        ' ',
                                        '$.case_data.appeal.appellant.name.middlename',
                                        ' ',
                                        '$.case_data.appeal.appellant.name.lastName'
                                    ]
                                },
                                { label: 'Date of birth', value: '$.case_data.appeal.appellant.identity.dob' },
                                { label: 'National insurances number', value: '$.case_data.appeal.appellant.identity.nino' },
                                {
                                    label: 'Address',
                                    value: [
                                        '$.case_data.appeal.appellant.address.line1|newline_processor',
                                        '$.case_data.appeal.appellant.address.line2|newline_processor',
                                        '$.case_data.appeal.appellant.address.line3|newline_processor',
                                        '$.case_data.appeal.appellant.address.town|newline_processor',
                                        '$.case_data.appeal.appellant.address.county|newline_processor',
                                        '$.case_data.appeal.appellant.address.postcode|newline_processor',
                                        '$.case_data.appeal.appellant.address.country|newline_processor'
                                    ]
                                },
                                { label: 'Phone', value: '$.case_data.appeal.appellant.contact.phone' },
                                { label: 'Mobile', value: '$.case_data.appeal.appellant.contact.mobile' },
                                { label: 'Email', value: '$.case_data.appeal.appellant.contact.email' },
                                { label: 'Appointee', value: '$.case_data.appeal.appellant.isAppointee' }
                            ]
                        },
                        // {
                        //     id: 'representative',
                        //     name: 'Representative',
                        //     type: 'tab',
                        //     fields: [
                        //         {
                        //             label: 'Representative',
                        //             value: [
                        //                 '$.case_data.appeal.representative.hasRepresentative|newline_processor',
                        //                 '$.case_data.appeal.representative.organisation|newline_processor',
                        //                 '$.case_data.appeal.representative.name.firstName|newline_processor',
                        //                 '$.case_data.appeal.representative.name.middleName|newline_processor',
                        //                 '$.case_data.appeal.representative.name.lastName|newline_processor'
                        //             ]
                        //         }
                        //     ]
                        // }
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
                    fields: [{ value: 'A$.case_data.sscsDocument[*].value.documentLink|document_processor' }]
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
                    fields: [{ value: '$.events' }]
                }
            ]
        },
        {
            id: 'questions',
            name: 'Questions',
            type: 'page',
            sections: [
                {
                    name: 'Questions to appellant',
                    type: 'questions-panel',
                    fields: [{ value: '$.question_data' }]
                }
            ]
        }
    ],
    decision: {
        id: 'decision',
        name: 'Make a decision',
        type: 'decision-page',
        options: [
            {
                id: 'appeal-upheld',
                name: 'Appeal upheld'
            },
            {
                id: 'appeal-denied',
                name: 'Appeal denied'
            }
        ]
    }
}
