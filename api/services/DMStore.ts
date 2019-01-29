import * as express from 'express'
import * as log4js from 'log4js'
import {map} from 'p-iteration'
import {config} from '../../config'
import {http} from '../lib/http'
import {asyncReturnOrError} from '../lib/util'
import {ERROR_UNABLE_TO_UPLOAD_DOCUMENT} from './dmStoreConstants'

const generateRequest = require('../lib/request/request')
const headerUtilities = require('../lib/utilities/headerUtilities')
const fs = require('fs')
const formidable = require('formidable')

import {Classification, DMDocument, DMDocuments} from '../lib/models'
import {getEventToken, prepareCaseForUploadFR, postCase} from '../lib/utilities/ccdStoreTokenUtilities'

const url = config.services.dm_store_api

const logger = log4js.getLogger('dm-store')
logger.level = config.logging || 'off'

/**
 * DOCUMENT DATA
 */

// Retrieves JSON representation of a Stored Document.const response =  await asyncReturnOrError(
export async function getDocument(documentId: string): Promise<JSON> {
    const response = await asyncReturnOrError(
        http.get(`${url}/documents/${documentId}`),
        `Error getting document ${documentId}`,
        null,
        logger,
        false
    )

    return response ? response.data : null
}

// Retrieves JSON[] representation of a list of Stored Document.
// TODO: could ask DM team to have a muti doc list in the future move a layer down.
export async function getDocuments(documentIds: string[] = []) {
    const documents = await map(documentIds, async (documentId: any) => {
        return await asyncReturnOrError(getDocument(documentId), `Error getting document ${documentId}`, null, logger, false)
    })

    return documents.filter(document => !!document)
}

// Returns a specific version of the content of a Stored Document.
export async function getDocumentVersion(documentId: string, versionId: string): Promise<JSON> {
    const response = await asyncReturnOrError(
        http.get(`${url}/documents/${documentId}/versions/${versionId}`),
        `Error getting document ${documentId} version ${versionId}`,
        null,
        logger,
        false
    )

    return response ? response.data : null
}

/**
 * DOCUMENT BINARY
 */

// Streams contents of the most recent Document Content Version associated with the Stored Document.
export async function getDocumentBinary(documentId: string) {
    const response = await asyncReturnOrError(
        http.get(`${url}/documents/${documentId}/binary`, {responseType: 'stream'}),
        `Error getting Binary for document ${documentId}`,
        null,
        logger,
        false
    )

    return response.data
}

// Streams a specific version of the content of a Stored Document.
export async function getDocumentVersionBinary(documentId: string, versionId: string): Promise<JSON> {
    const response = await asyncReturnOrError(
        http.get(`${url}/documents/${documentId}/versions/${versionId}/binary`, {responseType: 'stream'}),
        `Error getting Binary for document ${documentId} version ${versionId}`,
        null,
        logger,
        false
    )

    return response.data
}

/**
 * DOCUMENT THUMBNAIL
 */

// Streams contents of the most recent Document Content Version associated with the Stored Document.
export async function getDocumentThumbnail(documentId: string): Promise<JSON> {
    const response = await asyncReturnOrError(
        http.get(`${url}/documents/${documentId}/thumbnail`, {responseType: 'stream'}),
        `Error getting document ${documentId} thumbnail`,
        null,
        logger,
        false
    )

    return response.data
}

//     GET /documents/{documentId}/versions/{versionId}/thumbnail
export async function getDocumentVersionThumbnail(documentId: string, versionId: string): Promise<JSON> {
    const response = await asyncReturnOrError(
        http.get(`${url}/documents/${documentId}/versions/${versionId}/thumbnail`, {responseType: 'stream'}),
        `Error getting document ${documentId} version ${versionId} thumbnail`,
        null,
        logger,
        false
    )

    return response.data
}

/**
 * DOCUMENT CREATION
 */

// Creates a list of Stored Documents by uploading a list of binary/text files.
// TODO: Check if this is being used anywhere, if not deprecate
export async function postDocument(file, classification) {
    const body: any = {}
    body.formData = {
        classification: getClassification(classification),
        files: [
            {
                options: {filename: file.name, contentType: file.type},
                value: fs.createReadStream(file.path),
            },
        ],
    }

    const response = await asyncReturnOrError(
        http.post(`${url}/documents`, body, {
            headers: {
                contentType: file.type,
            },
        }),
        `Error posting document`,
        null,
        logger,
        false
    )

    return response.data
}

