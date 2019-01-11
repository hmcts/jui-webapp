import {of} from 'rxjs';

export const mockActivateRoute = {
    snapshot: {
        _lastPathIndex: 0
    },
    parent: {
        params: of({
            'case_id': '13eb9981-9360-4d4b-b9fd-506b5818e7ff'
        }),
        snapshot: {
            params: {
                'case_id': '13eb9981-9360-4d4b-b9fd-506b5818e7ff'
            },
            queryParams: {}
        }
    },
    params: of({
        'question_id': '43eb9981-9360-4d4b-b9fd-506b5818e7ff'
    }),
    fragment: of(['question-fragment', 'subject-fragment'])
};
export const mockQuestionCheckActivatedRoute = {
    snapshot: {
        _lastPathIndex: 0,
            params: {
            round: '1'
        },
        queryParams: {}
    },
    params: of({
        round: '1'
    }),
        parent: {
        params: of({
            case_id: '123456789',
            jur: 'SSCS',
            casetype: 'Benefit'
        }),
            snapshot: {
            params: of({
                case_id: '123456789',
                jur: 'SSCS',
                casetype: 'Benefit'
            }),
                queryParams: {}
        }
    },
    queryParams: of({}),
};
export const mockQuestionCreateActivateRoute = {
    snapshot: {
        _lastPathIndex: 0,
        params: {
            round: '1'
        },
        queryParams: {}
    },
    params: of({
        round: '1'
    }),
    parent: {
        params: of({
            case_id: '13eb9981-9360-4d4b-b9fd-506b5818e7ff'
        }),
        snapshot: {
            params: {
                case_id: '13eb9981-9360-4d4b-b9fd-506b5818e7ff'
            },
            queryParams: {}
        }
    },
    queryParams: of({}),
    fragment: of(['question-fragment', 'subject-fragment'])
};
export const mockQuestionDeleteActivateRoute = {
    params: of({
        'question_id': '13eb9981-9360-4d4b-b9fd-506b5818e7ff'
    }),
    queryParams: of({}),
    parent: {
        params: of({
            'case_id': '99eb9981-9360-4d4b-b9fd-506b5818e7ff'
        }),
    }
};
export const mockQuestionViewActivateRoute = {
    snapshot: {
        _lastPathIndex: 0,
        params: of({
            'question_id': '43eb9981-9360-4d4b-b9fd-506b5818e7ff'
        }),
    },
    parent: {
        params: of({
            'case_id': '13eb9981-9360-4d4b-b9fd-506b5818e7ff'
        }),
        snapshot: {
            params: {
                'case_id': '13eb9981-9360-4d4b-b9fd-506b5818e7ff'
            },
            queryParams: {}
        }
    },
    params: of({
        'question_id': '43eb9981-9360-4d4b-b9fd-506b5818e7ff'
    }),
    fragment: of(['question-fragment', 'subject-fragment'])
};
