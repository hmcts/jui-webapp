const divorceCaseData = [{
    id: 123456789,
    jurisdiction: 'DIVORCE',
    case_type_id: 'FinancialRemedyMVP2',
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

module.exports.divorceCaseData = divorceCaseData;
module.exports.sscsCaseData = sscsCaseData;

