const { GO_TO, STATE, createCaseState, getDocId } = require('./case-state-util')

/// //////////////////////////////////////////////////////////////////////////////////////
// Default States
/// //////////////////////////////////////////////////////////////////////////////////////

const DEFAULT_CCD_STATE = {
    when(context) {
        // TODO add check for ccd-state
        // add check context.caseData.hearingType === 'online hearing' OR
        // check context.caseData.hearingType === 'cor'
        // either of the above. Need to confirm with CCD.
        return true
    },
    then(context) {
        context.outcome = createCaseState(
            context.caseData.ccdState,
            null,
            GO_TO.SUMMARY_GO_TO
        )
        context.ccdCohStateCheck = true
    }
}

/// //////////////////////////////////////////////////////////////////////////////////////
// SSCS States
/// //////////////////////////////////////////////////////////////////////////////////////

// if we have coh and nothing else has happen
// then
// set state to COH Started
// goto the casefile
const cohState = {
    when(context) {
        const hearingData = context.caseData.hearingData
        const hearingState = (hearingData) ? hearingData.current_state.state_name : undefined
        return context.ccdCohStateCheck && hearingState && hearingState === STATE.COH_STARTED_STATE
    },
    then(context) {
        context.cohStateCheck = true
        const hearingData = context.caseData.hearingData
        context.outcome = createCaseState(
            STATE.COH_STARTED_STATE,
            hearingData.current_state.state_datetime,
            GO_TO.CASE_FILE_GO_TO
        )
    }
}

// if we have coh and has valid questions
// then
// set state to Question state
// goto the questions
const questionState = {
    when(context) {
        const questionRound = context.caseData.latestQuestions
        const currentState = questionRound && questionRound.questions && questionRound.questions[0].state

        return context.cohStateCheck && currentState
    },
    then(context) {
        const questionRound = context.caseData.latestQuestions
        context.outcome = createCaseState(
            questionRound.questions[0].state,
            questionRound.questions[0].state_datetime,
            GO_TO.QUESTIONS_GO_TO
        )
    }
}

// if we have coh and latest questions deadline elapsed
// then
// set state to 'Question Elapsed'
// goto questions
const deadlineElapsed = {
    when(context) {
        const questionRound = context.caseData.latestQuestions
        return context.cohStateCheck && questionRound && questionRound.state === STATE.COH_Q_DEADLINE_ELAPSED_STATE
    },
    then(context) {
        const questionRound = context.caseData.latestQuestions
        context.outcome = createCaseState(
            STATE.COH_Q_DEADLINE_ELAPSED_STATE,
            questionRound.questions[0].state_datetime,
            GO_TO.QUESTIONS_GO_TO
        )
        context.stop = true
    }
}

// if we have coh and latest questions deadline elapsed and has happen more than once
// then
// set state to 'Question Extension Expired'
// goto questions
const deadlineExtensionExpired = {
    when(context) {
        const questionRound = context.caseData.latestQuestions
        const questionDeadlineElapsed = context.cohStateCheck && questionRound && questionRound.state === STATE.COH_Q_DEADLINE_ELAPSED_STATE
        return questionDeadlineElapsed && questionRound.deadline_extension_count > 0
    },
    then(context) {
        const questionRound = context.caseData.latestQuestions
        context.outcome = createCaseState(
            STATE.COH_Q_DEADLINE_EXT_ELAPSED_STATE,
            questionRound.questions[0].state_datetime,
            GO_TO.QUESTIONS_GO_TO
        )
        context.stop = true
    }
}

// if we have coh and Decision has been issued
// then
// set state to COH_DECISION_ISSUED_STATE
// goto summary
const cohDecisionState = {
    when(context) {
        const hearingData = context.caseData.hearingData
        // TODO add check for ccd-state as well
        return hearingData && hearingData.current_state && hearingData.current_state.state_name === STATE.COH_DECISION_ISSUED_STATE
    },
    then(context) {
        const hearingData = context.caseData.hearingData
        context.outcome = createCaseState(
            STATE.COH_DECISION_ISSUED_STATE,
            hearingData.current_state.state_datetime,
            GO_TO.SUMMARY_GO_TO
        )

        context.stop = true
    }
}

// if we have coh and Decision has been issued
// then
// set state to COH_DECISION_ISSUED_STATE
// goto summary
const cohRelistState = {
    when(context) {
        const hearingData = context.caseData.hearingData
        // TODO add check for ccd-state as well
        return hearingData && hearingData.current_state && hearingData.current_state.state_name === STATE.COH_RELISTED_STATE
    },
    then(context) {
        const hearingData = context.caseData.hearingData
        context.outcome = createCaseState(
            STATE.COH_RELISTED_STATE,
            hearingData.current_state.state_datetime,
            GO_TO.SUMMARY_GO_TO
        )

        context.stop = true
    }
}

