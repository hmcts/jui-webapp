// TODO : This should be removed as it is inconsitent
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
        options: Array<SectionfiedItems> | [{}];
    };
}

export interface SectionfiedItems {
    id: string;
    name: string;
}

export interface CaseData {
    id: string;
    decision: {
        options: Array<SectionfiedItems>;
    };
}
