import * as express from 'express'
import { map } from 'p-iteration'

import { config } from '../../../config';
import columns from '../../lib/config/refCaselistCols'
import * as errorStack from '../../lib/errorStack'
import { filterByCaseTypeAndRole } from '../../lib/filters'
import * as log4jui from '../../lib/log4jui'
import { processCaseState } from '../../lib/processors/case-state-model'
import { getTotalPages } from '../../lib/pagination'
import { dataLookup as valueProcessor } from '../../lib/processors/value-processor'
import { asyncReturnOrError } from '../../lib/util'
import { getMutiJudCCDCases, getMultiplyCasesPaginationMetadata } from '../../services/ccd-store-api/ccd-store'
import { getDecision } from '../../services/coh'
import { getHearingByCase } from '../../services/cohQA'
import { getUser } from '../../services/idam'
import { getAllQuestionsByCase } from '../questions/index'
import { getNewCase, unassignAllCaseFromJudge } from './assignCase'
import { isCaseListPopulated, isAnyCaseViewableByAJudge } from '../../lib/case-list/case-list-helper'

const getListTemplate = require('./templates/index')
const { caseStateFilter } = require('../../lib/processors/case-state-util')
import { ERROR_UNABLE_TO_APPEND_TO_COR, ERROR_UNABLE_TO_APPEND_QRS, ERROR_UNABLE_TO_GET_CASES, ERROR_UNABLE_TO_GET_HEARING_BY_CASE } from '../../lib/errors'
const logger = log4jui.getLogger('case-list')
const that = this

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

/**
 * caseLists looks like the following at this point.
 *
 * @param caseLists - [ [ { id: 1554974408669103,
 *     jurisdiction: 'SSCS',
 *     state: [Object],
 *     case_type_id: 'Benefit',
 *     created_date: '2019-04-11T09:20:08.602',
 *     last_modified: '2019-04-11T09:20:17Z',
 *     security_classification: 'PUBLIC',
 *     case_data: [Object],
 *     data_classification: [Object],
 *     after_submit_callback_response: null,
 *     callback_response_status_code: null,
 *     callback_response_status: null,
 *     delete_draft_response_status_code: null,
 *     delete_draft_response_status: null,
 *     security_classifications: [Object],
 *     hearing_data: [Object],
 *     question_data: [Array] } ] ]
 *
 * @return [ [] ]
 */
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
    return await getMutiJudCCDCases(userDetails.id, filterByCaseTypeAndRole(userDetails), 0)
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

const ERROR_RETRIEVING_CASES = 'ERROR_RETRIEVING_CASES'
const JUDGE_HAS_NO_VIEWABLE_CASES = 'JUDGE_HAS_NO_VIEWABLE_CASES'
const ERROR_TRANSFORMING_CASES = 'ERROR_TRANSFORMING_CASES'
const JUDGE_HAS_VIEWABLE_CASES = 'JUDGE_HAS_VIEWABLE_CASES'

/**
 * Get List of cases and transform them to the correct format.
 *
 * The following was a legacy function that returned null for every error it encountered, and for no cases.
 * This has now been changed as we needed to make a disparity between errors and the judge having no
 * viewable cases.
 *
 * At: <code>appendCOR</code> func appends a hearing_data object onto each case, in the caseList. The hearing_data object is
 * always attached to each case.
 *
 *
 * At: <code>appendQuestionRound</code> func appends question_data onto each case, within the caseList.
 *
 *
 * At: <code>!isCaseListPopulated(caseList)</code>
 *
 * If we get to is <code>!isCaseListPopulated(caseList)</code> and caseList is not populated then
 * there has been an issue in getting the cases from CCD therefore we should throw an error with an
 * appropriate error message, in this case: 'ERROR_RETRIEVING_CASES'
 *
 * The error stack should have been set already at this point.
 *
 * @see unit test around isCaseListPopulated the shape of caseLists object
 * at this point.
 *
 *
 * At code: <code>applyStateFilter(caseList)</code>
 *
 * If the state of the case, retrieved from caseData.state.stateName does not match
 * with the cases the Judges should see, then we do not show the Case to a Judge.
 *
 *
 * At code: <code>!isAnyCaseViewableByAJudge(caseList)</code>
 *
 * If the Judge has no viewable cases we should pass back a message stating this. So that we
 * can hook into this to display 'User has no cases' on the front end.
 */
export async function getMutiJudCaseTransformed(res, userDetails, requestCcdPage) {

    let caseList

    const jurisdictions = filterByCaseTypeAndRole(userDetails)

    caseList = await asyncReturnOrError(getMutiJudCCDCases(userDetails.id, jurisdictions, requestCcdPage), 'Error getting Multi' +
        'Jurisdictional assigned cases.', null, logger, false)

    if (!isAnyCaseViewableByAJudge(caseList)) {

        return { message: JUDGE_HAS_NO_VIEWABLE_CASES }
    }

    caseList = await asyncReturnOrError(appendCOR(res, caseList), ERROR_UNABLE_TO_APPEND_TO_COR.humanStatusCode,
        null, logger, false)

    caseList = await asyncReturnOrError(appendQuestionsRound(caseList, userDetails.id),
        ERROR_UNABLE_TO_APPEND_QRS.humanStatusCode, null, logger, false)

    caseList = processCaseListsState(caseList)

    if (!isCaseListPopulated(caseList)) {

        return { message: ERROR_RETRIEVING_CASES }
    }

    caseList = applyStateFilter(caseList)

    if (!isAnyCaseViewableByAJudge(caseList)) {

        return { message: JUDGE_HAS_NO_VIEWABLE_CASES }
    }

    caseList = convertCaselistToTemplate(caseList)
    caseList = combineLists(caseList)
    caseList = sortTransformedCases(caseList)
    caseList = aggregatedData(caseList)

    if (!hasCases(caseList)) {
        return { message: ERROR_TRANSFORMING_CASES }
    }
    return {
        message: JUDGE_HAS_VIEWABLE_CASES,
        result: caseList,
    }
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

    let caseLists = await getMutiJudCCDCases(req.auth.id, filters, 0)
    caseLists = combineLists(caseLists)
    caseLists = unassignAllCaseFromJudge(req.auth.id, caseLists)

    return caseLists
}

