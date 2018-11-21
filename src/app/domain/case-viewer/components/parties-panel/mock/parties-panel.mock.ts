import { PageDateDefault} from '../../../../models/section_fields';
export const mockSnapshot: PageDateDefault = {
        id: 'parties-tabs',
        name: 'Parties',
        type: 'parties-panel',
        sections: [
            {
                id: 'petitioner',
                name: 'Petitioner',
                type: 'tab',
                fields: [
                    {
                        label: 'Full name',
                        value: ['David ', 'Francis']
                    },
                    {
                        label: 'Date of birth',
                        value: '7 June 1981'
                    },
                    {
                        label: 'Address',
                        value: '24 Park Road<br>Lewisham<br>London<br>E11 4PR'
                    },
                    {
                        label: 'Phone',
                        value: '07787 557 967'
                    },
                    {
                        label: 'Email',
                        value: 'david.francis@gmail.com'
                    },
                    {
                        label: 'Representative',
                        value: 'Unrepresented'
                    }
                ]
            },
            {
                id: 'respondent',
                name: 'Respondent',
                type: 'tab',
                fields: [
                    {
                        label: 'Full name',
                        value: ['Susan ', 'Francis']
                    },
                    {
                        label: 'Date of birth',
                        value: '16 April 1979'
                    },
                    {
                        label: 'Address',
                        value: '89 London Road<br>Hinckley<br>London<br>LE10 1HH'
                    },
                    {
                        label: 'Phone',
                        value: '07700 900 772'
                    },
                    {
                        label: 'Email',
                        value: 'susan.francis@gmail.com'
                    },
                    {
                        label: 'Representative',
                        value: 'Unrepresented'
                    }
                ]
            }
        ]
    };
