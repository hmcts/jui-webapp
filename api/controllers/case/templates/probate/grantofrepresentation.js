module.exports = {
    details: {
        fields: [
            { value: '$.id' },
            {
                value: [
                    '$.case_data.deceasedForenames', ' ',
                    '$.case_data.deceasedSurname'
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
                            name: 'Case details',
                            type: 'data-list',
                            fields: [
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
                                    label: 'Parties',
                                    value: [
                                        '$.case_data.deceasedForenames', ' ',
                                        '$.case_data.deceasedSurname'
                                    ]
                                },
                                {
                                    label: 'Case type',
                                    value: 'Grant of representation'
                                },
                                {
                                    label: 'Case number',
                                    value: '$.id'
                                }
                            ]
                        },
                        {
                            name: '',
                            type: 'data-list',
                            fields: []
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
                    fields: []
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
