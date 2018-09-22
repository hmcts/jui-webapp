const caseStatusMap = require('./case-status-map');

const caseStatusProcessor = (status, caseData) => {

    const jud = caseStatusMap[caseData.jurisdiction.toLowerCase()];
    const map = jud ? jud[caseData.case_type_id.toLowerCase()] : {};
    return (map && map[status]) ? map[status] : status;
};

module.exports = caseStatusProcessor;
