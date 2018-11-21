export interface CaseTable {
    columns: Array<CaseColum>;
    results: Array<CaseRow> | Array<[{}]> | undefined;
}

export interface CaseRow {
    case_id: number;
    case_jurisdiction: string;
    case_type_id: string;
    case_fields: Casefields;
    assignedToJudge: string;
}

export interface Casefields {
    case_ref: number;
    parties: string;
    type: string;
    status: Status;
    createdDate: string;
    lastModified: string;
}

export interface Status {
    name: string;
    actionGoTo: string;
    ID: string;
}

export interface CaseColum {
    label: string;
    case_field_id: string;
}
