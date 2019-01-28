import * as express from 'express'
import columns from '../../lib/config/refCaselistCols'
import { filterByCaseTypeAndRole } from '../../lib/filters'
import { getHearingByCase } from '../../services/coh-cor-api/coh-cor-api'

const getListTemplate = require('./templates/index')
const { processCaseState } = require('../../lib/processors/case-state-model')
const valueProcessor = require('../../lib/processors/value-processor')
const { caseStateFilter } = require('../../lib/processors/case-state-util')
const { getAllQuestionsByCase } = require('../questions/index')
const { getMutiJudCCDCases } = require('../../services/ccd-store-api/ccd-store')

const { getUser } = require('../../services/idam-api/idam-api')
const { getNewCase, unassignAllCaseFromJudge } = require('./assignCase')
const headerUtilities = require('../../lib/utilities/headerUtilities')

function hasCOR(caseData) {
    return caseData.jurisdiction === 'SSCS'
}

function getCOR(casesData, options) {
    const caseIds = casesData.map(caseRow => `case_id=${caseRow.id}`).join('&')
    return new Promise(resolve => {
        if (hasCOR(casesData[0])) {
            getHearingByCase(caseIds).then(hearings => {
                if (hearings.online_hearings) {
                    const caseStateMap = new Map(hearings.online_hearings.map(hearing => [Number(hearing.case_id), hearing]))
                    casesData.forEach(caseRow => {
                        caseRow.hearing_data = caseStateMap.get(Number(caseRow.id))
                    })
                }
                resolve(casesData)
            })
        } else {
            resolve(casesData)
        }
    })
}

function appendCOR(caseLists) {
    return Promise.all(
        caseLists.map(
            caseList =>
                new Promise((resolve, reject) => {
                    if (caseList && caseList.length) {
                        getCOR(caseList, {}).then(casesDataWithCor => {
                            resolve(casesDataWithCor)
                        })
                    } else {
                        resolve([])
                    }
                })
        )
    )
}

function getLinkedCaseValues() {
    return 'frCaseId'
}

function getLinkedCase(casesData, userId, options) {
    const caseType = casesData.jur
    const caseJudristiction = casesData.type
    const linkedCaseId = getLinkedCaseValues()

    return new Promise(resolve => {
        if (linkedCaseId && linkedCaseId.length) {
            //     getCaseBySearchFilter(userId, linkedCaseId, options)
            //         .then(caseData => {
            //             if (hearings.online_hearings) {
            //                 const caseStateMap = new Map(hearings.online_hearings.map(hearing => [Number(hearing.case_id), hearing]))
            //                 casesData.forEach(caseRow => {
            //                     caseRow.linked_case_data = caseStateMap.get(Number(caseRow.id))
            //                 })
            //             }
            //             resolve(casesData)
            //         })
            // } else {
            //     resolve(casesData)
        }
    })
}

function appendLinkedCases(caseLists, userId, options) {
    return Promise.all(
        caseLists.map(
            casesData =>
                new Promise((resolve, reject) => {
                    if (casesData && casesData.length) {
                        getLinkedCase(casesData, userId, options).then(casesDataWithLinkedCase => {
                            resolve(casesDataWithLinkedCase)
                        })
                    } else {
                        resolve([])
                    }
                })
        )
    )
}

function getHearingWithQuestionData(caseData, userId, options) {
    return getAllQuestionsByCase(caseData.id, userId, options).then(questions => {
        return {
            id: caseData.id,
            questions,
        }
    })
}

function getQuestionData(caseLists, userId, options) {
    const promiseArray = []
    caseLists.forEach(caseData => {
        if (caseData.hearing_data) {
            promiseArray.push(getHearingWithQuestionData(caseData, userId, options))
        }
    })
    return Promise.all(promiseArray)
}

function appendQuestionsRound(caseLists, userId, options) {
    return Promise.all(
        caseLists.map(
            caseList =>
                new Promise((resolve, reject) => {
                    if (caseList && caseList.length) {
                        getQuestionData(caseList, userId, options).then((arrQuestionsWithIds: any) => {
                            if (arrQuestionsWithIds) {
                                const idToQuestionMapping = new Map(
                                    arrQuestionsWithIds.map(questionWithId => [Number(questionWithId.id), questionWithId.questions])
                                )
                                caseList.forEach(caseData => (caseData.question_data = idToQuestionMapping.get(Number(caseData.id))))
                            }
                            resolve(caseList)
                        })
                    } else {
                        resolve([])
                    }
                })
        )
    )
}

// This should be refined as used in both case and caselist
function processCaseListsState(caseLists) {
    return caseLists.map(caseList => caseList.map(processCaseState))
}

function applyStateFilter(caseLists) {
    return caseLists.map(caseList => caseList.filter(caseStateFilter))
}

function rawCasesReducer(cases, columns) {
    return cases.map(caseRow => {
        return {
            case_id: caseRow.id,
            case_jurisdiction: caseRow.jurisdiction,
            case_type_id: caseRow.case_type_id,
            case_fields: columns.reduce((row, column) => {
                row[column.case_field_id] = valueProcessor(column.value, caseRow)
                return row
            }, {}),
            assignedToJudge: caseRow.case_data.assignedToJudge ? caseRow.case_data.assignedToJudge : undefined, // Don't think this is needed but keep as might useful
            assignedToJudgeReason: caseRow.case_data.assignedToJudgeReason ? caseRow.case_data.assignedToJudgeReason : undefined,
        }
    })
}

