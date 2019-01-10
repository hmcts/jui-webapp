import * as express from 'express'
import * as log4js from 'log4js'
import { map } from 'p-iteration'
import { config } from '../../../config'
import { http } from '../../lib/http'
import { asyncReturnOrError } from '../../lib/util'

const generateRequest = require('../../lib/request/request')
const headerUtilities = require('../../lib/utilities/headerUtilities')
const fs = require('fs')
const formidable = require('formidable')

import { Classification, DMDocument, DMDocuments } from '../../lib/models'
import { getTokenAndMakePayload } from '../../lib/utilities/ccdStoreTokenUtilities'

const url = config.services.dm_store_api

const logger = log4js.getLogger('dm-store')
logger.level = config.logging || 'off'

/**
 * DOCUMENT DATA
 */

// Retrieves JSON representation of a Stored Document.
async function getDocument(documentId) {
    const response = await  http.get(`${url}/documents/${documentId}`)
    return response.data
}

// Retrieves JSON[] representation of a list of Stored Document.
// TODO: could ask DM team to have a muti doc list in the future move a layer down.
async function getDocuments(documentIds = [], options) {
    const documents = await map(documentIds, async (documentId: any) => {
        return await asyncReturnOrError(
            getDocument(documentId),
            `Error getting document ${documentId}`,
            null,
            logger,
            false)
    })

    return documents.filter(document => !!document)
}

// Returns a specific version of the content of a Stored Document.
function getDocumentVersion(documentId, versionId, options) {
    return generateRequest('GET', `${url}/documents/${documentId}/versions/${versionId}`, options)
}

/**
 * DOCUMENT BINARY
 */

// Streams contents of the most recent Document Content Version associated with the Stored Document.
function getDocumentBinary(documentId, options) {
    return generateRequest('GET', `${url}/documents/${documentId}/binary`, options)
}

// Streams a specific version of the content of a Stored Document.
function getDocumentVersionBinary(documentId, versionId, options) {
    return generateRequest('GET', `${url}/documents/${documentId}/versions/${versionId}/binary`, options)
}

/**
 * DOCUMENT THUMBNAIL
 */

// Streams contents of the most recent Document Content Version associated with the Stored Document.
function getDocumentThumbnail(documentId, options) {
    return generateRequest('GET', `${url}/documents/${documentId}/thumbnail`, options)
}

//     GET /documents/{documentId}/versions/{versionId}/thumbnail
function getDocumentVersionThumbnail(documentId, versionId, options) {
    return generateRequest('GET', `${url}/documents/${documentId}/versions/${versionId}/thumbnail`, options)
}

/**
 * DOCUMENT CREATION
 */

