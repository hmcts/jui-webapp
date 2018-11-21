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
        'label': 'Ignore this column',
        'order': 2,
        'case_field_id': 'ignoreignore',
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
        'label': 'Status',
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
        'label': 'Date',
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
        'label': 'Last Action',
        'order': 7,
        'case_field_id': 'caseLastActioned',
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
    'case_reference': '123-123-123',
    'case_jurisdiction': 'SSCS',
    'case_type_id': 'Benefit',
    'case_fields': {
        'caseRef': null,
        'parties': 'A v May_146863',
        'type': 'SSCS',
        'status': {
            'name': 'Draft Consent Order',
            'action_goto': 'casefile'
        },
        'caseCreated': '2018-06-08T16:45:56.301',
        'caseLastActioned': '2018-06-11T10:36:58.652'
    }
};
export const mockResultData2 = {
    'case_id': 1528476358303157,
    'case_reference': '321-321-321',
    'case_jurisdiction': 'SSCS',
    'case_type_id': 'Benefit',
    'case_fields': {
        'caseRef': null,
        'parties': 'B v May_417228',
        'type': 'SSCS',
        'status': {
            'name': 'Draft Consent Order',
            'action_goto': 'casefile'
        },
        'caseCreated': '2018-06-08T16:45:58.349',
        'caseLastActioned': '2018-06-08T16:45:58.349'
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
