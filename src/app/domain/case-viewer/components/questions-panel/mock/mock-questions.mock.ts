// TODO add an interface
export const mockQuestion = {
    'name': 'Questions',
    'type': 'questions-panel',
    'fields': [
    {
        'value': [
            {
                'question_round_number': '1',
                'state': 'question_drafted',
                'questions': [
                    {
                        'id': 'be8ac935-ed7a-47b5-84ce-b5aa25e64512',
                        'header': 'Test header 1',
                        'body': 'Test body 1',
                        'owner_reference': '5899',
                        'state_datetime': new Date(Date.UTC(2018, 6, 13, 8, 52, 38)),
                        'state': 'question_drafted'
                    },
                    {
                        'id': 'c7935438-b54c-4dad-bbe8-34fff72caf81',
                        'header': 'Test header 2',
                        'body': 'Test Header 2',
                        'owner_reference': '5899',
                        'state_datetime': new Date(Date.UTC(2018, 6, 14, 8, 52, 38)),
                        'state': 'question_drafted'
                    }
                ]
            }
        ]
    }
]
};

export const emptyQuestion = {
    'name': 'Questions',
    'type': 'questions-panel',
    'fields': [
        {
            'value': []
        }
    ]
};
export const questionIssuePending = {
    'name': 'Questions',
    'type': 'questions-panel',
    'fields': [
    {
        'value': [
            {
            'question_round_number': '1',
            'state': 'question_issue_pending',
            'questions': [
                {
                    'id': 'be8ac935-ed7a-47b5-84ce-b5aa25e64512',
                    'header': 'Test header 1',
                    'body': 'Test body 1',
                    'owner_reference': '5899',
                    'state_datetime': new Date(Date.UTC(2018, 6, 13, 8, 52, 38)),
                    'state': 'question_issue_pending'
                },
                {
                    'id': 'c7935438-b54c-4dad-bbe8-34fff72caf81',
                    'header': 'Test header 2',
                    'body': 'Test Header 2',
                    'owner_reference': '5899',
                    'state_datetime': new Date(Date.UTC(2018, 6, 14, 8, 52, 38)),
                    'state': 'question_issue_pending'
                }
            ]
        }]
    }
]
};

export const questionIssuePending2 = {
    'name': 'Questions',
    'type': 'questions-panel',
    'fields': [
        {
            'value': [
                {
                'question_round_number': '1',
                'state': 'question_issue_pending',
                'questions': [
                    {
                        'id': 'be8ac935-ed7a-47b5-84ce-b5aa25e64512',
                        'header': 'Test header 1',
                        'body': 'Test body 1',
                        'owner_reference': '5899',
                        'state_datetime': new Date(Date.UTC(2018, 6, 13, 8, 52, 38)),
                        'state': 'question_answered'
                    },
                    {
                        'id': 'c7935438-b54c-4dad-bbe8-34fff72caf81',
                        'header': 'Test header 2',
                        'body': 'Test Header 2',
                        'owner_reference': '5899',
                        'state_datetime': new Date(Date.UTC(2018, 6, 14, 8, 52, 38)),
                        'state': 'question_issued'
                    }
                ]
            }]
        }
    ]
};