export function postUploadedDocument(file, classification, options) {
    console.log('postUploadedDocument');
    const reqOptions = {
        ...options, ...{
            formData: {
                classification: getClassification(classification),
                files: [
                    {
                        options: {filename: file.name, contentType: file.type},
                        value: fs.createReadStream(file.path),
                    },
                ],
            },
            headers: {
                ...options.headers, ...{
                    'Content-Type': 'multipart/form-data',
                },
            },
        },
        json: false,
    }

    //TODO: Once working replace with asyncReturnOrError
    return generateRequest('POST', `${url}/documents`, reqOptions)
}

/**
 * getClassification
 *
 * If classification has not been entered, we assume that it is public.
 *
 * @param {String} classification - 'RESTRICTED'
 * @return {String}
 */
export function getClassification(classification) {
    return classification || 'PUBLIC'
}

// Adds a Document Content Version and associates it with a given Stored Document.
export async function postDocumentVersion(documentId: string, file, body): Promise<JSON> {
    const response = await asyncReturnOrError(
        http.post(`${url}/documents/${documentId}`, body),
        `Error posting document ${documentId} version `,
        null,
        logger,
        false
    )

    return response.data
}

// Adds a Document Content Version and associates it with a given Stored Document.
export async function postDocumentVersionVersion(documentId: string, file, body): Promise<JSON> {
    const response = await asyncReturnOrError(
        http.post(`${url}/documents/${documentId}`, body),
        `Error posting document ${documentId} version version`,
        null,
        logger,
        false
    )

    return response.data
}

/**
 * DOCUMENT UPDATE
 */

// Updates document instance (ex. ttl)
export async function patchDocument(documentId: string, updateDocumentCommand, body): Promise<JSON> {
    const response = await asyncReturnOrError(
        http.patch(`${url}/documents/${documentId}`, {...body, updateDocumentCommand}),
        `Error updating document ${documentId}`,
        null,
        logger,
        false
    )

    return response.data
}

/**
 * DOCUMENT DELETION
 */

// Deletes a Stored Document.
export async function deleteDocument(documentId: string): Promise<JSON> {
    const response = await asyncReturnOrError(
        http.delete(`${url}/documents/${documentId}`),
        `Error deleting document ${documentId}`,
        null,
        logger,
        false
    )

    return response.data
}

/**
 * DOCUMENT ORDERS
 */

// Retrieves audits related to a Stored Document.
export async function getDocumentAuditEntries(documentId: string): Promise<JSON> {
    const response = await asyncReturnOrError(
        http.get(`${url}/documents/${documentId}/auditEntries`),
        `Error deleting document ${documentId}`,
        null,
        logger,
        false
    )

    return response.data
}

// Search stored documents using metadata.
export async function filterDocument(body): Promise<JSON> {
    const response = await asyncReturnOrError(
        http.post(`${url}/documents/filter`, body),
        `Error filtering document`,
        null,
        logger,
        false
    )

    return response.data
}

// Search stored documents by ownership.
// TODO: Investigate why this is not returning a response.
// note that params and body are both valid.
export async function ownedDocument(params, body): Promise<JSON> {

    const queryStringParams = Object.keys(params)
        .map(key => key + '=' + params[key])
        .join('&')

    const response = await asyncReturnOrError(
        http.post(`${url}/documents/owned?${queryStringParams}`, body),
        `Error searching owned  document`,
        null,
        logger,
        false
    )

    return response.data
}

// TODO : This Legacy version works, but the newer function above does not, investigate.
function ownedDocumentLegacy(params, options) {
    const queryStringParams = Object.keys(params).map(key => key + '=' + params[key]).join('&')
    return generateRequest('POST', `${url}/documents/owned?${queryStringParams}`, options)
}

// Starts migration for a specific version of the content of a Stored Document.
export async function postDocumentVersionMigrate(documentId: string, versionId: string, body): Promise<JSON> {
    const response = await asyncReturnOrError(
        http.post(`${url}/documents/${documentId}/versions/${versionId}/migrate`, body),
        `Error storing migration for document ${documentId} version ${versionId}`,
        null,
        logger,
        false
    )

    return response.data
}

export async function getHealth(): Promise<JSON> {
    const response = await asyncReturnOrError(http.get(`${url}/health`), `Error getting health`, null, logger, false)

    return response.data
}

