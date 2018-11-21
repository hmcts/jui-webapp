const userEmail = 'test@test.com'
const DAY_IN_MILLIS = 86400000
const HOUR_IN_MILLIS = 3600000

const CASE_RECEIVED_DATE = new Date()
const LAST_MODIFIED_DATE = new Date(CASE_RECEIVED_DATE.getTime() + DAY_IN_MILLIS)

const divorceCaseData = [
    {
        id: 123456789,
        jurisdiction: 'DIVORCE',
        case_type_id: 'FinancialRemedyMVP2',
        state: 'referredToJudge',
        case_data: {
            caseReference: '456-456-456',
            appeal: {
                appellant: {
                    name: {
                        firstName: 'Bob',
                        lastName: 'Smith'
                    }
                }
            },
            assignedToJudge: userEmail
        },
        created_date: CASE_RECEIVED_DATE,
        last_modified: new Date(CASE_RECEIVED_DATE.getTime() + (DAY_IN_MILLIS * 2))
    }
]

const sscsCaseData = [
    {
        id: 987654321,
        jurisdiction: 'SSCS',
        case_type_id: 'Benefit',
        state: 'appealCreated',
        case_data: {
            caseReference: '123-123-123',
            appeal: {
                appellant: {
                    name: {
                        firstName: 'Louis',
                        lastName: 'Houghton'
                    }
                },
                benefitType: { code: 'PIP' }
            }
        },
        created_date: CASE_RECEIVED_DATE,
        last_modified: CASE_RECEIVED_DATE

    }
]

const sscsCaseDataNullCaseRef = [
    {
        id: 987654321,
        jurisdiction: 'SSCS',
        case_type_id: 'Benefit',
        state: 'appealCreated',
        case_data: {
            appeal: {
                appellant: {
                    name: {
                        firstName: 'Louis',
                        lastName: 'Houghton'
                    }
                },
                benefitType: { code: 'PIP' }
            }
        },
        created_date: CASE_RECEIVED_DATE,
        last_modified: CASE_RECEIVED_DATE

    }
]

const onlineHearingData = {
    online_hearings: [
        {
            online_hearing_id: '2',
            case_id: 987654321,
            start_date: '2018-06-30T12:56:49.145+0000',
            current_state: {
                state_name: 'continuous_online_hearing_started',
                state_datetime: LAST_MODIFIED_DATE
            }
        }
    ]
}

const userDetails = { email: userEmail }

module.exports = {
    divorceCaseData,
    sscsCaseData,
    sscsCaseDataNullCaseRef,
    onlineHearingData,
    userDetails,
    LAST_MODIFIED_DATE
}
