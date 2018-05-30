module.exports = {
    sections: [
        {
            id: 'summary',
            name: 'Summary',
            sections: [
                {
                    id: 'case_details',
                    name: 'Case Details',
                    fields: [
                        {
                            label: 'Case number',
                            lookup: '$.id'
                        },
                        {
                            label: 'Case number',
                            lookup: '$.id'
                        }
                    ]
                }
            ]
        }
    ]
};