const documentProcessor = (documents, caseData) => {
    if (!Array.isArray(documents)) {
        documents = [documents];
    }
    documents = documents
        .filter(doc => doc.value && doc.value.documentLink)
        .map(doc => {
            const splitURL = doc.value.documentLink.document_url.split('/');
            const id = splitURL[splitURL.length - 1];
            doc.id = id;
            return doc;
        });


    caseData.documents = caseData.documents || [];
    caseData.documents = caseData.documents.concat(documents);

    return documents;
};

module.exports = documentProcessor;