// TODO : This should be removed as it is inconsitent
import {SectionItem} from '../../../domain/models/section_fields';

export interface CaseSnapShootRoot {
    data: {
        caseData: CaseDataOther;
    };
}

export interface CaseDataOther {
    id: string;
    sections: Array<any> | [{}];
    details: {
        fields: Array<{ value: string }>;
    };
    decision: {
        options: Array<SectionItem> | [{}];
    };
}



export interface CaseData {
    id: string;
    decision: {
        options: Array<SectionItem>;
    };
}
