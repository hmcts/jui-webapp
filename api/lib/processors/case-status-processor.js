const caseStatusMap = require('./case-status-map');

const statusLookUp = (jurisdiction, caseType) => {
    const jud = caseStatusMap[jurisdiction.toLowerCase()];
    const template = jud ? jud[caseType.toLowerCase()] : {};
    return (template) ? template : {};
};

const caseStatusProcessor = (status, caseData) => {

    const result = statusLookUp(caseData.jurisdiction, caseData.case_type_id);
    return result && result[status] ? result[status] : status;
};

module.exports = caseStatusProcessor;
