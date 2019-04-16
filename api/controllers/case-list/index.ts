import * as express from 'express'
import { map } from 'p-iteration'

import { config } from '../../../config';
import columns from '../../lib/config/refCaselistCols'
import * as errorStack from '../../lib/errorStack'
import { filterByCaseTypeAndRole } from '../../lib/filters'
import * as log4jui from '../../lib/log4jui'
import { processCaseState } from '../../lib/processors/case-state-model'
import { dataLookup as valueProcessor } from '../../lib/processors/value-processor'
import { asyncReturnOrError } from '../../lib/util'
import { getMutiJudCCDCases } from '../../services/ccd-store-api/ccd-store'
import { getDecision } from '../../services/coh'
import { getHearingByCase } from '../../services/cohQA'
import { getUser } from '../../services/idam'
import { getAllQuestionsByCase } from '../questions/index'
import { getNewCase, unassignAllCaseFromJudge } from './assignCase'

const getListTemplate = require('./templates/index')
const { caseStateFilter } = require('../../lib/processors/case-state-util')
import { ERROR_UNABLE_TO_APPEND_TO_COR, ERROR_UNABLE_TO_APPEND_QRS, ERROR_UNABLE_TO_GET_CASES, ERROR_UNABLE_TO_GET_HEARING_BY_CASE } from '../../lib/errors'
const logger = log4jui.getLogger('case-list')

export async function getCOR(res, casesData) {
    const caseIds = casesData.map(caseRow => `${caseRow.id}`).join('&case_id=')

    const hearings = await asyncReturnOrError(getHearingByCase(caseIds), ERROR_UNABLE_TO_GET_HEARING_BY_CASE.humanStatusCode,
        res, logger, false)
    if (hearings && hearings.online_hearings) {

        const caseStateMap = new Map(hearings.online_hearings.map(hearing => [Number(hearing.case_id), hearing]))

        await map(casesData, async (caseRow: any) => {
            caseRow.hearing_data = caseStateMap.get(Number(caseRow.id))
            // add in getting the PV Decision here so as not to  have to loop through data again
            if (caseRow.hearing_data) {
                try {
                    caseRow.hearing_data.preliminaryView = await getDecision(caseRow.hearing_data.online_hearing_id)
                } catch (e) {
                    // cases don't have to have a decision
                }
            }
        })
    }

    return casesData
}

export async function appendCOR(res, caseLists) {
    return await map(caseLists, async (caseList: any) => {
        return caseList && caseList.length ? await getCOR(res, caseList) : []
    })
}

export async function getHearingWithQuestionData(caseData, userId) {
    const jurisdiction = null
    const questions = await getAllQuestionsByCase(caseData.id, userId, jurisdiction)
    return {
        id: caseData.id,
        questions,
    }
}

export async function getQuestionData(caseLists, userId) {
    const mapped = await map(caseLists, async (caseList: any) => {
        if (caseList.hearing_data) {
            return await getHearingWithQuestionData(caseList, userId)
        }
    })

    return mapped.filter(Boolean)
}

