import {DMDocument} from '../../lib/models/documents'

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
 * @see support folder for interface for payload, that has been circulated to service lines to implement.
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
