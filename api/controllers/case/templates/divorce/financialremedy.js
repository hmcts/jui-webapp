module.exports = {
    details: {
        fields: [
            { value: '$.id' },
            {
                value: [
                    '$.case_data.applicantFMName', ' ',
                    '$.case_data.applicantLName', ' ',
                    'v', ' ',
                    '$.case_data.appRespondentFMName', ' ',
                    '$.case_data.appRespondentLName'
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
                                        '$.case_data.applicantFMName', ' ',
                                        '$.case_data.applicantLName', ' ',
                                        'v', ' ',
                                        '$.case_data.appRespondentFMName', ' ',
                                        '$.case_data.appRespondentLName'
                                    ]
                                },
                                {
                                    label: 'Case type',
                                    value: 'Financial remedy'
                                },
                                {
                                    label: 'Case number',
                                    value: '$.id'
                                }
                            ]
                        },
                        {
                            name: 'Related cases',
                            type: 'data-list',
                            fields: [
                                {
                                    label: 'Divorce',
                                    value: '$.case_data.divorceCaseNumber'
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
                            id: 'applicant',
                            name: 'Applicant',
                            type: 'tab',
                            fields: [
                                {
                                    label: 'Full name',
                                    value: ['$.case_data.applicantFMName', ' ', '$.case_data.applicantLName']
                                },
                                { label: 'Address', value: '' },
                                { label: 'Phone', value: '' },
                                { label: 'Email', value: '' },
                                { label: 'Representative', value: '$.case_data.solicitorName|if_empty_processor|Unrepresented' }
                            ]
                        },
                        {
                            id: 'applicant-sol',
                            name: 'Applicant’s solicitor',
                            type: 'tab',
                            fields: [
                                { label: 'Reference', value: '$.case_data.solicitorReference' },
                                { label: 'Full name', value: '$.case_data.solicitorName' },
                                { label: 'Solicitor firm', value: '$.case_data.solicitorFirm' },
                                {
                                    label: 'Address',
                                    value: [
                                        '$.case_data.solicitorAddress1|newline_processor',
                                        '$.case_data.solicitorAddress2|newline_processor',
                                        '$.case_data.solicitorAddress3|newline_processor',
                                        '$.case_data.solicitorAddress4|newline_processor',
                                        '$.case_data.solicitorAddress5'
                                    ]
                                },
                                { label: 'Phone', value: '$.case_data.solicitorPhone' },
                                { label: 'Email', value: '$.case_data.solicitorEmail' },
                                { label: 'DX number', value: '$.case_data.solicitorDXnumber' }
                            ]
                        },
                        {
                            id: 'respondent',
                            name: 'Respondent',
                            type: 'tab',
                            fields: [
                                {
                                    label: 'Full name',
                                    value: ['$.case_data.appRespondentFMName', ' ', '$.case_data.appRespondentLName']
                                },
                                {
                                    label: 'Address',
                                    value: [
                                        '$.case_data.respondentAddress1|newline_processor',
                                        '$.case_data.respondentAddress2|newline_processor',
                                        '$.case_data.respondentAddress3|newline_processor',
                                        '$.case_data.respondentAddress4|newline_processor',
                                        '$.case_data.respondentAddress5|newline_processor',
                                        '$.case_data.respondentAddress6'
                                    ]
                                },
                                { label: 'Phone', value: '$.case_data.respondentPhone' },
                                { label: 'Email', value: '$.case_data.respondentEmail' },
                                { label: 'Representative', value: '$.case_data.rSolicitorName|if_empty_processor|Unrepresented' }
                            ]
                        },
                        {
                            id: 'respondent-sol',
                            name: 'Respondent’s solicitor',
                            type: 'tab',
                            fields: [
                                { label: 'Reference.', value: '$.case_data.rSolicitorReference' },
                                { label: 'Full name', value: '$.case_data.rSolicitorName' },
                                { label: 'Solicitor firm', value: '$.case_data.rSolicitorFirm' },
                                {
                                    label: 'Address',
                                    value: [
                                        '$.case_data.rSolicitorAddress1|newline_processor',
                                        '$.case_data.rSolicitorAddress2|newline_processor',
                                        '$.case_data.rSolicitorAddress3|newline_processor',
                                        '$.case_data.rSolicitorAddress4|newline_processor',
                                        '$.case_data.rSolicitorAddress5'
                                    ]
                                },
                                { label: 'Phone', value: '$.case_data.rSolicitorPhone' },
                                { label: 'Email', value: '$.case_data.rSolicitorEmail' },
                                { label: 'DX number', value: '$.case_data.rSolicitorDXnumber' }
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
                            label: 'frDocument',
                            value: '$.case_data.frDocument|document_processor'
                        },
                        {
                            label: 'd81Joint',
                            value: '$.case_data.d81Joint|document_processor'
                        },
                        {
                            label: 'd81Applicant',
                            value: '$.case_data.d81Applicant|document_processor'
                        },
                        {
                            label: 'd81Respondent',
                            value: '$.case_data.d81Respondent|document_processor'
                        },
                        {
                            label: 'consentOrder',
                            value: '$.case_data.consentOrder|document_processor'
                        },
                        {
                            label: 'consentOrderText',
                            value: '$.case_data.consentOrderText|document_processor'
                        },
                        {
                            label: 'divorceUploadEvidence1',
                            value: '$.case_data.divorceUploadEvidence1|document_processor'
                        },
                        {
                            label: 'pensionCollection',
                            value: 'A$.case_data.pensionCollection[*].value.uploadedDocument|document_processor'
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
                id: 'approve-consent-order',
                name: 'Approve consent order'
            },
            {
                id: 'ask-for-more-information',
                name: 'Ask for more information'
            },
            {
                id: 'send-annotated-order-to-solicitors',
                name: 'Send annotated order to solicitors'
            },
            {
                id: 'list-for-hearing',
                name: 'List for hearing'
            },
            {
                id: 'reject-consent-order',
                name: 'Reject consent order'
            }
        ]
    }
}
