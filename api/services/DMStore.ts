import * as express from 'express'
import * as log4js from 'log4js'
import { map } from 'p-iteration'
import { config } from '../../config'
import { http } from '../lib/http'
import { asyncReturnOrError } from '../lib/util'
const fs = require('fs')

const url = config.services.dm_store_api

const logger = log4js.getLogger('dm-store')
logger.level = config.logging || 'off'

/**
 * DOCUMENT DATA
 */

// Retrieves JSON representation of a Stored Document.const response =  await asyncReturnOrError(
export async function getDocument(documentId) {
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
export async function getDocuments(documentIds = [], options) {
    const documents = await map(documentIds, async (documentId: any) => {
        return await asyncReturnOrError(getDocument(documentId), `Error getting document ${documentId}`, null, logger, false)
    })

    return documents.filter(document => !!document)
}

// Returns a specific version of the content of a Stored Document.
export async function getDocumentVersion(documentId, versionId) {
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
export async function getDocumentBinary(documentId) {
    const response = await asyncReturnOrError(
        http.get(`${url}/documents/${documentId}/binary`, { responseType: 'stream' }),
        `Error getting Binary for document ${documentId}`,
        null,
        logger,
        false
    )

    return response.data
}

// Streams a specific version of the content of a Stored Document.
export async function getDocumentVersionBinary(documentId, versionId, options) {
    const response = await asyncReturnOrError(
        http.get(`${url}/documents/${documentId}/versions/${versionId}/binary`, { responseType: 'stream' }),
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
export async function getDocumentThumbnail(documentId, options) {
    const response = await asyncReturnOrError(
        http.get(`${url}/documents/${documentId}/thumbnail`, { responseType: 'stream' }),
        `Error getting document ${documentId} thumbnail`,
        null,
        logger,
        false
    )

    return response.data
}

//     GET /documents/{documentId}/versions/{versionId}/thumbnail
export async function getDocumentVersionThumbnail(documentId, versionId, options) {
    const response = await asyncReturnOrError(
        http.get(`${url}/documents/${documentId}/versions/${versionId}/thumbnail`, { responseType: 'stream' }),
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
export async function postDocumentVersion(documentId, file, body) {
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
export async function postDocumentVersionVersion(documentId, file, body) {
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
export async function patchDocument(documentId, updateDocumentCommand, body) {
    const response = await asyncReturnOrError(
        http.patch(`${url}/documents/${documentId}`, { ...body, updateDocumentCommand }),
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
export async function deleteDocument(documentId) {
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
export async function getDocumentAuditEntries(documentId) {
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
export async function filterDocument(body) {
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
export async function ownedDocument(params, body) {
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

// Starts migration for a specific version of the content of a Stored Document.
export async function postDocumentVersionMigrate(documentId, versionId, body) {
    const response = await asyncReturnOrError(
        http.post(`${url}/documents/${documentId}/versions/${versionId}/migrate`, body),
        `Error storing migration for document ${documentId} version ${versionId}`,
        null,
        logger,
        false
    )

    return response.data
}

export async function getHealth() {
    const response = await asyncReturnOrError(http.get(`${url}/health`), `Error getting health`, null, logger, false)

    return response.data
}

export async function getInfo() {
    const response = await asyncReturnOrError(http.get(`${url}/info`), `Error getting info`, null, logger, false)

    return response.data
}

/**
 * Routing Logic
 *
 * TODO : We should move this out into a seperate routes file.
 */
export default app => {
    const router = express.Router({ mergeParams: true })
    app.use('/dm-store', router)

    router.get('/health', (req, res, next) => {
        res.send(getHealth()).status(200)
    })

    router.get('/info', (req, res, next) => {
        res.send(getInfo()).status(200)
    })
}
