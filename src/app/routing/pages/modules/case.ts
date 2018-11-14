export interface CaseDataOther {
    id: string;
    sections: Array<any> | [{}];
    details: {
        fields: Array<{value: string}>;
    };
    decision: {
        options: Array<SectionfiedItems>;
    };
}
export interface SectionfiedItems{
    id: string;
    name: string;
}
export interface CaseData {
    id: string;
    decision: {
        options: Array<SectionfiedItems>
    };
}