function convertCaselistToTemplate(caseLists) {
    return caseLists.map(caselist => {
        if (caselist && caselist.length) {
            const jurisdiction = caselist[0].jurisdiction
            const caseType = caselist[0].case_type_id
            const template = getListTemplate(jurisdiction, caseType)

            return rawCasesReducer(caselist, template.columns).filter(row => Boolean(row.case_fields.case_ref))
        }
        return caselist
    })
}

function combineLists(lists) {
    return [].concat(...lists)
}

function sortTransformedCases(results) {
    return results.sort(
        (result1, result2) => (new Date(result1.case_fields.lastModified) as any) - (new Date(result2.case_fields.lastModified) as any)
    )
}

function sortCases(results) {
    return results.sort((result1, result2) => (new Date(result1.last_modified) as any) - (new Date(result2.last_modified) as any))
}

function aggregatedData(results) {
    return { columns, results }
}

async function getMutiJudCaseAssignedCases(userDetails) {
    const cases = await getMutiJudCCDCases(userDetails.id, filterByCaseTypeAndRole(userDetails))

    return cases
}

function getOptions(req) {
    return headerUtilities.getAuthHeadersWithUserRoles(req)
}

// Get List of case and transform to correct format
async function getMutiJudCaseTransformed(userDetails, options) {
    let cases = await getMutiJudCaseAssignedCases(userDetails)
        .then(caseLists => appendCOR(caseLists))
        .then(caseLists => appendQuestionsRound(caseLists, userDetails.id, options))
        // .then(caseLists => appendLinkedCases(caseLists, userId, options))
        .then(processCaseListsState)
        .then(applyStateFilter)
        .then(convertCaselistToTemplate)
        .then(combineLists)
        .then(sortTransformedCases)
        .then(aggregatedData)

    return cases
}

// Get List of case and return raw output
function getMutiJudCaseRaw(userDetails) {
    return getMutiJudCaseAssignedCases(userDetails).then(combineLists)
    //  .then(sortCases)
}

// Get List of case append coh and return raw output
function getMutiJudCaseRawCoh(userDetails) {
    return (
        getMutiJudCaseAssignedCases(userDetails)
            .then(caseLists => appendCOR(caseLists))
            .then(caseLists => appendQuestionsRound(caseLists, userDetails.id, {}))
            // .then(caseLists => appendLinkedCases(caseLists, userId, options))
            .then(combineLists)
            .then(sortCases)
    )
}

module.exports = app => {
    const router = express.Router({ mergeParams: true })
    app.use('/cases', router)

    router.get('/', async (req: any, res, next) => {
        const user = await getUser()

        getMutiJudCaseTransformed(user, getOptions(req))
            .then(results => {
                res.setHeader('Access-Control-Allow-Origin', '*')
                res.setHeader('content-type', 'application/json')
                res.status(200).send(JSON.stringify(results))
            })
            .catch(response => {
                //  console.log(response.error || response)
                res.status(response.statusCode || 500).send(response)
            })
    })

    router.get('/unassign/all', (req: any, res, next) => {
        const filters = filterByCaseTypeAndRole(req.auth)

        getMutiJudCCDCases(req.auth.id, filters)
            .then(combineLists)
            .then(caseList => unassignAllCaseFromJudge(req.auth.id, caseList))
            .then(results => {
                res.setHeader('Access-Control-Allow-Origin', '*')
                res.setHeader('content-type', 'application/json')
                res.status(200).send(JSON.stringify(results))
            })
            .catch(response => {
                console.log(response.error || response)
                res.status(response.statusCode || 500).send(response)
            })
    })

    router.post('/assign/new', (req: any, res, next) => {
        getNewCase(req.auth.id)
            .then(results => {
                res.setHeader('Access-Control-Allow-Origin', '*')
                res.setHeader('content-type', 'application/json')
                res.status(200).send(JSON.stringify(results))
            })
            .catch(response => {
                console.dir(response.error || response)
                res.status(response.statusCode || 500).send(response.error || response)
            })
    })

    router.get('/raw', async (req: any, res, next) => {
        const user = await getUser()
        getMutiJudCaseRaw(user)
            .then(results => {
                res.setHeader('Access-Control-Allow-Origin', '*')
                res.setHeader('content-type', 'application/json')
                res.status(200).send(JSON.stringify(results))
            })
            .catch(response => {
                console.log(response.error || response)
                res.status(response.statusCode || 500).send(response)
            })
    })

    router.get('/raw/coh', async (req: any, res, next) => {
        const user = await getUser()
        getMutiJudCaseRawCoh(user)
            .then(results => {
                res.setHeader('Access-Control-Allow-Origin', '*')
                res.setHeader('content-type', 'application/json')
                res.status(200).send(JSON.stringify(results))
            })
            .catch(response => {
                console.log(response.error || response)
                res.status(response.statusCode || 500).send(response)
            })
    })
}
