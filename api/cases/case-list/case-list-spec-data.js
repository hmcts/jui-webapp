const divorceCaseData = [{
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
        }
    },
    created_date: new Date(),
    last_modified: new Date()
}];

const sscsCaseData = [{
    id: 987654321,
    jurisdiction: 'SSCS',
    case_type_id: 'Benefit',
    state: 'cor',
    case_data: {
        caseReference: '123-123-123',
        appeal: {
            appellant: {
                name: {
                    firstName: 'Louis',
                    lastName: 'Houghton'
                }
            },
            benefitType: {code: 'PIP'}
        }
    },
    created_date: new Date(),
    last_modified: new Date()

}];

const onlineHearingData = {
    online_hearings: [
        {
            online_hearing_id: '2',
            case_id: 123456789,
            start_date: '2018-06-30T12:56:49.145+0000',
            current_state: {
                state_name: 'continuous_online_hearing_started',
                state_datetime: new Date()
            }
        }
    ]
};


module.exports.divorceCaseData = divorceCaseData;
module.exports.sscsCaseData = sscsCaseData;
module.exports.onlineHearingData = onlineHearingData;
