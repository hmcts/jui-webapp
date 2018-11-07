const sscsBenefit = require('./sscs/benefit')
const cmc = require('./cmc/moneyclaimcase')
const probate = require('./probate/grantofrepresentation')
const divorce = require('./divorce/divorce')
const financialRemedy = require('./divorce/financialremedy')
const defaultTemplate = require('./default/default')

const templates = {
    sscs: {
        benefit: sscsBenefit
    },
    cmc: {
        moneyclaimcase: cmc
    },
    probate: {
        grantofrepresentation: probate
    },
    divorce: {
        divorce,
        financialremedymvp2: financialRemedy
    }
}

module.exports = (jurisdiction, caseType) => {
    const jud = templates[jurisdiction.toLowerCase()]
    const template = jud ? jud[caseType.toLowerCase()] : defaultTemplate
    return (template) || defaultTemplate
}
