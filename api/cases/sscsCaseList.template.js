module.exports = {
    "columns": [
        {
            "label": "Parties",
            "order": 2,
            "case_field_id": "parties",
            "value": ["$.case_data.appeal.appellant.name.firstName", "$.case_data.appeal.appellant.name.lastName", "versus DWP"]
        },
        {
            "label": "Type",
            "order": 3,
            "case_field_id": "type",
            "value": "PIP",

        },
        {
            "label": "Case Start Date",
            "order": 4,
            "case_field_id": "caseStartDate",
            "value": "$.created_date",
            "date_format": "d MMMM yyyy \'at\' h:mma"
        },
        {
            "label": "Date of Last Action",
            "order": 5,
            "case_field_id": "dateOfLastAction",
            "value": "$.last_modified",
            "date_format": "d MMMM yyyy \'at\' h:mma"
        }
    ],
    "results": []
};
