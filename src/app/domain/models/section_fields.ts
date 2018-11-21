export interface PageDate {
    id?: string;
    name?: string;
}

export interface PageDateDefault extends PageDate {
    type: string;
    sections: Array<SectionsItem>;
}

export interface PageDateCase extends PageDate {
    case_jurisdiction: string;
    case_type_id: string;
    sections: Array<SectionsCaseItem>;
}

export interface SectionsCaseItem {
    id: string;
    name: string;
}

export interface LinkItem {
    href: string;
    text: string;
    label?: string;
    id?: string;
    active?: Boolean;
}

export interface SectionsItem {
    id?: string;
    name: string;
    type: string;
    fields: Array<FieldItem>;
}

export interface FieldItem {
    label?: string;
    value: string | Array<FieldItemValue> | Array<string>;
}

export interface FieldItemValue {
    event_name: string;
    user_first_name: string;
    user_last_name: string;
    created_date: string;
}
