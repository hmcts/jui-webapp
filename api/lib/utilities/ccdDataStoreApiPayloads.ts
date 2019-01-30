import {DMDocument} from '../models'

/**
 * prepareCaseForUpload
 *
 * Generic Upload Payload that will be used across all service lines.
 *
 * TODO: The TBC's we as a team have asked our service lines to implement.
 *
 * @param eventToken
 * @param eventId
 * @param dmDocument
 * @param comments
 * @return
 */
export function prepareCaseForUpload(eventToken, eventId, dmDocument: DMDocument, comments) {

    return {
        data: {
            uploadDocuments: [
                {
                    value: {
                        documentName: dmDocument.originalDocumentName,
                        documentType: 'Letter',
                        createdBy: dmDocument.createdBy,
                        createdDate: '2019-01-29',
                        createdTime: '12:32:14+0000',
                        authoredDate: dmDocument.modifiedOn,
                        //TBC
                        documentComment: comments,
                        documentEmailContent: 'juitestuser2@gmail.com',
                        documentLink: {
                            document_url: dmDocument._links.self.href,
                        },
                    },
                },
            ],
        },
        event: {
            id: eventId,
        },
        event_token: eventToken,

        ignore_warning: true,
    }
}

/**
 * prepareCaseForUploadFR
 *
 * This works and returns a Success 200 when hitting jurisdiction: 'DIVORCE', caseType: 'FinancialRemedyMVP2',
 * eventId: 'FR_uploadDocument'.
 *
 * TODO: Bug: If you successfully POST to /caseworkers/{uid}/jurisdictions/{jid}/case-types/{ctid}/cases/{cid}/events,
 * all subsequent events return a 404.
 *
 * TODO: Deprecate this function once all service lines are using the new Upload document feature within their case
 * definitions file, and use the one above.
 *
 * @param eventToken - Token returned from the call to 'Start event creation as Case worker' as per Core Case Data
 * - Data store API docs.
 * @param eventId - 'FR_uploadDocument'
 * @param dmDocument
 * @param comments
 * @return {}
 */
export function prepareCaseForUploadFR(eventToken, eventId, dmDocument: DMDocument, comments) {

    return {
        data: {
            uploadDocuments: [
                {
                    value: {
                        documentComment: comments,
                        documentDateAdded: '2019-01-29',
                        documentEmailContent: 'juitestuser2@gmail.com',
                        documentFileName: dmDocument.originalDocumentName,
                        documentLink: {
                            document_url: dmDocument._links.self.href,
                        },
                        documentType: 'Other',
                    },
                },
            ],
        },
        event: {
            id: eventId,
        },
        event_token: eventToken,

        ignore_warning: true,
    }
}

module.exports.prepareCaseForUploadFR = prepareCaseForUploadFR
