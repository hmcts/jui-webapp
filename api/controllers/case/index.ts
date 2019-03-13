import * as express from 'express'
import * as errorStack from '../../lib/errorStack'
import * as log4jui from '../../lib/log4jui'
import { request } from '../../lib/middleware/responseRequest'
import { CCDCaseWithSchema } from '../../lib/models'
import { processCaseState } from '../../lib/processors/case-state-model'
import { dataLookup } from '../../lib/processors/value-processor'
import { asyncReturnOrError, judgeLookUp } from '../../lib/util'
import { getCCDCase } from '../../services/ccd-store-api/ccd-store'
import { getHearingByCase } from '../../services/cohQA'
import { getDocuments } from '../../services/DMStore'
import { getEvents } from '../events'
import { getAllQuestionsByCase } from '../questions/index'
import * as getCaseTemplate from './templates/index'

const logger = log4jui.getLogger('case')

function hasCOR(jurisdiction, caseType) {
    return jurisdiction === 'SSCS'
}

export function checkValidUser(caseData) {
    const req = request()
    const user = req.session.user
    // best to get by id else all we have is name and thus two members with the same name could have access
    const disabilityId = caseData.assignedToDisabilityMember ?
        parseInt(caseData.assignedToDisabilityMember.split('|')[0], 10) : null
    const medicalId = caseData.assignedToMedicalMember ?
        parseInt(caseData.assignedToMedicalMember.split('|')[0], 10) : null
    const judge = caseData.assignedToJudge
    return (judge === user.email || disabilityId === user.id || medicalId === user.id)

}

export async function getCaseWithEventsAndQuestions(userId, jurisdiction, caseType, caseId): Promise<[any, any, any, any]> {
    const caseData = await getCCDCase(userId, jurisdiction, caseType, caseId)
    const events = await getEvents(userId, jurisdiction, caseType, caseId)
    let hearing
    let questions

    if (hasCOR(jurisdiction, caseType)) {
        hearing = await getHearingByCase(caseId)
        questions = await getAllQuestionsByCase(caseId, userId, jurisdiction)
    }


    if (!checkValidUser(caseData.case_data)) {
        logger.error('unauthorised user for particular case')
        throw new Error()
    }
    await normaliseForPanel(caseData.case_data)


    return [caseData, events, hearing, questions]
}

export async function appendDocuments(caseData, schema) {
    let documents = await getDocuments(getDocIdList(caseData.documents))
    documents = appendDocIdToDocument(documents)
    caseData.documents = documents
    schema.documents = documents
    return { caseData, schema }
}

export function replaceSectionValues(section, caseData) {
    if (section.sections && section.sections.length) {
        section.sections.forEach(childSection => {
            replaceSectionValues(childSection, caseData)
        })
    } else {
        section.fields.forEach(field => {
            field.value = dataLookup(field.value, caseData)
        })
    }
}

function getDocIdList(documents) {
    return (documents || []).map(document => {
        const splitDocLink = document.document_url.split('/')
        return splitDocLink[splitDocLink.length - 1]
    })
}

function appendDocIdToDocument(documents) {
    return documents.map(doc => {
        const splitURL = doc._links.self.href.split('/')
        doc.id = splitURL[splitURL.length - 1]
        return doc
    })
}

function appendCollectedData([caseData, events, hearings, questions]) {
    caseData.events = events
    caseData.hearing_data = hearings && hearings.online_hearings ? hearings.online_hearings[0] : []
    caseData.question_data = questions ? questions.sort((a, b) => a.question_round_number < b.question_round_number) : []

    return caseData
}

function applySchema(caseData): CCDCaseWithSchema {
    let schema = JSON.parse(JSON.stringify(getCaseTemplate.default(caseData.jurisdiction, caseData.case_type_id)))
    if (schema.details) {
        replaceSectionValues(schema.details, caseData)
    }
    schema.sections.forEach(section => replaceSectionValues(section, caseData))

    schema = {
        case_jurisdiction: caseData.jurisdiction,
        case_type_id: caseData.case_type_id,
        id: caseData.id,
        ...schema,
    }

    return { caseData, schema }
}

function normaliseForPanel(caseData) {
    if (caseData.assignedToJudge) {
        caseData.assignedToJudgeName = judgeLookUp(caseData.assignedToJudge)
    }

    if (caseData.assignedToDisabilityMember) {
        const disabilityArray = caseData.assignedToDisabilityMember.split('|')
        if (disabilityArray.length > 1) {
            caseData.assignedToDisabilityMember = disabilityArray[1]
        }
    }

    if (caseData.assignedToMedicalMember) {
        const medicalArray = caseData.assignedToMedicalMember.split('|')
        if (medicalArray.length > 1) {
            caseData.assignedToMedicalMember = medicalArray[1]
        }
    }
}

export async function getCaseData(userId, jurisdiction, caseType, caseId) {
    const caseDataArray: [any, any, any, any] = await getCaseWithEventsAndQuestions(userId, jurisdiction, caseType, caseId)
    return appendCollectedData(caseDataArray)
}

export async function getCaseTransformed(userId, jurisdiction, caseType, caseId, req) {
    const caseData = await getCaseData(userId, jurisdiction, caseType, caseId)
    let processedData: CCDCaseWithSchema = applySchema(processCaseState(caseData))
    processedData = await appendDocuments(processedData.caseData, processedData.schema)
    return processedData.schema
}

export async function getCaseRaw(userId, jurisdiction, caseType, caseId, req) {
    return getCaseData(userId, jurisdiction, caseType, caseId)
        .then(caseData => appendDocuments(caseData, {}))
        .then(({ caseData, schema }) => caseData)
}

// GET case callback
export default app => {
    const router = express.Router({ mergeParams: true })
    app.use('/case', router)

    router.get('/:jur/:casetype/:case_id', async (req, res, next) => {
        const userId = req.auth.userId
        const jurisdiction = req.params.jur
        const caseType = req.params.casetype
        const caseId = req.params.case_id

        const CCDCase = await asyncReturnOrError(
            getCaseTransformed(userId, jurisdiction, caseType, caseId, req),
            `Error getting Case`,
            res,
            logger
        )

        if (CCDCase) {
            res.setHeader('Access-Control-Allow-Origin', '*')
            res.setHeader('content-type', 'application/json')
            res.status(200).send(JSON.stringify(CCDCase))
        }
    })

    router.get('/:jur/:casetype/:case_id/raw', async (req, res, next) => {
        const userId = req.auth.userId
        const jurisdiction = req.params.jur
        const caseType = req.params.casetype
        const caseId = req.params.case_id

        const CCDCase = await asyncReturnOrError(
            getCaseRaw(userId, jurisdiction, caseType, caseId, req),
            `Error getting Case`,
            res,
            logger
        )

        if (CCDCase) {
            res.setHeader('Access-Control-Allow-Origin', '*')
            res.setHeader('content-type', 'application/json')
            res.status(200).send(JSON.stringify(CCDCase))
        }
    })
}
