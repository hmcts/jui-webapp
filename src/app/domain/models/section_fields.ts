export interface PageDate {
    id?: string;
    name?: string;
}

export interface PageDateDefault extends PageDate {
    type?: string;
    sections: Array<SectionItem> | any[];
}
export interface PageDateSummary extends PageDate {
    type?: string;
    sections:  Array<SectionSummaryItem> | any[];
}
export interface PageDateCaseBar extends PageDateDefault {
    details: {
        fields: Array<{ value: string }>;
    };
    decision: {
        options: Array<SectionItem> | [{}];
    };
}

// TODO Update this convetions to PageDateWithFields
export interface PageDateQuestion extends PageDate {
    type: string;
    fields: Array<QuestionField> | Array<TimelineField>;
}
export interface PageDateWithFields extends PageDate {
    type: string;
    fields: Array<QuestionField> | Array<TimelineField>;
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

export interface SectionItem {
    id?: string;
    name: string;
}
export interface SectionSummaryItem {
    id?: string;
    name: string;
    type: string;
    fields: Array<FieldItem>;
}


export interface LinkItem {
    href: string;
    text: string;
    label?: string;
    id?: string;
    active?: Boolean;
}



export interface FieldItem {
    label?: string;
    value: string | Array<FieldItemValue | string>;
}

export interface FieldItemValue {
    event_name: string;
    user_first_name: string;
    user_last_name: string;
    created_date: string;
}
// Questions
export interface QuestionField {
    value: Array<QuestionValue> | [{}];
}
export interface QuestionValue {
    question_round_number: string;
    state: string;
    questions: Array<QuestionItem>;
}
export interface QuestionItem {
    id: string;
    header: string;
    body: string;
    owner_reference: string;
    state_datetime: object;
    state: string;
}
// Timeline
export interface TimelineField {
    value: Array<TimelineValue> | [{}];
}

export interface TimelineValue {
    title: string;
    by: string;
    dateUtc:  string;
    date:  string;
    time: string;
    documents: Array<any>;
}
