export const template = {
    columns: [
        {
            label: 'Case Reference',
            case_field_id: 'case_ref',
            value: '$.id'
        },
        {
            label: 'Parties',
            case_field_id: 'parties',
            value: [
                '$.case_data.applicantFMName',
                ' ',
                '$.case_data.applicantLName',
                ' ',
                'v',
                ' ',
                '$.case_data.appRespondentFMName',
                ' ',
                '$.case_data.appRespondentLName'
            ]
        },
        {
            label: 'Type',
            case_field_id: 'type',
            value: 'Financial remedy'
        },
        {
            label: 'Decision needed on',
            case_field_id: 'status',
            value: '$.state|case_status_processor'
        },
        {
            label: 'Case received',
            case_field_id: 'createdDate',
            value: '$.created_date',
            date_format: 'd MMM yyyy'
        },
        {
            label: 'Date of Last Action',
            case_field_id: 'lastModified',
            value: '$.last_modified',
            date_format: 'd MMM yyyy'
        }
    ]
}
