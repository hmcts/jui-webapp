import * as express from 'express'
import { createCase, updateCase } from '../../services/ccdStore'

const getCaseCreationData = require('./templates/index')

const JUI_AUTO_CREATION = 'JUI Auto Creation'
const JUI_AUTO_UPDATE = 'JUI Auto Update'

function createDefaultCase(userId, jurisdiction, caseType) {
    const caseCreationData = getCaseCreationData(jurisdiction, caseType)
    return createCase(
        userId,
        jurisdiction,
        caseType,
        caseCreationData.eventId,
        JUI_AUTO_CREATION,
        JUI_AUTO_CREATION,
        caseCreationData.data,
    )
}

function createSscsCase(userId) {
    return createDefaultCase(userId, 'SSCS', 'Benefits')
}

function createDivCase(userId) {
    return createDefaultCase(userId, 'DIVORCE', 'DIVORCE')
}

function createFrCase(userId) {
    return createDefaultCase(userId, 'DIVORCE', 'FinancialRemedyMVP2')
}

function createFrCaseToApplicationIssued(userId) {
    const jurisdiction = 'DIVORCE'
    const caseType = 'FinancialRemedyMVP2'
    const eventId1 = 'FR_paymentRequired'
    const eventId2 = 'FR_paymenetMade'
    const eventId3 = 'FR_issueApplication'
    const data1 = {}
    const data2 = {}
    const data3 = {}

    return createFrCase(userId)
        .then(obj => {
            console.dir(obj)
            return obj
        })
        .then(caseDate =>
            updateCase(userId, jurisdiction, caseType, caseDate.id, eventId1, JUI_AUTO_UPDATE, JUI_AUTO_UPDATE, data1)
                .then(() =>
                    updateCase(userId, jurisdiction, caseType, caseDate.id, eventId2, JUI_AUTO_UPDATE, JUI_AUTO_UPDATE, data2)
                )
                .then(() =>
                    updateCase(userId, jurisdiction, caseType, caseDate.id, eventId3, JUI_AUTO_UPDATE, JUI_AUTO_UPDATE, data3)
                )
        )
}

module.exports = app => {
    const router = express.Router({ mergeParams: true })
    app.use('/casex/create', router)

    router.get('/:jur/:casetype', (req: any, res, next) => {
        const userId = req.auth.userId
        const jurisdiction = req.params.jur
        const caseType = req.params.casetype
        createDefaultCase(userId, jurisdiction, caseType)
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

    router.get('/DIVORCE/FinancialRemedyMVP2/applicationIssued', (req: any, res, next) => {
        const userId = req.auth.userId
        createFrCaseToApplicationIssued(userId)
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
