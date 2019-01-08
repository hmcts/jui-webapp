const express = require('express')
const getCaseTemplate = require('./templates/index')
const valueProcessor = require('../../lib/processors/value-processor')
const { processCaseState } = require('../../lib/processors/case-state-model')

const { getDocuments } = require('../../services/dm-store-api/dm-store-api')
const { getAllQuestionsByCase } = require('../questions/index')

const { getHearingByCase } = require('../../services/coh-cor-api/coh-cor-api')

import { getEvents } from '../events/index'
import * as headerUtilities from '../../lib/utilities/headerUtilities'
import { getCCDCase } from '../../services/ccd-store-api/ccd-store'

function hasCOR(jurisdiction, caseType) {
    return jurisdiction === 'SSCS'
}

function getCaseWithEventsAndQuestions(userId, jurisdiction, caseType, caseId) {
    const promiseArray = [
        getCCDCase(userId, jurisdiction, caseType, caseId),
        getEvents(userId, jurisdiction, caseType, caseId)
    ]

    if (hasCOR(jurisdiction, caseType)) {
        promiseArray.push(getHearingByCase(caseId))
        promiseArray.push(getAllQuestionsByCase(caseId, userId, jurisdiction))
    }

    return Promise.all(promiseArray)
}

function appendDocuments(caseData, schema, options) {
    return new Promise(resolve => {
        getDocuments(getDocIdList(caseData.documents), options)
            .then(appendDocIdToDocument)
            .then(documents => {
                caseData.documents = documents
                schema.documents = documents
                resolve({ caseData, schema })
            })
    })
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

function applySchema(caseData) {
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

function getCaseData(userId, jurisdiction, caseType, caseId) {
    return getCaseWithEventsAndQuestions(userId, jurisdiction, caseType, caseId).then(
        ([caseData, events, hearings, questions]) => appendCollectedData([caseData, events, hearings, questions])
    )
}

function getCaseTransformed(userId, jurisdiction, caseType, caseId, req) {
    return getCaseData(userId, jurisdiction, caseType, caseId)
        .then(processCaseState)
        .then(applySchema)
        .then(({ caseData, schema }) => appendDocuments(caseData, schema, getOptionsDoc(req)))
        .then(({ caseData, schema }) => schema)
}

function getCaseRaw(userId, jurisdiction, caseType, caseId, req) {
    return getCaseData(userId, jurisdiction, caseType, caseId)
        .then(caseData => appendDocuments(caseData, {}, getOptionsDoc(req)))
        .then(({ caseData, schema }) => caseData)
}

function getOptionsDoc(req) {
    return headerUtilities.getAuthHeadersWithUserRoles(req)
}

// GET case callback
module.exports = app => {
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
