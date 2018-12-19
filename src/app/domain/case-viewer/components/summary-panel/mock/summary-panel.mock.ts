import {PageDateDefault, PageDateQuestion, PageDateSummary, PageDateWithFields} from '../../../../models/section_fields';

export const mockPanelDataTimeline: PageDateWithFields = {
    name: 'events',
    type: 'timeline-panel',
    fields: [
        {
            value: [
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
            ]
        }
    ]
};
export const mockPanelData: PageDateSummary = {
    name: 'Summary',
    type: 'summary-panel',
    sections: [
        {
            name: 'Case Details',
            type: 'data-list',
            fields: [
                {
                    'label': 'Parties',
                    'value': 'A May_146863 v DWP'
                },
                {
                    'label': 'Case number',
                    'value': 'SC001/01/46863'
                },
            ]
        },
        {
            name: 'Representative',
            type: 'data-list',
            fields: [
                {
                    'label': 'Judge',
                    'value': 'na'
                },
                {
                    'label': 'Medical member',
                    'value': 'na'
                },
                {
                    'label': 'Disability qualified member',
                    'value': 'na'
                }
            ]
        },
        {
            name: 'Recent events',
            type: 'timeline',
            fields: [
                {
                    value: [
                        {
                            event_name: 'Create/update Panel',
                            user_first_name: 'John',
                            user_last_name: 'Smith',
                            created_date: '2018-07-05T11:37:44.854'
                        },
                        {
                            event_name: 'Appeal created',
                            user_first_name: 'Gilbert',
                            user_last_name: 'Smith',
                            created_date: '2018-07-05T11:36:51.125'
                        }
                    ]
                }
            ]
        }
    ]
};
