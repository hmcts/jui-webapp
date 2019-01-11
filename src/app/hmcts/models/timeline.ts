export interface Timeline {
    title: string;
    by: string;
    dateUtc: string;
    date: string;
    time: string;
    documents?: Array<{name: string; href:  string}>;
}
