export interface SectionfiedItems{
    id: string;
    name: string;
}
export interface CaseData {
    id: string;
    decision: {
        options: Array<SectionfiedItems>
    }
}
export const mockCaseData: CaseData = {
    id: '1234',
    decision: {
    options: [
        {id: 'test', name: 'test'}
        ]
    }
}
