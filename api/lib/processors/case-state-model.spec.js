const processCaseStateEngine = require('./case-state-model');
const { STATE, GO_TO } = require('./case-state-util');

describe('Case State Process Engine', () => {

    let fact = {};
    beforeEach(() => {
        fact = {
            jurisdiction: 'SSCS',
            caseType: 'BENEFIT',
            ccdState: 'awaitingPayment'
        };
    });

    it('should return ccd-state', () => {
        const caseState = processCaseStateEngine(fact);

        expect(caseState.stateName).toEqual('awaitingPayment');
        expect(caseState.actionGoTo).toEqual(GO_TO.SUMMARY_GO_TO);
    });

    describe('COH states', () => {
        const stateDateTime = new Date();
        let caseState = {};

        beforeEach(() => {
            fact.hearingData = {
                current_state: {
                    state_name: STATE.COH_STARTED_STATE,
                    state_datetime: stateDateTime
                }
            };
        });

        afterEach(() => {
            expect(caseState.stateDateTime).toEqual(stateDateTime);
        });

        it('should return coh-state', () => {
            caseState = processCaseStateEngine(fact);

            expect(caseState.stateName).toEqual(STATE.COH_STARTED_STATE);
            expect(caseState.actionGoTo).toEqual(GO_TO.CASE_FILE_GO_TO);
        });

        it('should return decision-issued-state', () => {
            fact.hearingData.current_state.state_name = STATE.COH_DECISION_ISSUED_STATE;

            caseState = processCaseStateEngine(fact);
            expect(caseState.stateName).toEqual(STATE.COH_DECISION_ISSUED_STATE);
        });

        it('should return relisted-state', () => {
            fact.hearingData.current_state.state_name = STATE.COH_RELISTED_STATE;

            caseState = processCaseStateEngine(fact);
            expect(caseState.stateName).toEqual(STATE.COH_RELISTED_STATE);
        });

        describe('Question states', () => {
            beforeEach(() => {
                fact.questionRoundData = {
                    questions: [{
                        state: 'question_issued',
                        state_datetime: stateDateTime
                    }]
                };

            });

            afterEach(() => {
                expect(caseState.actionGoTo).toEqual(GO_TO.QUESTIONS_GO_TO);
            });

            it('should return a question-state', () => {
                caseState = processCaseStateEngine(fact);
                expect(caseState.stateName).toEqual(STATE.COH_Q_QUESTION_ISSUED_STATE);
            });

            it('should return a deadline-elapsed-state', () => {
                fact.questionRoundData.questions[0].state = STATE.COH_Q_DEADLINE_ELAPSED_STATE;

                caseState = processCaseStateEngine(fact);
                expect(caseState.stateName).toEqual(STATE.COH_Q_DEADLINE_ELAPSED_STATE);
            });

            it('should return a deadline-extension-elapsed-state', () => {
                fact.questionRoundData.state = STATE.COH_Q_DEADLINE_ELAPSED_STATE;
                fact.questionRoundData.deadline_extension_count = 1;

                caseState = processCaseStateEngine(fact);
                expect(caseState.stateName).toEqual(STATE.COH_Q_DEADLINE_EXT_ELAPSED_STATE);
            });
        });

    });
});
