const templates = {
    sscs: { benefit: ['A$.data.sscsDocument[*].value.documentLink|document_processor' ] },
    cmc: { moneyclaimcase: [] },
    probate: { grantofrepresentation: [] },
    divorce: {
        divorce: ['A$.data.D8DocumentsUploaded[*].value.DocumentLink|document_processor'],
        financialremedymvp2: [
            '$.data.frDocument|document_processor',
            '$.data.d81Joint|document_processor',
            '$.data.d81Applicant|document_processor',
            '$.data.d81Respondent|document_processor',
            '$.data.consentOrder|document_processor',
            '$.data.consentOrderText|document_processor',
            '$.data.divorceUploadEvidence1|document_processor'
        ]
    }
}

module.exports = (jurisdiction, caseType) => {
    const jud = templates[jurisdiction.toLowerCase()]
    const template = jud ? jud[caseType.toLowerCase()] : []
    return template || []
}
