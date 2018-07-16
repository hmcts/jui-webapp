module.exports = {
    "case_number": {
        "label": "$.case_data.caseReference",
    },
    "columns": [
        {
            "label": "Parties",
            "case_field_id": "parties",
            "value": ["$.case_data.appeal.appellant.name.firstName", "$.case_data.appeal.appellant.name.lastName", "vs DWP"]
        },
        {
            "label": "Type",
            "case_field_id": "type",
            "value": "$.case_data.appeal.benefitType.code",
        },
        {
            "label": "Case Start Date",
            "case_field_id": "caseStartDate",
            "value": "$.created_date",
            "date_format": "d MMMM yyyy \'at\' h:mmaaaaa\'m\'"
        },
        {
            "label": "Date of Last Action",
            "case_field_id": "dateOfLastAction",
            "value": "$.last_modified",
            "date_format": "d MMMM yyyy \'at\' h:mmaaaaa\'m\'"
        }
    ]
};
