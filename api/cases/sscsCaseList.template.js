module.exports = {
    "columns": [
        {
            "label": "Parties",
            "order": 2,
            "case_field_id": "parties",
            "lookup": ["$.appeal.appellant.name.firstName", "$.appeal.appellant.name.lastName", "versus DWP"]
        },
        {
            "label": "Type",
            "order": 3,
            "case_field_id": "type",
            "value": "PIP",

        }
        // ,
        // {
        //     "label": "Date",
        //     "order": 5,
        //     "case_field_id": "caseCreated",
        //     "case_field_type": {
        //         "id": "Date",
        //         "type": "Date",
        //         "min": null,
        //         "max": null,
        //         "regular_expression": null,
        //         "fixed_list_items": [],
        //         "complex_fields": [],
        //         "collection_field_type": null
        //     }
        // },
        // {
        //     "label": "Last Action",
        //     "order": 7,
        //     "case_field_id": "caseLastActioned",
        //     "case_field_type": {
        //         "id": "Date",
        //         "type": "Date",
        //         "min": null,
        //         "max": null,
        //         "regular_expression": null,
        //         "fixed_list_items": [],
        //         "complex_fields": [],
        //         "collection_field_type": null
        //     }
        // }
    ],
    "results": []
};