/**
 * Get Cases
 *
 * <code>req.query.requestCcdPage</code>
 * requestCcdPage is taken from the requests query params. We use 'requestCcdPage' to request a different page of results from CCD.
 *
 * Yes it could of been called 'page' but it would throw another develop off, as page would refer to the UI next page, where
 * this refers to the request that is page for the next CCD page, and we run the CCD results through more filters, to supply
 * the UI with all the Cases or a filtered set of Cases.
 *
 * Note that we still have logic after the request to CCD is made that may remove Cases.
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
export async function getCases(req, res) {

    const requestCcdPage = req.query.requestCcdPage
    const user = await getUser()

    let results = null

    let tryCCD = 0

    while (tryCCD < config.maxCCDRetries && !results) {
        // need to disable error sending here and catch it later if retrying
        results = await asyncReturnOrError(that.getMutiJudCaseTransformed(res, user, requestCcdPage), ' Error getting case list',
            res, logger, false)

        tryCCD++
    }

    let responseStatusCode
    let responseResult

    if (results) {
        switch (results.message) {

            case ERROR_RETRIEVING_CASES:
            case ERROR_TRANSFORMING_CASES:

                logger.error(ERROR_UNABLE_TO_GET_CASES.humanStatusCode)
                responseStatusCode = 500
                responseResult = JSON.stringify(errorStack.get())
                break

            case JUDGE_HAS_NO_VIEWABLE_CASES:

                responseStatusCode = 200
                responseResult = { message: JUDGE_HAS_NO_VIEWABLE_CASES }
                break

            case JUDGE_HAS_VIEWABLE_CASES:

                responseStatusCode = 200
                responseResult = JSON.stringify(results.result)
                break
        }

        res.status(responseStatusCode).send(responseResult)
    } else {
        res.status(500).send(JSON.stringify(errorStack.get()))
    }
}

/**
 * getCasesPaginationMetadata
 *
 * Note that there could be multiply filters, returned by
 * <code>filterByCaseTypeAndRole(userDetails)</code>
 *
 * This is for a User who has multiply filters assigned to them. We currently take the total pages from all jurisdictions
 * and add them together. This may increase the number of pages by 1 or 2. But if a User were to click one of these
 * pages at the end of the pagination list the request will return nothing, therefore a 'No Cases' view will be displayed, which is fine.
 *
 * We do this as the cases returned by CCD are concatenated in
 * @see ccd-store.ts getMutiJudCCDCases()
 *
 * This implementation is a stop gap measure as JUI will be deprecated.
 *
 * To implement this correctly we would have to 1. Stop concatenating the cases. 2. Have a filter on the UI where the User
 * selects what filter they wish to use, and then we display the Cases and Pagination relating to that Filter.
 *
 * We shouldn't concatenate Cases ever in the UI as this would always throw off a pagination page number, returned from CCD.
 *
 * It seems the Cases results have been concatenated as CCD doesn't support filtering by &case.assignedToDisabilityMember=510604|Medical 1
 * and &case.assignedToMedicalMember=510604|Medical 1 in one call. Therefore pagination will only approximately reflect
 * the Pages that a User has, if the User has more than one filter.
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
export async function getCasesPaginationMetadata(req, res) {

    try {
        const userDetails = await getUser()
        const userId = userDetails.id

        const jurisdictions = filterByCaseTypeAndRole(userDetails)

        const paginationMetadata = await getMultiplyCasesPaginationMetadata(userId, jurisdictions)
        const totalPages = getTotalPages(paginationMetadata)

        res.status(200).send({
            totalPagesForAllCases: totalPages,
        })
    } catch (error) {
        res.status(error.serviceError.status).send(error)
    }
}

export async function unassign(res) {
    {
        const user = await getUser()

        const results = await asyncReturnOrError(that.getMutiJudCaseTransformed(res, user, 0),
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

/**
 * Routes:
 * /cases/
 * /cases/paginationMetadata
 *
 * @param app
 */
export default app => {
    const router = express.Router({ mergeParams: true })
    app.use('/cases', router)

    router.get('/', async (req: any, res, next) => getCases(req, res))
    router.get('/paginationMetadata', async (req: any, res, next) => getCasesPaginationMetadata(req, res))

    router.get('/unassign/all', async (req: any, res, next) => unassign(res))
    router.post('/assign/new', async (req: any, res, next) => assign(req, res))
    router.get('/raw', async (req: any, res, next) => raw(res))
    router.get('/raw/coh', async (req: any, res, next) => rawCOH(res))
}
