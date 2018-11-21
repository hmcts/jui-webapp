module.exports = (documents, caseData) => {
    if (!Array.isArray(documents)) {
        documents = [documents]
    }

    documents = documents
        .map(doc => {
            const splitURL = doc.document_url.split('/')
            doc.id = splitURL[splitURL.length - 1]
            return doc
        })

    caseData.documents = caseData.documents || []
    caseData.documents = caseData.documents.concat(documents)

    return documents
}
