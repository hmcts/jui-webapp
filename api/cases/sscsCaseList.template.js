module.exports = {
    "case_number": {
        "label": "$.case_data.caseReference",
    },
    "columns": [
        {
            "label": "Parties",
            "case_field_id": "parties",
            "value": ["$.case_data.appeal.appellant.name.firstName", "$.case_data.appeal.appellant.name.lastName", "v DWP"],
            "hide" : false
        },
        {
            "label": "Type",
            "case_field_id": "type",
            "value": "$.case_data.appeal.benefitType.code",
            "hide" : false
        },
        {
            "label": "Status",
            "case_field_id": "status",
            "value": "$.status",
            "hide" : false
        },
        {
            "label": "Start Date",
            "case_field_id": "caseStartDate",
            "value": "$.created_date",
            "date_format": "d MMM yyyy",
            "hide" : false
        },
        {
            "label": "Date of last event",
            "case_field_id": "dateOfLastAction",
            "value": "$.last_modified",
            "date_format": "d MMM yyyy",
            "hide" : false
        },
        {
            "label": "Date of last event",
            "case_field_id": "dateOfLastActionSortable",
            "value": "$.last_modified",
            "date_format": "d MMMM yyyy \'at\' h:mmaaaaa\'m\'",
            "hide" : true
        }
    ]
};
