module.exports = {
    "columns": [
        {
            "label": "Case number",
            "order": 1,
            "case_field_id": "caseNumber",
            "value": "$.divorceCaseNumber"
        },
        {
            "label": "Parties",
            "order": 2,
            "case_field_id": "parties",
            "value": ["$.applicantFMName", "$.applicantLName", "vs", "$.appRespondentFMName", "$.appRespondentLName"]
        },
        {
            "label": "Type",
            "order": 3,
            "case_field_id": "type",
            "value": "$.caseType"

        },
        {
            "label": "Case Start Date",
            "order": 4,
            "case_field_id": "caseStartDate",
            "value": "$.created_date",
            "date_format": "d MMMM yyyy \'at\' h:mmaaaaa\'m\'"
        },
        {
            "label": "Date of Last Action",
            "order": 5,
            "case_field_id": "dateOfLastAction",
            "value": "$.last_modified",
            "date_format": "d MMMM yyyy \'at\' h:mmaaaaa\'m\'"
        }
    ],
    "results": []
}; 