export async function appendQuestionsRound(caseLists, userId) {
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
export function processCaseListsState(caseLists) {
    return caseLists.map(caseList => caseList.map(processCaseState))
}

export function applyStateFilter(caseLists) {
    return caseLists.map(caseList => caseList.filter(caseStateFilter))
}

export function rawCasesReducer(cases, columns) {
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

export function convertCaselistToTemplate(caseLists) {
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

export function combineLists(lists) {
    return [].concat(...lists)
}

export function sortTransformedCases(results) {
    return results.sort(
        (result1, result2) => (new Date(result1.case_fields.lastModified) as any) - (new Date(result2.case_fields.lastModified) as any)
    )
}

export function sortCases(results) {
    return results.sort((result1, result2) => (new Date(result1.last_modified) as any) - (new Date(result2.last_modified) as any))
}

export function aggregatedData(results) {
    return { columns, results }
}

export async function getMutiJudCaseAssignedCases(userDetails) {
    return await getMutiJudCCDCases(userDetails.id, filterByCaseTypeAndRole(userDetails))
}

/**
 * hasCases
 *
 * Checks that there are case results returned on the case lists object.
 *
 * @param caseList
 */
function hasCases(caseList) {
    return caseList && caseList.results.length > 0
}

// Get List of case and transform to correct format
export async function getMutiJudCaseTransformed(res, userDetails) {
    let caseLists

    const jurisdictions = filterByCaseTypeAndRole(userDetails)

    caseLists = await asyncReturnOrError(getMutiJudCCDCases(userDetails.id, jurisdictions), 'Error getting Multi' +
        'Jurisdictional assigned cases.', null, logger, false)

    caseLists = await asyncReturnOrError(appendCOR(res, caseLists), ERROR_UNABLE_TO_APPEND_TO_COR.humanStatusCode,
        null, logger, false)

    caseLists = await asyncReturnOrError(appendQuestionsRound(caseLists, userDetails.id),
        ERROR_UNABLE_TO_APPEND_QRS.humanStatusCode, null, logger, false)

    caseLists = processCaseListsState(caseLists)
    caseLists = applyStateFilter(caseLists)
    caseLists = convertCaselistToTemplate(caseLists)
    caseLists = combineLists(caseLists)
    caseLists = sortTransformedCases(caseLists)
    caseLists = aggregatedData(caseLists)

    if (!hasCases(caseLists)) {
        return null
    }
    return caseLists
}

// Get List of case and return raw output
export function getMutiJudCaseRaw(userDetails) {
    let caseLists: any = getMutiJudCaseAssignedCases(userDetails)
    caseLists = combineLists(caseLists)
    caseLists = sortCases(caseLists)

    return caseLists
}

// Get List of case append coh and return raw output
export async function getMutiJudCaseRawCoh(res, userDetails) {
    let caseLists = await getMutiJudCaseAssignedCases(userDetails)
    caseLists = await appendCOR(res, caseLists)
    caseLists = await appendQuestionsRound(caseLists, userDetails.id)
    caseLists = await combineLists(caseLists)
    caseLists = await sortCases(caseLists)

    return caseLists
}

export async function unassignAll(req, res) {
    const filters = filterByCaseTypeAndRole(req.auth)

    let caseLists = await getMutiJudCCDCases(req.auth.id, filters)
    caseLists = combineLists(caseLists)
    caseLists = unassignAllCaseFromJudge(req.auth.id, caseLists)

    return caseLists
}

export async function getCases(res) {
    let results = null
    const user = await getUser()

    let tryCCD = 0

    while (tryCCD < config.maxCCDRetries && !results) {
        // need to disable error sending here and catch it later if retrying
        results = await asyncReturnOrError(getMutiJudCaseTransformed(res, user), ' Error getting case list',
            res, logger, false)

        tryCCD++

        if (!results) {
            logger.warn('Having to retry CCD')
        }
    }

    if (hasCases(results)) {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('content-type', 'application/json')
        res.status(200).send(JSON.stringify(results))
    } else {
        logger.error(ERROR_UNABLE_TO_GET_CASES.humanStatusCode)

        res.status(500).send(JSON.stringify(errorStack.get()))
    }
}

export async function unassign(res) {
    {
        const user = await getUser()

        const results = await asyncReturnOrError(getMutiJudCaseTransformed(res, user),
            ' Error unassigning all', res, logger)

        if (results) {
            res.setHeader('Access-Control-Allow-Origin', '*')
            res.setHeader('content-type', 'application/json')
            res.status(200).send(JSON.stringify(results))
        }
    }
}

export async function assign(req, res) {
    {
        const results = await asyncReturnOrError(getNewCase(req.auth.id), ' Error assigning new', res, logger)

        if (results) {
            res.setHeader('Access-Control-Allow-Origin', '*')
            res.setHeader('content-type', 'application/json')
            res.status(200).send(JSON.stringify(results))
        }
    }
}

export async function raw(res) {
    const user = await getUser()

    const results = await asyncReturnOrError(getMutiJudCaseRaw(user), ' Error getting raw', res, logger)

    if (results) {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('content-type', 'application/json')
        res.status(200).send(JSON.stringify(results))
    }
}

export async function rawCOH(res) {
    const user = await getUser()

    const results = await asyncReturnOrError(getMutiJudCaseRawCoh(res, user), ' Error getting raw', res, logger)

    if (results) {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('content-type', 'application/json')
        res.status(200).send(JSON.stringify(results))
    }
}

export default app => {
    const router = express.Router({ mergeParams: true })
    app.use('/cases', router)

    router.get('/', async (req: any, res, next) => getCases(res))
    router.get('/unassign/all', async (req: any, res, next) => unassign(res))
    router.post('/assign/new', async (req: any, res, next) => assign(req, res))
    router.get('/raw', async (req: any, res, next) => raw(res))
    router.get('/raw/coh', async (req: any, res, next) => rawCOH(res))
}
