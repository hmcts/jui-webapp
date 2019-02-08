import * as express from 'express'
import { map } from 'p-iteration'

import columns from '../../lib/config/refCaselistCols'
import { filterByCaseTypeAndRole } from '../../lib/filters'
import * as log4jui from '../../lib/log4jui'
import { asyncReturnOrError } from '../../lib/util'
import { getMutiJudCCDCases } from '../../services/ccd-store-api/ccd-store'
import { getHearingByCase } from '../../services/coh-cor-api/coh-cor-api'

const getListTemplate = require('./templates/index')
const { processCaseState } = require('../../lib/processors/case-state-model')
const valueProcessor = require('../../lib/processors/value-processor')
const { caseStateFilter } = require('../../lib/processors/case-state-util')
const { getAllQuestionsByCase } = require('../questions/index')

const { getUser } = require('../../services/idam-api/idam-api')
const { getNewCase, unassignAllCaseFromJudge } = require('./assignCase')

const logger = log4jui.getLogger('case list')

async function getCOR(casesData, options) {
    const caseIds = casesData.map(caseRow => `case_id=${caseRow.id}`).join('&')

    const hearings: any = await getHearingByCase(caseIds)

    if (hearings.online_hearings) {
        const caseStateMap = new Map(hearings.online_hearings.map(hearing => [Number(hearing.case_id), hearing]))
        casesData.forEach(caseRow => {
            caseRow.hearing_data = caseStateMap.get(Number(caseRow.id))
        })
    }

    return casesData
}

async function appendCOR(caseLists) {
    return await map(caseLists, async (caseList: any) => {
        return caseList && caseList.length ? await getCOR(caseList, {}) : []
    })
}

function getHearingWithQuestionData(caseData, userId) {
    return getAllQuestionsByCase(caseData.id, userId).then(questions => {
        return {
            id: caseData.id,
            questions,
        }
    })
}

async function getQuestionData(caseLists, userId) {
    const mapped = await map(caseLists, async (caseList: any) => {
        if (caseList.hearing_data) {
            return await getHearingWithQuestionData(caseList, userId)
        }
    })

    return mapped.filter(Boolean)
}

async function appendQuestionsRound(caseLists, userId) {
    return await map(caseLists, async (caseList: any) => {
        if (caseList && caseList.length) {
            const arrQuestionsWithIds: any = await getQuestionData(caseList, userId)
            if (arrQuestionsWithIds) {
                const idToQuestionMapping = new Map(
                    arrQuestionsWithIds.map(questionWithId => [Number(questionWithId.id), questionWithId.questions])
                )

                caseList.forEach(caseData => (caseData.question_data = idToQuestionMapping.get(Number(caseData.id))))
            }
            return caseList
        } else {
            return []
        }
    })
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

// Get List of case and transform to correct format
async function getMutiJudCaseTransformed(userDetails) {
    let caseLists

    caseLists = await getMutiJudCaseAssignedCases(userDetails)
    caseLists = await appendCOR(caseLists)
    caseLists = await appendQuestionsRound(caseLists, userDetails.id)
    caseLists = await processCaseListsState(caseLists)
    caseLists = await applyStateFilter(caseLists)
    caseLists = await convertCaselistToTemplate(caseLists)
    caseLists = await combineLists(caseLists)
    caseLists = await sortTransformedCases(caseLists)
    caseLists = await aggregatedData(caseLists)

    return caseLists
}

// Get List of case and return raw output
function getMutiJudCaseRaw(userDetails) {
    let caseLists: any = getMutiJudCaseAssignedCases(userDetails)
    caseLists = combineLists(caseLists)
    caseLists = sortCases(caseLists)

    return caseLists
}

// Get List of case append coh and return raw output
async function getMutiJudCaseRawCoh(userDetails) {
    let caseLists = await getMutiJudCaseAssignedCases(userDetails)
    caseLists = await appendCOR(caseLists)
    caseLists = await appendQuestionsRound(caseLists, userDetails.id)
    caseLists = await combineLists(combineLists)
    caseLists = await sortCases(combineLists)

    return caseLists
}

async function unassignAll(req, res) {
    const filters = filterByCaseTypeAndRole(req.auth)

    let caseLists = await getMutiJudCCDCases(req.auth.id, filters)
    caseLists = combineLists(caseLists)
    caseLists = unassignAllCaseFromJudge(req.auth.id, caseLists)

    return caseLists
}

module.exports = app => {
    const router = express.Router({ mergeParams: true })
    app.use('/cases', router)

    router.get('/', async (req: any, res, next) => {
        const user = await getUser()

        const results = await asyncReturnOrError(getMutiJudCaseTransformed(user), ' Error getting case list', res, logger)

        if (results) {
            res.setHeader('Access-Control-Allow-Origin', '*')
            res.setHeader('content-type', 'application/json')
            res.status(200).send(JSON.stringify(results))
        }
    })

    router.get('/unassign/all', async (req: any, res, next) => {
        const user = await getUser()

        const results = await asyncReturnOrError(getMutiJudCaseTransformed(user), ' Error unassigning all', res, logger)

        if (results) {
            res.setHeader('Access-Control-Allow-Origin', '*')
            res.setHeader('content-type', 'application/json')
            res.status(200).send(JSON.stringify(results))
        }
    })

    router.post('/assign/new', async (req: any, res, next) => {
        const results = await asyncReturnOrError(getNewCase(req.auth.id), ' Error assigning new', res, logger)

        if (results) {
            res.setHeader('Access-Control-Allow-Origin', '*')
            res.setHeader('content-type', 'application/json')
            res.status(200).send(JSON.stringify(results))
        }
    })

    router.get('/raw', async (req: any, res, next) => {
        const user = await getUser()

        const results = await asyncReturnOrError(getMutiJudCaseRaw(user), ' Error getting raw', res, logger)

        if (results) {
            res.setHeader('Access-Control-Allow-Origin', '*')
            res.setHeader('content-type', 'application/json')
            res.status(200).send(JSON.stringify(results))
        }
    })

    router.get('/raw/coh', async (req: any, res, next) => {
        const user = await getUser()

        const results = await asyncReturnOrError(getMutiJudCaseRawCoh(user), ' Error getting raw', res, logger)

        if (results) {
            res.setHeader('Access-Control-Allow-Origin', '*')
            res.setHeader('content-type', 'application/json')
            res.status(200).send(JSON.stringify(results))
        }
    })
}
