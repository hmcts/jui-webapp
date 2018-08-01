module.exports = {
    case_number: { label: '$.case_data.divorceCaseNumber' },
    columns: [
        {
            label: 'Parties',
            order: 2,
            case_field_id: 'parties',
            value: ['$.case_data.applicantFMName', '$.case_data.applicantLName', 'vs', '$.case_data.appRespondentFMName', '$.case_data.appRespondentLName']
        },
        {
            label: 'Type',
            order: 3,
            case_field_id: 'type',
            value: '$.case_type_id'

        },
        {
            label: 'Start date',
            order: 4,
            case_field_id: 'caseStartDate',
            value: '$.created_date',
            date_format: 'd MMM yyyy'
        },
        {
            label: 'Date of last event',
            order: 5,
            case_field_id: 'dateOfLastAction',
            value: '$.last_modified',
            date_format: 'd MMM yyyy'
        }
    ]
};
