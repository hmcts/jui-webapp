export interface PageDate {
    id?: string;
    name: string;
    type: string;
    sections: Array<SectionsItem>;
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
