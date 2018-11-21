import {CaseDataOther} from '../../../modules/case';

export const mockCaseData: CaseDataOther = {
    id: '1234',
    sections: [],
    details: {
        fields: [
            {value: '123'},
            {value: 'bob v bob'}
        ],
    },
    decision: {
        options: [
            {id: 'appeal-decline', name: 'Appeal Declined'}
        ]
    }

};
