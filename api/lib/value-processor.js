const jp = require('jsonpath');

const dataLookup = (lookup, caseData) => {
    if (typeof lookup === "string") {
        if (lookup.startsWith('$')) {
            return jp.query(caseData, lookup)[0];
        }
        return lookup;
    } else if (Array.isArray(lookup)) {
        return lookup.map(part => {
            return dataLookup(part, caseData);
        }).join(' ');
    }
    throw new Error('lookup is neither a string or an array.')
};

module.exports = dataLookup;