export async function getInfo(): Promise<JSON> {
    const response = await asyncReturnOrError(http.get(`${url}/info`), `Error getting info`, null, logger, false)

    return response.data
}

// TODO: Use import here.
function getOptions(req) {
    return headerUtilities.getAuthHeadersWithUserIdAndRoles(req)
}

/**
 * postDocumentAndAssociateWithCase
 *
 * Note that you can navigate to: /demo and see the uploaded document in Document Store. As the component
 * on demo is hooked into retrieve all documents uploaded by a user.
 *
 * @param req
 * @param caseId
 * @param file
 * @param classification
 * @param options
 */
// async function postDocumentAndAssociateWithCase(req, caseId, file, fileNotes, classification, options) {
//
//     const userId = req.auth.userId
//
//     const jurisdiction = 'DIVORCE'
//     const caseType = 'FinancialRemedyMVP2'
//     const eventId = 'FR_uploadDocument'
//
//     const response = await asyncReturnOrError(
//         postUploadedDocument(file, classification, options),
//         `Error uploading document`,
//         null,
//         logger,
//         false)
//
//     if (!response) {
//         return Promise.reject({
//             message: ERROR_UNABLE_TO_UPLOAD_DOCUMENT,
//             status: 500,
//         })
//     }
//
//     const data: DMDocuments = JSON.parse(response)
//     const dmDocument: DMDocument = data._embedded.documents.pop()
//     return await getTokenAndMakePayload(userId, caseId, jurisdiction, caseType, eventId, fileNotes, dmDocument)
// }

async function postDocumentAndAssociateWithCaseNew(userId, caseId, file, fileNotes, classification, options) {

    const jurisdiction = 'DIVORCE'
    const caseType = 'FinancialRemedyMVP2'
    const eventId = 'FR_uploadDocument'

    const response = await asyncReturnOrError(
        postUploadedDocument(file, classification, options),
        `Error uploading document`,
        null,
        logger,
        false)

    if (!response) {
        return Promise.reject({
            message: ERROR_UNABLE_TO_UPLOAD_DOCUMENT,
            status: 500,
        })
    }

    const data: DMDocuments = JSON.parse(response)
    const dmDocument: DMDocument = data._embedded.documents.pop()

    let eventToken = ''

    // Get Event Token
    try {
        eventToken = await getEventToken(userId, caseId, jurisdiction, caseType, eventId)
        console.log(eventToken)
    } catch (error) {
        return error
    }

    //Prepare the case for upload in here, as it's heavily related to the service line
    const payload = prepareCaseForUploadFR(
        eventToken,
        eventId,
        dmDocument,
        fileNotes
    )

    return await postCase(userId, caseId, jurisdiction, caseType, payload)
}

/**
 * Routing Logic
 *
 * TODO : We should move this out into a seperate routes file.
 */
export default app => {
    const router = express.Router({mergeParams: true})
    app.use('/dm-store', router)

    router.get('/health', (req, res, next) => {
        res.send(getHealth()).status(200)
    })

    router.get('/info', (req, res, next) => {
        res.send(getInfo()).status(200)
    })

    /**
     * This route uploads the document and associates the document with a case. This is done in one request,
     * as it makes sense that the UI doesn't have to do two calls, one to upload and one to associate.
     *
     * TODO: Perhaps place uploads in the route so that it's easy to see what this route does.
     * TODO: Should this be here?
     * TODO: Should we have two endpoints? should the front end know that it needs to be associated?
     */
    router.post('/documents/upload/:caseId', (req, res) => {

        console.log('/documents/upload/:caseId')
        const form = new formidable.IncomingForm()
        const caseId = req.params.caseId
        const userId = req.auth.userId

        let fileNotes = ''

        form.on('field', (name, value) => {
            if (name === 'fileNotes') {
                fileNotes = value
            }
        })

        form.on('file', async (name, file) => {
            try {
                const response = await postDocumentAndAssociateWithCaseNew(userId, caseId, file, fileNotes, 'PUBLIC', getOptions(req))
                res.send(response).status(200)
            } catch (error) {
                res.status(error.status)
                res.send(error.message)
            }
        })

        form.parse(req)
    })

    /**
     * /documents/owned
     *
     * Used to show documents on the /demo UI page.
     */
    router.post('/documents/owned', (req, res, next) => {
        ownedDocumentLegacy(req.query, getOptions(req)).pipe(res)
    })
}
