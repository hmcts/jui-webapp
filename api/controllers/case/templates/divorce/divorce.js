module.exports = {
    details: {
        fields: [
            { value: '$.id' },
            {
                value: [
                    '$.case_data.D8PetitionerFirstName', ' ',
                    '$.case_data.D8PetitionerLastName', ' ',
                    'v', ' ',
                    '$.case_data.D8RespondentFirstName', ' ',
                    '$.case_data.D8RespondentLastName'
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
                                // {
                                //     label: 'Parties',
                                //     value: [
                                //         '$.case_data.D8PetitionerFirstName', ' ',
                                //         '$.case_data.D8PetitionerLastName', ' ',
                                //         'v', ' ',
                                //         '$.case_data.D8RespondentFirstName', ' ',
                                //         '$.case_data.D8RespondentLastName'
                                //     ]
                                // },
                                {
                                    label: 'Case number',
                                    value: '$.id'
                                },
                                {
                                    label: 'Case type',
                                    value: 'Divorce'
                                },
                                {
                                    label: 'Case status',
                                    value: ''
                                },
                                {
                                    label: 'Reason for divorce',
                                    value: ''
                                }
                            ]
                        },
                        {
                            name: 'Representatives',
                            type: 'data-list',
                            fields: [
                                {
                                    label: 'Petitioner',
                                    value: '$.case_data.D8RespondentSolicitorName|if_empty_processor|Unrepresented'
                                },
                                {
                                    label: 'Respondent',
                                    value: '$.case_data.D8RespondentSolicitorName|if_empty_processor|Unrepresented'
                                }
                            ]
                        },
                        {
                            name: 'Linked cases',
                            type: 'data-list',
                            fields: []
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
                            id: 'petitioner',
                            name: 'Petitioner',
                            type: 'tab',
                            fields: [
                                {
                                    label: 'Full name',
                                    value: [
                                        '$.case_data.D8PetitionerFirstName', ' ',
                                        '$.case_data.D8PetitionerLastName'
                                    ]
                                },
                                { label: 'Address', value: '$.case_data.D8DerivedPetitionerHomeAddress' },
                                { label: 'Phone', value: '$.case_data.D8PetitionerPhoneNumber' },
                                { label: 'Email', value: '$.case_data.D8PetitionerEmail' },
                                { label: 'Representative', value: '$.case_data.PetitionerSolicitorName|if_empty_processor|Unrepresented' }
                            ]
                        },
                        {
                            id: 'respondent',
                            name: 'Respondent',
                            type: 'tab',
                            fields: [
                                {
                                    label: 'Full name',
                                    value: [
                                        '$.case_data.D8RespondentFirstName', ' ',
                                        '$.case_data.D8RespondentLastName'
                                    ]
                                },
                                { label: 'Address', value: '$.case_data.D8DerivedRespondentHomeAddress' },
                                { label: 'Phone', value: '$.case_data.RespPhoneNumber' },
                                { label: 'Email', value: '$.case_data.RespEmailAddress' },
                                { label: 'Representative', value: '$.case_data.D8RespondentSolicitorName|if_empty_processor|Unrepresented' }
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
                    fields: [{ value: 'A$.case_data.D8DocumentsUploaded[*].value.DocumentLink|document_processor' }]
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
        }
    ],
    decision: {
        id: 'decision',
        name: 'Make a decision',
        type: 'decision-page',
        options: [
            {
                id: 'true',
                name: 'True'
            },
            {
                id: 'false',
                name: 'False'
            }
        ]
    }
}
