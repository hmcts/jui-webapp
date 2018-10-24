const caseStatusMap = require('./case-status-map')

function createState(map, status) {
    return {
        name: (map && map[status.stateName]) ? map[status.stateName] : status.stateName,
        actionGoTo: status.actionGoTo,
        ID: status.ID
    }
}

const caseStatusProcessor = (status, caseData) => {
    if (status) {
        const jud = caseStatusMap[caseData.jurisdiction.toLowerCase()]
        const map = jud ? jud[caseData.case_type_id.toLowerCase()] : {}
        return createState(map, status)
    }

    return status
}

module.exports = caseStatusProcessor
