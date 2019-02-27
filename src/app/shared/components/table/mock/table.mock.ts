export interface JuiCaseField {
    id: string;
    type: string;
    min: null;
    max: null;
    regular_expression: null;
    fixed_list_items: Array<any>;
    complex_fields: Array<any>;
    collection_field_type: null;
}

export interface JuiColumn {
    label: string;
    order: number;
    case_field_id: string;
    case_field_type: JuiCaseField;
}

export const mockColumData: Array<JuiColumn> = [
    {
        'label': 'Case number',
        'order': 2,
        'case_field_id': 'case_ref',
        'case_field_type': {
            'id': 'Text',
            'type': 'Text',
            'min': null,
            'max': null,
            'regular_expression': null,
            'fixed_list_items': [],
            'complex_fields': [],
            'collection_field_type': null
        }
    },
    {
        'label': 'Parties',
        'order': 2,
        'case_field_id': 'parties',
        'case_field_type': {
            'id': 'Text',
            'type': 'Text',
            'min': null,
            'max': null,
            'regular_expression': null,
            'fixed_list_items': [],
            'complex_fields': [],
            'collection_field_type': null
        }
    },
    {
        'label': 'Type',
        'order': 3,
        'case_field_id': 'type',
        'case_field_type': {
            'id': 'Text',
            'type': 'Text',
            'min': null,
            'max': null,
            'regular_expression': null,
            'fixed_list_items': [],
            'complex_fields': [],
            'collection_field_type': null
        }
    },
    {
        'label': 'Decision needed on',
        'order': 4,
        'case_field_id': 'status',
        'case_field_type': {
            'id': 'Text',
            'type': 'Text',
            'min': null,
            'max': null,
            'regular_expression': null,
            'fixed_list_items': [],
            'complex_fields': [],
            'collection_field_type': null
        }
    },
    {
        'label': 'Case received',
        'order': 5,
        'case_field_id': 'caseCreated',
        'case_field_type': {
            'id': 'Date',
            'type': 'Date',
            'min': null,
            'max': null,
            'regular_expression': null,
            'fixed_list_items': [],
            'complex_fields': [],
            'collection_field_type': null
        }
    },
    {
        'label': 'Date of last event',
        'order': 7,
        'case_field_id': 'lastModified',
        'case_field_type': {
            'id': 'Date',
            'type': 'Date',
            'min': null,
            'max': null,
            'regular_expression': null,
            'fixed_list_items': [],
            'complex_fields': [],
            'collection_field_type': null
        }
    }
];
export const mockResultData = {
    'case_id': 1528476356357908,
    'case_jurisdiction': 'SSCS',
    'case_type_id': 'Benefit',
    'assignedToJudge': 'juitestuser2@gmail.com',
    'assignedToJudgeReason': 'Draft consent order',
    'case_fields':{
        'case_ref': 1528476356357908,
        'createdDate': '2019-02-18T15:12:12.269',
        'lastModified': '2019-02-18T15:15:41.141',
        'parties': 'Feb 18th 3.05pm First Middle Names Feb 18th 3.05pm Last Name v Respondent First and Middle Last Name 2',
        'status': {
            'name': 'Draft consent order',
            'actionGoTo': 'casefile',
            'ID': ''
        },
    'type': "PIP"
    }
};

export const mockResultData2 = {
        'case_id': 1528476358303157,
        'case_jurisdiction': 'SSCS',
        'case_type_id': 'Benefit',
        'assignedToJudge': 'juitestuser2@gmail.com',
        'assignedToJudgeReason': 'Draft consent order',
        'case_fields': {
            'caseRef': 1528476358303157,
            'createdDate': '2019-02-18T15:12:12.269',
            'lastModified': '2019-02-18T15:15:41.141',
            'parties': 'B v May_417228',
            'status': {
                'name': 'Draft Consent Order',
                'actionGoTo': 'casefile',
                'ID': ''
            },
        'type': 'PIP'
    }
};
export const mockDataWithTwoRows = {
    'columns': mockColumData,
    'results': [
        mockResultData,
        mockResultData2
    ]
};
export const mockDataWithNoRows = {
    'columns': mockColumData,
    'results': []
};
