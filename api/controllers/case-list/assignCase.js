const { getMutiJudCCDCases, updateCase } = require('../../services/ccd-store-api/ccd-store')
const { getDetails } = require('../../services/idam-api/idam-api')

const JUI_AUTO_ASSIGN = 'Auto assigned by JUI'

const jurisdictions = [
    {
        jur: 'SSCS',
        caseType: 'Benefit',
        filter: '&state=appealCreated&case.appeal.benefitType.code=PIP'
    },
    {
        jur: 'DIVORCE',
        caseType: 'DIVORCE',
        filter: ''
    },
    {
        jur: 'DIVORCE',
        caseType: 'FinancialRemedyMVP2',
        filter: '&state=applicationIssued'
        // filter: ''
    }
    // {
    //     jur: 'CMC',
    //     caseType: 'MoneyClaimCase',
    //     filter: ''
    // },
    // {
    //     jur: 'PROBATE',
    //     caseType: 'GrantOfRepresentation',
    //     filter: ''
    // }
]

function sortCasesByLastModifiedDate(results) {
    return results.sort((result1, result2) => new Date(result2.lastModified) - new Date(result1.lastModified))
}

function filterAssignedCases(cases) {
    return cases.filter(row => !row.case_data.assignedToJudge)
}

function combineLists(lists) {
    return [].concat(...lists)
}

// stateType is not needed atm however it could in the future
function getAssignEventId (jurisdiction, caseType, stateType) {
    const defaultAssignToJudgeEventId = 'assignToJudge'
    const assignToJudgeEventIds = {
        sscs: {
            benefit: defaultAssignToJudgeEventId
        },
        cmc: {
            moneyclaimcase: defaultAssignToJudgeEventId
        },
        probate: {
            grantofrepresentation: defaultAssignToJudgeEventId
        },
        divorce: {
            divorce: defaultAssignToJudgeEventId,
            financialremedymvp2: 'FR_referToJudge'
        }
    }
    const jud = assignToJudgeEventIds[jurisdiction.toLowerCase()]
    const template = jud ? jud[caseType.toLowerCase()] : defaultAssignToJudgeEventId
    return (template) || defaultAssignToJudgeEventId
}

// stateType is not needed atm however it could in the future
function getUnassignEventId (jurisdiction, caseType, stateType) {
    const defaultAssignToJudgeEventId = 'unassignToJudge'
    const assignToJudgeEventIds = {
        sscs: {
            benefit: defaultAssignToJudgeEventId
        },
        cmc: {
            moneyclaimcase: defaultAssignToJudgeEventId
        },
        probate: {
            grantofrepresentation: defaultAssignToJudgeEventId
        },
        divorce: {
            divorce: defaultAssignToJudgeEventId,
            financialremedymvp2: defaultAssignToJudgeEventId
        }
    }
    const jud = assignToJudgeEventIds[jurisdiction.toLowerCase()]
    const template = jud ? jud[caseType.toLowerCase()] : defaultAssignToJudgeEventId
    return (template) || defaultAssignToJudgeEventId
}

function generateAssignToJudgeBody(jurisdiction, caseType, eventId, email) {
    const defaultAssignToJudgeBody = {
        assignedToJudge: email
    }
    const assignToJudgeEventIds = {
        sscs: {
            benefit: defaultAssignToJudgeBody
        },
        cmc: {
            moneyclaimcase: defaultAssignToJudgeBody
        },
        probate: {
            grantofrepresentation: defaultAssignToJudgeBody
        },
        divorce: {
            divorce: defaultAssignToJudgeBody,
            financialremedymvp2: {
                assignedToJudge: email,
                referToJudgeText: JUI_AUTO_ASSIGN,
                assignedToJudgeReason: 'Draft consent order' // 'Resubmitted draft consent order'
            }
        }
    }
    const jud = assignToJudgeEventIds[jurisdiction.toLowerCase()]
    const template = jud ? jud[caseType.toLowerCase()] : defaultAssignToJudgeBody
    return (template) || defaultAssignToJudgeBody
}

function assignToJudge(userId, awaitingJuiRespCases, options) {
    console.log(`cases found ${awaitingJuiRespCases.length}`)
    const newCase = awaitingJuiRespCases[0]
    if (newCase) {
        const jurisdiction = newCase.jurisdiction
        const caseType = newCase.case_type_id
        const caseId = newCase.id
        const eventId = getAssignEventId(jurisdiction, caseType)

        getDetails(options)
            .then(details => {
                const body = generateAssignToJudgeBody(jurisdiction, caseType, eventId, details.email)
                updateCase(userId, jurisdiction, caseType, caseId, eventId, JUI_AUTO_ASSIGN, JUI_AUTO_ASSIGN, body, options)
                    .catch(error => {
                        if (awaitingJuiRespCases.length > 0) {
                            console.error('failed to assign any case')
                            assignToJudge(userId, awaitingJuiRespCases.splice(1, awaitingJuiRespCases.length), options)
                        } else {
                            //    throw error no new cases found
                            console.error(`No cases found`)
                        }
                    })
            })
    } else {
        //    throw error no new cases found
        console.error(`No cases found`)
    }
}

function unassignFromJudge(userId, caseData, options) {
    if (caseData) {
        const jurisdiction = caseData.jurisdiction
        const caseType = caseData.case_type_id
        const caseId = caseData.id
        const eventId = getUnassignEventId(jurisdiction, caseType)
        const body = { }
        updateCase(userId, jurisdiction, caseType, caseId, eventId, JUI_AUTO_ASSIGN, JUI_AUTO_ASSIGN, body, options)
            .catch(error => {
                console.error(`Couldn't update case`, error)
            })
    } else {
        //    throw error no new cases found
        console.error(`No cases found`)
    }
}

function unassignAllCaseFromJudge (userId, caseList, options) {
    return caseList.map(caseData => unassignFromJudge(userId, caseData, options))
}

function getNewCase(userId, options) {
    return getMutiJudCCDCases(userId, jurisdictions, options)
        .then(combineLists) // TODO: One day will not need this with muti judristion
        .then(filterAssignedCases) // TODO: We should filter on the request not here (FUTURE CHANGE)
        .then(sortCasesByLastModifiedDate) // TODO: hopefully remove in the future
        .then(awaitingJuiRespCases => assignToJudge(userId, awaitingJuiRespCases, options))
}

module.exports.getNewCase = getNewCase

module.exports.unassignFromJudge = unassignFromJudge

module.exports.unassignAllCaseFromJudge = unassignAllCaseFromJudge
