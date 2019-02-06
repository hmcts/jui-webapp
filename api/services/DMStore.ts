import * as express from 'express'

import { map } from 'p-iteration'
import { config } from '../../config'
import { http } from '../lib/http'
import * as log4jui from '../lib/log4jui'
import { asyncReturnOrError } from '../lib/util'

import {ERROR_UNABLE_TO_GET_EVENT_TOKEN, ERROR_UNABLE_TO_POST_CASE, ERROR_UNABLE_TO_UPLOAD_DOCUMENT} from '../lib/config/errorConstants'
import {getEventTokenAndCase, postCaseWithEventToken} from './ccd-store-api/ccd-store'

const generateRequest = require('../lib/request/request')
const uploadFileFormData = require('../lib/request/uploadFileFormData')
const headerUtilities = require('../lib/utilities/headerUtilities')
const fs = require('fs')
const formidable = require('formidable')

import {DMDocument, DMDocuments} from '../lib/models/documents'
import {prepareCaseForUploadFR} from './ccd-store-api/ccd-store-payloads'

const url = config.services.dm_store_api

const logger = log4jui.getLogger('dm-store')

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


// Creates a list of Stored Documents by uploading a list of binary/text files.
export async function postDocument(file, classification) {
    const body: any = {}
    body.formData = {
        classification: getClassification(classification),
        files: [
            {
                options: { filename: file.name, contentType: file.type },
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

// TODO : This Legacy version works, but the newer function above does not, investigate,
// when there is time.
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

function getOptions(req) {
    return headerUtilities.getAuthHeadersWithUserIdAndRoles(req)
}

/**
 * uploadDocumentAndAssociateWithCase
 *
 * Steps to upload a document and associate that document with a case.
 *
 * 1. Upload the document to Document Management Store.
 *
 * 2. Get Event Token
 *
 * An Event Token is required to update a case. This token needs to be sent through in the payload to update a case.
 *
 * @see /caseworkers/{uid}/jurisdictions/{jid}/case-types/{ctid}/cases/{cid}/event-triggers/{etid}/token
 *
 * 3. Post Case update (with Event Token)
 *
 * Which is used in the payload for:
 * @see /caseworkers/{uid}/jurisdictions/{jid}/case-types/{ctid}/cases/{cid}/events
 *
 * Once the document has been uploaded, get the Event Token to update a Case, create the payload with that
 * Event Token, and update the Case with a link to the document.
 *
 * TODO: Currently there is a bug, where the CCD Data Store Api returns a 'Request failed with status code 404', this
 * is for an FR Divorce case. It does not occur initially when you create a new FR case, but hopefully this should not
 * occur when the service lines implements the upload correctly to the case defintions file.
 *
 * TODO: Once a service line has implemented upload into their Case Definitions file, use prepareCaseForUpload
 * within ccdDataStoreApiPayloads.ts and check that it works correctly with a service line.
 */
async function uploadDocumentAndAssociateWithCase(userId, caseId, jurisdiction, eventId, caseType, file, fileNotes,
                                                  classification, options, res) {
    const response = await asyncReturnOrError(
        uploadFileFormData(`${url}/documents`, file, classification, options.headers),
        ERROR_UNABLE_TO_UPLOAD_DOCUMENT,
        res,
        logger,
        true)

    const data: DMDocuments = JSON.parse(response)
    const dmDocument: DMDocument = data._embedded.documents.pop()

    const eventTokenResponse = await asyncReturnOrError(
        getEventTokenAndCase(
            userId,
            jurisdiction,
            caseType,
            caseId,
            eventId
        ),
        ERROR_UNABLE_TO_GET_EVENT_TOKEN,
        res,
        logger,
        true)

    const payload = prepareCaseForUploadFR(
        eventTokenResponse.token,
        eventId,
        dmDocument,
        fileNotes
    )

    const postCaseResponse = await asyncReturnOrError(
        postCaseWithEventToken(
            userId,
            jurisdiction,
            caseType,
            caseId,
            payload
        ),
        ERROR_UNABLE_TO_POST_CASE,
        res,
        logger,
        true)

    return postCaseResponse
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
     *
     * This route uploads the document and associates the document with a case. This is done in one request,
     * as it makes sense that the UI doesn't have to do two calls, one to upload and one to associate.
     *
     * TODO: Once a service line implements the the event trigger in it's case definition file, we should test
     * against this, and pass in the jurisdiction, caseType and eventId from the UI.
     */
    router.post('/documents/upload/:caseId', (req, res) => {

        const form = new formidable.IncomingForm()
        const caseId = req.params.caseId
        const userId = req.auth.userId

        const jurisdiction = 'DIVORCE'
        const caseType = 'FinancialRemedyMVP2'
        const eventId = 'FR_uploadDocument'

        let fileNotes = ''

        form.on('field', (name, value) => {
            if (name === 'fileNotes') {
                fileNotes = value
            }
        })

        form.on('file', async (name, file) => {
            try {
                const response = await uploadDocumentAndAssociateWithCase(userId, caseId, jurisdiction, eventId, caseType, file,
                    fileNotes, 'PUBLIC', getOptions(req), res)
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
