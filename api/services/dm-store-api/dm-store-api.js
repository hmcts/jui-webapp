const express = require('express')
const fs = require('fs');
const formidable = require('formidable')

const config = require('../../../config')
const generateRequest = require('../../lib/request/request')
const generateFormRequest = require('../../lib/request/requestFormData')

const url = config.services.dm_store_api

////////////////////////////////////////////////////
// Document Data
////////////////////////////////////////////////////

// Retrieves JSON representation of a Stored Document.
function getDocument(documentId, options) {
    return generateRequest('GET', `${url}/documents/${documentId}`, options)
}

// Retrieves JSON[] representation of a list of Stored Document.
//TODO: could ask DM team to have a muti doc list in the future move a layer down.
function getDocuments(documentIds = [], options) {
    const promiseArray = []
    documentIds.forEach(documentId => {
        promiseArray.push(getDocument(documentId, options))
    })
    return Promise.all(promiseArray)
}

// Returns a specific version of the content of a Stored Document.
function getDocumentVersion(documentId, options) {
    return generateRequest('GET', `${url}/documents/${documentId}/versions/${versionId}`, options)
}

////////////////////////////////////////////////////
// Document Binary
////////////////////////////////////////////////////

// Streams contents of the most recent Document Content Version associated with the Stored Document.
function getDocumentBinary(documentId, options) {
    return generateRequest('GET', `${url}/documents/${documentId}/binary`, options)
}

// Streams a specific version of the content of a Stored Document.
function getDocumentVersionBinary(documentId, options) {
    return generateRequest('GET', `${url}/documents/${documentId}/versions/${versionId}/binary`, options)
}

////////////////////////////////////////////////////
// Document Thumbnail
////////////////////////////////////////////////////

// Streams contents of the most recent Document Content Version associated with the Stored Document.
function getDocumentThumbnail(documentId, options) {
    return generateRequest('GET', `${url}/documents/${documentId}/thumbnail`, options)
}

//     GET /documents/{documentId}/versions/{versionId}/thumbnail
function getDocumentVersionThumbnail(documentId, versionId, options) {
    return generateRequest('GET', `${url}/documents/${documentId}/versions/${versionId}/thumbnail`, options)
}

////////////////////////////////////////////////////
// Document Creation
////////////////////////////////////////////////////

// Creates a list of Stored Documents by uploading a list of binary/text files.
function postDocument(file, options) {

    options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    options.body = {classification: 'PUBLIC'}
    options.formData = {
        file: {
            value: 'hello',
            options: {
                filename: 'test.txt',
                contentType: 'plain/txt'
            }
        }
    }

    return generateRequest('POST', `${url}/documents`, options)
}

/**
 * Upload File
 *
 * Send through the form data, including any files to the DM Store.
 *
 * @param options
 * @param file
 */
function uploadFile(options, file) {
    options.formData = {
        files: [
            {
                value: fs.createReadStream(file.path),
                options: {filename: file.name, contentType: file.type}
            }
        ],
        classification: 'PUBLIC'
    }

    //TODO: go back to using generateForm
    generateFormRequest('POST', `${url}/documents`, options).then(response => {
        console.log('Response')
        console.log(response)
        return response
    })
        .catch((error) => {

            console.log('Error');
            console.log(error);
            return error
        });
}

// Adds a Document Content Version and associates it with a given Stored Document.
function postDocumentVersion(documentId, file, options) {
    return generateRequest('POST', `${url}/documents/${documentId}`, options)
}

// Adds a Document Content Version and associates it with a given Stored Document.
function postDocumentVersionVersion(documentId, file, options) {
    return generateRequest('POST', `${url}/documents/${documentId}/versions`, options)
}

////////////////////////////////////////////////////
// Document Update
////////////////////////////////////////////////////

// Updates document instance (ex. ttl)
function patchDocument(documentId, updateDocumentCommand, options) {
    return generateRequest('PATCH', `${url}/documents/${documentId}`, {...options, body: updateDocumentCommand})
}

////////////////////////////////////////////////////
// Document Deletion
////////////////////////////////////////////////////

// Deletes a Stored Document.
function deleteDocument(documentId, updateDocumentCommand, options) {
    return generateRequest('DELETE', `${url}/documents/${documentId}`, options)
}

////////////////////////////////////////////////////
// Document Others
////////////////////////////////////////////////////

// Retrieves audits related to a Stored Document.
function getDocumentAuditEntries(documentId, updateDocumentCommand, options) {
    return generateRequest('GET', `${url}/documents/${documentId}/auditEntries`, options)
}

// Search stored documents using metadata.
function filterDocument(options) {
    return generateRequest('POST', `${url}/documents/filter`, options)
}

// Search stored documents by ownership.
function ownedDocument(options) {
    return generateRequest('POST', `${url}/documents/owned`, options)
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
    return {
        headers: {
            Authorization: `Bearer ${req.auth.token}`,
            ServiceAuthorization: req.headers.ServiceAuthorization,
            'user-id': `${req.auth.userId}`,
            'user-roles': req.auth.data
        }
    }
}

/**
 * Routing Logic
 *
 * TODO : We should move this out into a seperate routes file.
 */
module.exports = app => {
    const router = express.Router({mergeParams: true})
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

    router.get('/documents/owned', (req, res, next) => {
        ownedDocument(getOptions(req)).pipe(res)
    })

    router.post('/documents/owned', (req, res, next) => {
        ownedDocument(getOptions(req)).pipe(res)
    })

    /**
     * Retrieves the file from a multipart form.
     *
     * TODO: do you need fs.unlink here?
     */
    router.post('/documents', (req, res, next) => {
        const form = new formidable.IncomingForm()

        form.on('file', (name, file) => {
            uploadFile(getOptions(req), file)
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
