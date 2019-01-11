import * as express from 'express'
import { getCCDEventToken, postCCDEvent } from '../../services/ccd-store-api/ccd-store'
const { getDocument, getDocumentBinary, postDocument } = require('../../services/dm-store-api/dm-store-api')

const JUI_UPLOAD_DOCUMENT = 'Document Uploaded By Jui'

function getUploadDocumentEventId(jurisdiction, caseType) {
    return 'someEventId'
}

// In Preperation for Upload document ticket
function uploadDocument(userId = null, jurisdiction = null, caseType = null, caseId = null, file = null, options = null) {
    const eventId = getUploadDocumentEventId(jurisdiction, caseType)

    postDocument(file, 'PUBLIC', options)
        .then(res => {
            getCCDEventToken(userId, jurisdiction, caseType, caseId, eventId)
                .then(eventToken => {
                    return {
                        data: {
                            documentId: {
                                id: res.uuid, // grab the case
                            },
                        },
                        event: {
                            description: JUI_UPLOAD_DOCUMENT,
                            id: eventId,
                            summary: JUI_UPLOAD_DOCUMENT,
                        },
                        event_token: eventToken.token,
                        ignore_warning: true,
                    }
                }
                )
                .then(body => postCCDEvent(userId, jurisdiction, caseType, caseId, { ...options, body }))
        })
}

module.exports = app => {
    const route = express.Router({ mergeParams: true })
    app.use('/documents', route)

    route.get('/:document_id', (req, res, next) => {
        getDocument(req.params.document_id, {}).pipe(res)
    })

    route.get('/:document_id/binary', (req, res, next) => {
        getDocumentBinary(req.params.document_id, {})
            .on('response', response => {
                response.headers['content-disposition'] = `attachment; ${response.headers['content-disposition']}`
            })
            .pipe(res)
    })

    route.post('/', (req, res, next) => {
      //  uploadDocument().pipe(res)
    })
}
