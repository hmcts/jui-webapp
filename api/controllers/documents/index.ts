import * as express from 'express'
import { getCCDEventToken, postCCDEvent } from '../../services/ccd-store-api/ccd-store'
import { getDocument, getDocumentBinary } from '../../services/DMStore'

const JUI_UPLOAD_DOCUMENT = 'Document Uploaded By Jui'

function getUploadDocumentEventId(jurisdiction, caseType) {
    return 'someEventId'
}

module.exports = app => {
    const route = express.Router({ mergeParams: true })
    app.use('/documents', route)

    route.get('/:document_id', async (req, res, next) => {
        const document = await getDocument(req.params.document_id)
        if (document) {
            res.send(document).status(200)
        } else {
            res.send(`Error getting document ${req.params.document_id}`).status(500)
        }
    })

    route.get('/:document_id/binary', async (req, res, next) => {
        const binary = await getDocumentBinary(req.params.document_id)
        binary.pipe(res)
    })

    route.post('/', (req, res, next) => {
        //  uploadDocument().pipe(res)
    })
}
