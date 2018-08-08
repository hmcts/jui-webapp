const divorce = require('./divorce.template.json');
const sscs = require('./sscs.template.json');

const templates = {
    divorce: divorce,
    sscs, sscs
};

module.exports = (jurisdiction, caseType) => {
    return templates[jurisdiction.toLowerCase()];
};
