const sscsBenefit = require('./templates/sscs/status-mapping');
const cmc = require('./templates/cmc/status-mapping');
const probate = require('./templates/probate/status-mapping');
const divorce = require('./templates/divorce/status-mapping');

module.exports = {
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
        divorce: divorce,
        financialremedymvp2: divorce.financialremedy
    }
};
