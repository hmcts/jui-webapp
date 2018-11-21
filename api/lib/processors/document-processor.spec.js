const documentProcessor = require('./document-processor')

describe('Document Processor', () => {
    let caseData
    let documents

    beforeEach(() => {
        caseData = {}
        documents = [
            { document_url: 'something.com/docStoreId1' },
            { document_url: 'something.com/docStoreId3' }
        ]
    })

    it('should filter out any documents without a documentLink attribute', () => {
        documentProcessor(documents, caseData)
        expect(caseData.documents.length).toEqual(2)
    })

    it('should set the id attribute to that of documnet-store and not of ccd', () => {
        documentProcessor(documents, caseData)
        expect(caseData.documents[0].id).toEqual('docStoreId1')
        expect(caseData.documents[1].id).toEqual('docStoreId3')
    })

    it('should attach all valid case Ids to the case body', () => {
        documentProcessor(documents, caseData)
        expect(caseData.documents).toEqual([
            { id: 'docStoreId1', document_url: 'something.com/docStoreId1' },
            { id: 'docStoreId3', document_url: 'something.com/docStoreId3' }
        ])
    })
})
