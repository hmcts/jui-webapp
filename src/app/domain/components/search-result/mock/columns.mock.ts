export const mockColums = [
    {
        'label': 'Parties',
        'order': 2,
        'case_field_id': 'parties',
        'lookup': [
            '$.appeal.appellant.name.firstName',
            '$.appeal.appellant.name.lastName',
            'vs DWP'
        ]
    },
        {
            'label': 'Type',
            'order': 3,
            'case_field_id': 'type',
            'lookup': 'PIP',

        },
        {
            'label': 'Case received',
            'order': 4,
            'case_field_id': 'createdDate',
            'lookup': '$.created_date',
            'date_format': 'd MMMM yyyy \'at\' h:mmaaaaa\'m\''
        },
        {
            'label': 'Date of Last Action',
            'order': 5,
            'case_field_id': 'lastModified',
            'lookup': '$.last_modified',
            'date_format': 'd MMMM yyyy \'at\' h:mmaaaaa\'m\''
        }
    ];
