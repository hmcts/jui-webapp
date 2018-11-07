import { PageDateDefault } from '../../../../models/section_fields';

export const mockPanelData: PageDateDefault = {
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
