const jp = require('jsonpath');

const dataLookup = (lookup, caseData) => {
    if (typeof lookup === "string") {
        const splitLookup = lookup.split('|');
        lookup = splitLookup[0];
        const processor = splitLookup.length > 1 ? splitLookup[1] : null;
        let value = lookup;
        if (value.startsWith('$')) {
            value = jp.query(caseData, value)[0];
        }

        if (processor && processor === 'document_processor') {
            value = documentProcessor(value, caseData);
        }

        return value;
    } else if (Array.isArray(lookup)) {
        return lookup.map(part => {
            return dataLookup(part, caseData);
        }).join(' ');
    }
    throw new Error('lookup is neither a string or an array.')
};

const documentProcessor = (documents, caseData) => {
    documents = documents
        .filter(doc => doc.value && doc.value.documentLink)
        .map(doc => {
            const splitURL = doc.value.documentLink.document_url.split('/');
            const id = splitURL[splitURL.length-1];
            doc.id = id;
            return doc;
        });


    caseData.documents = caseData.documents || [];
    caseData.documents = caseData.documents.concat(documents);

    return documents;
};

module.exports = dataLookup;