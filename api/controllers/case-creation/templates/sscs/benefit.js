module.exports = {
    eventId: 'appealCreated',
    data: {
        caseReference: '1234',
        appeal: {
            appellant: {
                name: {
                    firstName: 'Bob',
                    lastName: 'Bobby'
                }
            },
            hearingType: 'cor',
            benefitType: {
                code: 'PIP',
                description: 'Benefit'
            }

        }
    }
}
