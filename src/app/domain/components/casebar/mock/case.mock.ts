import {CaseSnapShootRoot} from '../../../../routing/pages/modules/case';
import {PageDateCaseBar} from '../../../models/section_fields';


export const mockCaseBarData: PageDateCaseBar = {
    id: '123123123',
    sections: [{}],
    details: {
        fields: [
            {value: '1234'},
            {value: 'Alec DT v DWP'}
            ]
    },
    decision: {
        options: [{}]
    }
}
export const mockCaseBar: CaseSnapShootRoot = {
    data: {
        caseData: {
            id: '123123123',
            sections: [],
            details: {
                fields: [
                    {value: '1234'},
                    {value: 'Alec DT v DWP'}
                ]
            },
            decision: {
                options: []
            }
        }
    }
};
