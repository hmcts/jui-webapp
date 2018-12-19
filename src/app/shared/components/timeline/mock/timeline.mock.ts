export interface TimeDataStamp {
    title: string;
    by: string;
    dateUtc: string;
    date: string;
    time: string;
    documents: Array<any>;
}
export const mockData: Array<TimeDataStamp> = [
    {
        title: 'HEARING',
        by: 'John Smith',
        dateUtc: '2018-08-06T15:14:11Z',
        date: '6 Aug 2018',
        time: '15:14pm',
        documents: []
    },
    {
        title: 'CREATED_EVENT',
        by: 'Gilbert Smith',
        dateUtc: '2018-08-06T15:14:11Z',
        date: '6 Aug 2018',
        time: '15:14pm',
        documents: []
    }
];
