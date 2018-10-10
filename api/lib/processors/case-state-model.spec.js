const processCaseStateEngine = require('./case-state-model');
const { COH_STATE, Q_DEADLINE_ELAPSED_STATE, Q_DEADLINE_EXT_ELAPSED_STATE, DECISION_ISSUED_STATE, RELISTED_STATE } = require('./case-state-util');

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
        expect(caseState.actionGoTo).toEqual('');
    });

    describe('COH states', () => {
        const stateDateTime = new Date();
        let caseState = {};

        beforeEach(() => {
            fact.hearingData = {
                current_state: {
                    state_name: COH_STATE,
                    state_datetime: stateDateTime
                }
            };
        });

        afterEach(() => {
            expect(caseState.stateDateTime).toEqual(stateDateTime);
        });

        it('should return coh-state', () => {
            caseState = processCaseStateEngine(fact);

            expect(caseState.stateName).toEqual(COH_STATE);
        });

        it('should return decision-issued-state', () => {
            fact.hearingData.current_state.state_name = DECISION_ISSUED_STATE;

            caseState = processCaseStateEngine(fact);
            expect(caseState.stateName).toEqual(DECISION_ISSUED_STATE);
        });

        it('should return relisted-state', () => {
            fact.hearingData.current_state.state_name = RELISTED_STATE;

            caseState = processCaseStateEngine(fact);
            expect(caseState.stateName).toEqual(RELISTED_STATE);
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
                expect(caseState.actionGoTo).toEqual('questions');
            });

            it('should return a question-state', () => {
                caseState = processCaseStateEngine(fact);
                expect(caseState.stateName).toEqual('question_issued');
            });

            it('should return a deadline-elapsed-state', () => {
                fact.questionRoundData.questions[0].state = Q_DEADLINE_ELAPSED_STATE;

                caseState = processCaseStateEngine(fact);
                expect(caseState.stateName).toEqual(Q_DEADLINE_ELAPSED_STATE);
            });

            it('should return a deadline-extension-elapsed-state', () => {
                fact.questionRoundData.state = Q_DEADLINE_ELAPSED_STATE;
                fact.questionRoundData.deadline_extension_count = 1;

                caseState = processCaseStateEngine(fact);
                expect(caseState.stateName).toEqual(Q_DEADLINE_EXT_ELAPSED_STATE);
            });
        });

    });
});