/// //////////////////////////////////////////////////////////////////////////////////////
// FR States
/// //////////////////////////////////////////////////////////////////////////////////////

// if we have ccd state is refer to judge
// then
// set state to referToJudge (Draft Content Order)
// goto CaseFile and select Content Order
const referredToJudge = {
    when(context) {
        return context.caseData.ccdState === STATE.FR_CCD_REFER_TO_JUDGE_STATE
    },
    then(context) {
        const consentOrder = context.caseData.consentOrder ? getDocId(context.caseData.consentOrder) : undefined
        context.outcome = createCaseState(
            context.caseData.ccdState,
            null,
            GO_TO.CASE_FILE_GO_TO,
            consentOrder
        )
    }
}

/// //////////////////////////////////////////////////////////////////////////////////////
// DIV States
/// //////////////////////////////////////////////////////////////////////////////////////

/// //////////////////////////////////////////////////////////////////////////////////////
// PROBATE States
/// //////////////////////////////////////////////////////////////////////////////////////

/// //////////////////////////////////////////////////////////////////////////////////////
// CMC States
/// //////////////////////////////////////////////////////////////////////////////////////

/// ///////////////////////////////////////////////////////////////////////////////////
/// ///////////////////////////////////////////////////////////////////////////////////
/// ///////////////////////////////////////////////////////////////////////////////////

const conditionProcessor = {
    init: context => {
        return {
            evaluate: when => when(context),
            consequence: then => then(context)
        }
    }
}

const processEngineMap = {
    sscs: {
        benefit: {
            stateConditions: [
                DEFAULT_CCD_STATE,
                cohDecisionState,
                cohRelistState,
                cohState,
                deadlineExtensionExpired,
                deadlineElapsed,
                questionState
            ]
        }
    },
    cmc: {
        moneyclaimcase: {
            stateConditions: [DEFAULT_CCD_STATE]
        }
    },
    probate: {
        grantofrepresentation: {
            stateConditions: [DEFAULT_CCD_STATE]
        }
    },
    divorce: {
        divorce: {
            stateConditions: [DEFAULT_CCD_STATE]
        },
        financialremedymvp2: {
            stateConditions: [
                DEFAULT_CCD_STATE,
                referredToJudge
            ]
        }
    }
}

// given a Jurisdiction
function getProcessEngine(jurisdiction, caseType) {
    const jud = processEngineMap[jurisdiction.toLowerCase()]
    const conditionsList = jud ? jud[caseType.toLowerCase()] : null
    return (conditionsList) || [DEFAULT_CCD_STATE]
}

function processCaseStateEngine(param) {
    const stateConditions = getProcessEngine(param.jurisdiction, param.caseType).stateConditions

    const context = {
        caseData: param,
        stop: false,
        outcome: {}
    }

    const processor = conditionProcessor.init(context)
    stateConditions.forEach(condition => {
        if (!context.stop) {
            const result = processor.evaluate(condition.when)
            if (result) {
                processor.consequence(condition.then)
            }
        }
    })

    return context.outcome
}

function processCaseState(caseData) {

    // Example of caseData Model at this current moment
    // const caseData = {
    //     jurisdiction: "", // CCD Case jurisdiction
    //     case_type_id: "", // CCD Case case type
    //     state: "", // CCD Case state
    //     case_data:{ // CCD Case Data
    //         consentOrder: "", // used in FR only
    //         appeal: {
    //             hearingType: "" // used in SSCS only
    //         }
    //     },
    //     hearing_data: { // COH Hearing Data
    //         // used in COH only
    //     },
    //     question_data: { // COH Question Data
    //         question_round_number // used in COH only
    //     }
    // }

    const jurisdiction = caseData.jurisdiction
    const caseType = caseData.case_type_id
    const ccdState = caseData.state

    // COH Related Cases Only
    const hearingData = caseData.hearing_data ? caseData.hearing_data : undefined
    const questionRoundData = caseData.question_data

    const latestQuestions = (questionRoundData) ? questionRoundData.sort((a, b) => a.question_round_number < b.question_round_number)[0] : undefined

    // FR related only
    const consentOrder = caseData.case_data.consentOrder ? caseData.case_data.consentOrder : undefined
    // SSCS related only
    const hearingType = caseData.case_data.appeal ? caseData.case_data.appeal.hearingType : undefined

    const inputStates = {
        jurisdiction,
        caseType,
        ccdState,
        hearingType,
        hearingData,
        latestQuestions,
        consentOrder
    }

    const caseState = processCaseStateEngine(inputStates)
    caseData.state = caseState
    if (caseState.stateDateTime) {
        if (new Date(caseData.last_modified) < new Date(caseState.stateDateTime)) {
            caseData.last_modified = caseState.stateDateTime
        }
    }

    return caseData
}

module.exports.processCaseState = processCaseState
