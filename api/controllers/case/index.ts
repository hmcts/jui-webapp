const express = require('express')
const getCaseTemplate = require('./templates/index')
const valueProcessor = require('../../lib/processors/value-processor')
const { processCaseState } = require('../../lib/processors/case-state-model')

const { getAllQuestionsByCase } = require('../questions/index')

import { CCDCaseWithSchema } from '../../lib/models'
import { getCCDCase } from '../../services/ccd-store-api/ccd-store'
import { getHearingByCase } from '../../services/coh-cor-api/coh-cor-api'
import { getDocuments } from '../../services/DMStore'
import { getEvents } from '../events'

function hasCOR(jurisdiction, caseType) {
    return jurisdiction === 'SSCS'
}

async function getCaseWithEventsAndQuestions(userId, jurisdiction, caseType, caseId): Promise<[any, any, any, any]> {
    const caseData = await getCCDCase(userId, jurisdiction, caseType, caseId)
    const events = await getEvents(userId, jurisdiction, caseType, caseId)
    let hearing
    let questions

    if (hasCOR(jurisdiction, caseType)) {
        hearing = await getHearingByCase(caseId)
        questions = await getAllQuestionsByCase(caseId, userId, jurisdiction)
    }

    return [caseData, events, hearing, questions]
}

async function appendDocuments(caseData, schema) {
    let documents = await getDocuments(getDocIdList(caseData.documents))
    documents = appendDocIdToDocument(documents)
    caseData.documents = documents
    schema.documents = documents
    return { caseData, schema }
}

function replaceSectionValues(section, caseData) {
    if (section.sections && section.sections.length) {
        section.sections.forEach(childSection => {
            replaceSectionValues(childSection, caseData)
        })
    } else {
        section.fields.forEach(field => {
            field.value = valueProcessor(field.value, caseData)
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
    let schema = JSON.parse(JSON.stringify(getCaseTemplate(caseData.jurisdiction, caseData.case_type_id)))
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

async function getCaseData(userId, jurisdiction, caseType, caseId) {
    const caseDataArray: [any, any, any, any] = await getCaseWithEventsAndQuestions(userId, jurisdiction, caseType, caseId)
    return appendCollectedData(caseDataArray)
}

async function getCaseTransformed(userId, jurisdiction, caseType, caseId, req) {
    const caseData = await getCaseData(userId, jurisdiction, caseType, caseId)
    let processedData: CCDCaseWithSchema = applySchema(processCaseState(caseData))
    processedData = await appendDocuments(processedData.caseData, processedData.schema)
    return processedData.schema
}

function getCaseRaw(userId, jurisdiction, caseType, caseId, req) {
    return getCaseData(userId, jurisdiction, caseType, caseId)
        .then(caseData => appendDocuments(caseData, {}))
        .then(({ caseData, schema }) => caseData)
}

// GET case callback
export default app => {
    const router = express.Router({ mergeParams: true })
    app.use('/case', router)

    router.get('/:jur/:casetype/:case_id', (req, res, next) => {
        const userId = req.auth.userId
        const jurisdiction = req.params.jur
        const caseType = req.params.casetype
        const caseId = req.params.case_id

        getCaseTransformed(userId, jurisdiction, caseType, caseId, req)
            .then(result => {
                res.setHeader('Access-Control-Allow-Origin', '*')
                res.setHeader('content-type', 'application/json')
                res.status(200).send(JSON.stringify(result))
            })
            .catch(response => {
                console.log(response.error || response)
                res.status(response.error.status).send(response.error.message)
            })
    })

    router.get('/:jur/:casetype/:case_id/raw', (req, res, next) => {
        const userId = req.auth.userId
        const jurisdiction = req.params.jur
        const caseType = req.params.casetype
        const caseId = req.params.case_id

        getCaseRaw(userId, jurisdiction, caseType, caseId, req)
            .then(result => {
                res.setHeader('Access-Control-Allow-Origin', '*')
                res.setHeader('content-type', 'application/json')
                res.status(200).send(JSON.stringify(result))
            })
            .catch(response => {
                console.log(response.error || response)
                res.status(response.error.status).send(response.error.message)
            })
    })
}
