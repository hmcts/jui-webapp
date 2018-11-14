const express = require('express')
const fs = require('fs');
const multiparty = require('multiparty')
const requestPromise = require('request-promise')

const config = require('../../../config')
const generateRequest = require('../../lib/request/request')

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
/**
 * Post Document
 *
 * The document .pdf, or .jpg file should come into here, and we should be able to proxy that file,
 * onto the the DM Store.
 *
 * @param file
 * @param options
 * @return {*}
 */
function postDocument(file, options) {
    console.log('Post Document')
    console.log(file)
    console.log(options)

    options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    options.body = {classification: 'PUBLIC'}
    options.formData = {
        file: {
            value: 'hello', // this should be the stream
            options: {
                filename: 'test.txt', //file name
                contentType: 'plain/txt' //content type should be image/jpg
            }
        }
    }

    // so you've got multipart in the request.js
    // is this being used already?
    // what does multipart look like?
    // and then let's send it though
    // Content-Type needs to be multipart/form-data

    return generateRequest('POST', `${url}/documents`, options)
}

function postMultipartFormDataDocument(options) {
    console.log('postMultipartFormDataDocument');

    // options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    // options.body = {classification: 'PUBLIC'}
    // options.formData = {
    //     file: {
    //         value: fs.createReadStream(`./circularface.jpg`), // this should be the stream or file.
    //         options: {
    //             filename: 'circularface.jpg', //file name
    //             contentType: 'image/jpg' //content type should be image/jpg
    //         }
    //     }
    // }

    // TODO : First thing is get something returning
    // from the Api

    // so you've got multipart in the request.js
    // is this being used already?
    // what does multipart look like?
    // and then let's send it though
    // Content-Type needs to be multipart/form-data

    // TODO : We need proper error messages back from the Api
    // https://dm-store-aat.service.core-compute-aat.internal/documents

    console.log('url postMultipartFormDataDocument');
    console.log(url);

    // so over here we need to see the error

    return generateRequest('POST', `${url}/documents`, options)

    // generateRequest('POST', `${url}/documents`, options).then(
    //     function (response) {
    //         console.log('Response');
    //         console.log(response);
    //
    //         return response
    //     })
    //     .catch(function (error) {
    //         console.log('Error');
    //         console.log(error);
    //         // Crawling failed...
    //         return error
    //     });

    // return generateRequest('POST', `${url}/documents`, options)
}

function postMultiForm() {

    console.log('Post MultiForm func');

    // So here, if you place in a request
    const options = {
        method: 'GET',
        uri: 'https://dm-store-aat.service.core-compute-aat.internal'
        // formData: {
        //     // Like <input type="text" name="name">
        //     name: 'Circular Face',
        //     // Like <input type="file" name="file">
        //     // file: {
        //     //     value: fs.createReadStream('./circularface.jpg'),
        //     //     options: {
        //     //         filename: 'circularface.jpg',
        //     //         contentType: 'image/jpg'
        //     //     }
        //     // }
        // },
        // headers: {
        //     'content-type': 'multipart/form-data'
        // }
    }

    // so this works for google, but it does not work for dm-store-att, but it does not give us back an error from
    // the backend, this could be security practice as to not reply on hit, which makes sense.
    requestPromise(options)
        .then(function (body) {
            console.log(body)
            // POST succeeded...
        })
        .catch(function (error) {
            console.log(error)
            // POST failed...
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
    return generateRequest('PATCH', `${url}/documents/${documentId}`, { ...options, body: updateDocumentCommand })
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
            // Authorization: `Bearer ${req.auth.token}`,
            ServiceAuthorization: req.headers.ServiceAuthorization,
            'user-id': `${req.auth.userId}`,
            // 'user-roles':
        }
    }
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

    router.get('/documents/owned', (req, res, next) => {
        ownedDocument(getOptions(req)).pipe(res)
    })

    router.post('/documents/owned', (req, res, next) => {
        ownedDocument(getOptions(req)).pipe(res)
    })

    /**
     * Currently we are stepping through the multi-part form and finding the parts, when we find the file
     * we write this file to the local disk currently.
     *
     * Once we have all the chunks for the data, in the Node layer we need to pass this up to
     * the Api.
     *
     * TODO : You could hopefully just use a pipe to pass it straight through to the Api.
     */
    router.post('/documents', (request, response, next) => {

        console.log('/documents route')

        const form = new multiparty.Form()
        const FILES = 'files'

        // form.on('part', (part) => {
        //
        //     if(part.name === FILES) {
        //         // As the files comes in as chunks here, we are writing it to disk, on
        //         // close of the pipe, we say file has been saved.
        //         part.pipe(fs.createWriteStream(`./${part.filename}`))
        //             .on('close', () => {
        //                 response.writeHead(200, {'Content-Type': 'text/html' });
        //                 response.end('File has been saved');
        //         })
        //     }
        // })



        postMultipartFormDataDocument(getOptions(request)).pipe(response)

        // form.parse(request)

        // const files = req.body.files
        // const classification = req.body.classification

        // postDocument(files, getOptions(req)).pipe(res)
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
