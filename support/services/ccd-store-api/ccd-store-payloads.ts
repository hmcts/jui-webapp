/**
 * prepareCaseForUpload
 *
 * Generic Upload Payload that will be used across all service lines.
 *
 * TODO: The TBC's we as a team have asked our service lines to implement.
 * [31stJan2019]
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
