import * as express from 'express'
import { getDocument, getDocumentBinary } from '../../services/DMStore'

export async function getDocumentRoute(req: express.Request, res: express.Response) {
    const document = await getDocument(req.params.document_id)
    if (document) {
        res.status(200).send(document)
    } else {
        res.status(500).send(`Error getting document ${req.params.document_id}`)
    }
}

export  async function getDocumentBinaryRoute(req: express.Request, res: express.Response) {
    const binary = await getDocumentBinary(req.params.document_id)
    binary.pipe(res)
}

export default app => {
    const route = express.Router({ mergeParams: true })
    app.use('/documents', route)

    route.get('/:document_id', getDocumentRoute)

    route.get('/:document_id/binary', getDocumentBinaryRoute)

}