// Creates a list of Stored Documents by uploading a list of binary/text files.
export function postDocument(file, classification, options) {
    const reqOptions = {
        ...options, ...{
            formData: {
                classification: getClassification(classification),
                files: [
                    {
                        options: { filename: file.name, contentType: file.type },
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

    return generateRequest('POST', `${url}/documents`, reqOptions)
}

//TODO: is this the proper place for this?
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
async function postDocumentAndAssociateWithCase(req, caseId, file, classification, options) {

    const response = await asyncReturnOrError(
        postDocument(file, classification, options),
        `Error uploading document`,
        null,
        logger,
        false)

    const data: DMDocuments = JSON.parse(response)
    const dmDocument: DMDocument = data._embedded.documents.pop()
    return await getTokenAndMakePayload(req, caseId, dmDocument)

}

/**
 * getClassification
 *
 * If classification has not been entered, we assume that it is public.
 *
 * @param {String} classification - 'RESTRICTED'
 * @return {String}
 */
function getClassification(classification: Classification) {
    return classification || Classification.Public
}

// Adds a Document Content Version and associates it with a given Stored Document.
function postDocumentVersion(documentId, file, options) {
    return generateRequest('POST', `${url}/documents/${documentId}`, options)
}

// Adds a Document Content Version and associates it with a given Stored Document.
function postDocumentVersionVersion(documentId, file, options) {
    return generateRequest('POST', `${url}/documents/${documentId}/versions`, options)
}

/**
 * DOCUMENT UPDATE
 */

// Updates document instance (ex. ttl)
function patchDocument(documentId, updateDocumentCommand, options) {
    return generateRequest('PATCH', `${url}/documents/${documentId}`, { ...options, body: updateDocumentCommand })
}

/**
 * DOCUMENT DELETION
 */

// Deletes a Stored Document.
function deleteDocument(documentId, updateDocumentCommand, options) {
    return generateRequest('DELETE', `${url}/documents/${documentId}`, options)
}

/**
 * DOCUMENT ORDERS
 */

// Retrieves audits related to a Stored Document.
function getDocumentAuditEntries(documentId, updateDocumentCommand, options) {
    return generateRequest('GET', `${url}/documents/${documentId}/auditEntries`, options)
}

// Search stored documents using metadata.
function filterDocument(options) {
    return generateRequest('POST', `${url}/documents/filter`, options)
}

// Search stored documents by ownership.
function ownedDocument(params, options) {
    const queryStringParams = Object.keys(params).map(key => key + '=' + params[key]).join('&')
    return generateRequest('POST', `${url}/documents/owned?${queryStringParams}`, options)
}

// Starts migration for a specific version of the content of a Stored Document.
function postDocumentVersionMigrate(documentId, versionId, options) {
    return generateRequest('POST', `${url}/documents/${documentId}/versions/${versionId}/migrate`, options)
}

function getHealth(options) {
    return generateRequest('GET', `${url}/health`, options)
}

function getInfo(options) {
    return generateRequest('GET', `${url}/info`, options)
}

function getOptions(req) {
    return headerUtilities.getAuthHeadersWithUserIdAndRoles(req)
}

/**
 * Routing Logic
 *
 * TODO : We should move this out into a seperate routes file.
 */
module.exports = app => {
    const router = express.Router({ mergeParams: true })
    app.use('/dm-store', router)

    router.get('/health', (req, res, next) => {
        getHealth(getOptions(req)).pipe(res)
    })

    router.get('/info', (req, res, next) => {
        getInfo(getOptions(req)).pipe(res)
    })

    router.post('/documents/filter', (req, res, next) => {
        filterDocument(getOptions(req)).pipe(res)
    })

    router.post('/documents/owned', (req, res, next) => {
        ownedDocument(req.query, getOptions(req)).pipe(res)
    })

    /**
     * Retrieves the file from a multipart form.
     *
     * ///${jurisdiction}/case-types/${caseType}/cases/${caseId}`
     */
    router.post('/documents', (req, res, next) => {
        const form = new formidable.IncomingForm()

        form.on('file', async (name, file) => {
            const response = postDocument(file, Classification.Public, getOptions(req))
            res.send(response).status(200)
        })

        form.parse(req)
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

        const form = new formidable.IncomingForm()
        const caseId = req.params.caseId

        form.on('file', async (name, file) => {
            const response = await postDocumentAndAssociateWithCase(req, caseId, file, 'PUBLIC', getOptions(req))
            res.send(response).status(200)
        })

        form.parse(req)
    })

    router.get('/documents/:documentId/binary', (req, res, next) => {
        const documentId = req.params.documentId
        getDocumentBinary(documentId, getOptions(req)).pipe(res)
    })

    router.get('/documents/:documentId/thumbnail', (req, res, next) => {
        const documentId = req.params.documentId
        getDocumentThumbnail(documentId, getOptions(req)).pipe(res)
    })

    router.delete('/documents/:documentId', (req, res, next) => {
        const documentId = req.params.documentId
        deleteDocument(documentId, '', getOptions(req)).pipe(res)
    })
}

module.exports.getInfo = getInfo

module.exports.getHealth = getHealth

module.exports.getDocument = getDocument

module.exports.getDocuments = getDocuments

module.exports.getDocumentBinary = getDocumentBinary

module.exports.getDocumentThumbnail = getDocumentThumbnail

module.exports.getDocumentVersion = getDocumentVersion

module.exports.getDocumentVersionBinary = getDocumentVersionBinary

module.exports.getDocumentVersionThumbnail = getDocumentVersionThumbnail

module.exports.postDocument = postDocument

module.exports.postDocumentVersion = postDocumentVersion

module.exports.postDocumentVersionVersion = postDocumentVersionVersion

module.exports.patchDocument = patchDocument

module.exports.deleteDocument = deleteDocument

module.exports.getDocumentAuditEntries = getDocumentAuditEntries

module.exports.filterDocument = filterDocument

module.exports.ownedDocument = ownedDocument

module.exports.postDocumentVersionMigrate = postDocumentVersionMigrate
