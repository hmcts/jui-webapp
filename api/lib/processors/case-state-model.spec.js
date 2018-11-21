const { processCaseState } = require('./case-state-model')
const { STATE, GO_TO } = require('./case-state-util')

describe('Case State Process Engine', () => {
    let caseData = {}
    let caseState = {}

    beforeEach(() => {
        caseData = {}
        caseState = {}

        caseData = {
            jurisdiction: 'SSCS',
            case_type_id: 'BENEFIT',
            state: 'awaitingPayment',
            case_data: {},
            hearing_data: null
        }
    })

    it('should return ccd-state', () => {
        caseState = processCaseState(caseData).state
        expect(caseState.stateName).toEqual('awaitingPayment')
        expect(caseState.actionGoTo).toEqual(GO_TO.SUMMARY_GO_TO)
    })

    describe('COH states', () => {
        const stateDateTime = new Date()
        caseState = {}

        beforeEach(() => {
            caseData = {
                jurisdiction: 'SSCS',
                case_type_id: 'BENEFIT',
                state: 'awaitingPayment',
                case_data: {},
                hearing_data: {
                    online_hearing_id: 'e65dca07-181d-46e8-8475-90355289512f',
                    case_id: '1541500936481251',
                    start_date: stateDateTime,
                    current_state: {
                        state_name: STATE.COH_STARTED_STATE,
                        state_desc: 'Continuous Online Hearing Started',
                        state_datetime: stateDateTime
                    },
                    history: [
                        {
                            state_name: STATE.COH_STARTED_STATE,
                            state_desc: 'Continuous Online Hearing Started',
                            state_datetime: stateDateTime
                        }
                    ],
                    relisting: {
                        reason: null,
                        state: 'DRAFTED',
                        created: null,
                        updated: null
                    },
                    relisting_history: []

                }
            }
        })

        afterEach(() => {
            expect(caseState.stateDateTime).toEqual(stateDateTime)
        })

        it('should return coh-state', () => {
            caseState = processCaseState(caseData).state

            expect(caseState.stateName).toEqual(STATE.COH_STARTED_STATE)
            expect(caseState.actionGoTo).toEqual(GO_TO.CASE_FILE_GO_TO)
        })

        it('should return decision-issued-state', () => {
            caseData.hearing_data.current_state.state_name = STATE.COH_DECISION_ISSUED_STATE

            caseState = processCaseState(caseData).state
            expect(caseState.stateName).toEqual(STATE.COH_DECISION_ISSUED_STATE)
        })

        it('should return relisted-state', () => {
            caseData.hearing_data.current_state.state_name = STATE.COH_RELISTED_STATE

            caseState = processCaseState(caseData).state
            expect(caseState.stateName).toEqual(STATE.COH_RELISTED_STATE)
        })

        describe('Question states', () => {
            beforeEach(() => {
                caseData = {
                    jurisdiction: 'SSCS',
                    case_type_id: 'BENEFIT',
                    state: 'awaitingPayment',
                    case_data: {},
                    hearing_data: {
                        online_hearing_id: 'e65dca07-181d-46e8-8475-90355289512f',
                        case_id: '1541500936481251',
                        start_date: stateDateTime,
                        current_state: {
                            state_name: STATE.COH_STARTED_STATE,
                            state_desc: 'Continuous Online Hearing Started',
                            state_datetime: stateDateTime
                        },
                        history: [
                            {
                                state_name: STATE.COH_STARTED_STATE,
                                state_desc: 'Continuous Online Hearing Started',
                                state_datetime: stateDateTime
                            }
                        ],
                        relisting: {
                            reason: null,
                            state: 'DRAFTED',
                            created: null,
                            updated: null
                        },
                        relisting_history: []

                    },
                    question_data: [
                        {
                            question_round_number: '1',
                            state: 'question_issued',
                            expires: {
                                dateUtc: '2018-11-19T23:59:59Z',
                                date: '19 Nov 2018',
                                time: '23:59pm'
                            },
                            number_question: 1,
                            number_question_answer: 0,
                            question_deadline_expired: false,
                            deadline_extension_count: 0,
                            questions: [
                                {
                                    id: '808b96a7-74b2-4228-b734-a1e3a445e6d3',
                                    rounds: '1',
                                    header: 'do you like cake?',
                                    body: 'sfhdhfsdhfsd',
                                    owner_reference: '123141',
                                    state_datetime: stateDateTime,
                                    state: 'question_issued'
                                }
                            ]
                        }
                    ]
                }
            })

            afterEach(() => {
                expect(caseState.actionGoTo).toEqual(GO_TO.QUESTIONS_GO_TO)
            })

            it('should return a question-state', () => {
                caseState = processCaseState(caseData).state

                expect(caseState.stateName).toEqual(STATE.COH_Q_QUESTION_ISSUED_STATE)
            })

            it('should return a deadline-elapsed-state', () => {
                caseData.question_data[0].state = STATE.COH_Q_DEADLINE_ELAPSED_STATE

                caseState = processCaseState(caseData).state

                expect(caseState.stateName).toEqual(STATE.COH_Q_DEADLINE_ELAPSED_STATE)
            })

            it('should return a deadline-extension-elapsed-state', () => {
                caseData.question_data[0].state = STATE.COH_Q_DEADLINE_ELAPSED_STATE
                caseData.question_data[0].deadline_extension_count = 1

                caseState = processCaseState(caseData).state

                expect(caseState.stateName).toEqual(STATE.COH_Q_DEADLINE_EXT_ELAPSED_STATE)
            })
        })
    })
})
