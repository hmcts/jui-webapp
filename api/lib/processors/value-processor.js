const jp = require('jsonpath')
const documentProcessor = require('./document-processor')
const caseStatusProcessor = require('./case-status-processor')

const dataLookup = (lookup, caseData) => {
    if (typeof lookup === 'string') {
        const splitLookup = lookup.split('|')
        let value = splitLookup[0]
        const processor = splitLookup.length > 1 ? splitLookup[1] : null

        // Run jsonpath if it begins with an A take the full result else just take the 1st value.
        if (value.startsWith('A')) {
            value = value.substring(1)
            value = jp.query(caseData, value)
        } else if (value.startsWith('$')) {
            value = jp.query(caseData, value)[0]
        }

        // Processors
        if (value && processor && processor === 'document_processor') {
            value = documentProcessor(value, caseData)
        }
        if (value && processor && processor === 'newline_processor') {
            if (typeof value === 'string') {
                value = value ? (`${value}\n`) : ''
            } else if (Array.isArray(value)) {
                value = value.filter(v => v).join('\n')
            }
        }
        if (splitLookup.length > 1 && processor === 'if_empty_processor') {
            value = (value) || (splitLookup[2] ? splitLookup[2] : '')
        }

        if (value && processor && processor === 'case_status_processor') {
            value = caseStatusProcessor(value, caseData)
        }

        return value
    } else if (typeof lookup === 'number') {
        return lookup
    } else if (Array.isArray(lookup)) {
        return lookup.map(part => dataLookup(part, caseData)).join('')
    }
    throw new Error('lookup is neither a string or an array.')
}

module.exports = dataLookup
