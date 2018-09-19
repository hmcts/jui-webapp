const proxyquire = require('proxyquire').noPreserveCache();

const questionAnswered = {
    current_question_round: 0,
    question_rounds: [
        {
            deadline_extension_count: 0,
            question_references: [
                {
                    current_question_state: {
                        state_datetime: '2018-09-11T14:04:17Z',
                        state_desc: 'string',
                        state_name: 'question_answered'
                    },
                    deadline_extension_count: 0
                },
                {
                    current_question_state: {
                        state_datetime: '2018-09-12T14:04:17Z',
                        state_desc: 'string',
                        state_name: 'question_answered'
                    },
                    deadline_extension_count: 0
                }
            ],
            question_round_number: '0',
            question_round_state: {
                state_name: 'question_answered'
            }
        }
    ]
};

const deadlineExtensionExpired = {
    current_question_round: 0,
    question_rounds: [
        {
            deadline_extension_count: 1,
            question_references: [
                {
                    current_question_state: {
                        state_datetime: '2018-09-11T14:04:17Z',
                        state_desc: 'string',
                        state_name: 'question_deadline_elapsed'
                    },
                    deadline_extension_count: 1
                },
                {
                    current_question_state: {
                        state_datetime: '2018-09-12T14:04:17Z',
                        state_desc: 'string',
                        state_name: 'question_answered'
                    },
                    deadline_extension_count: 0
                }
            ],
            question_round_number: '0',
            question_round_state: {
                state_name: 'question_deadline_elapsed'
            }
        }
    ]
};

describe('case-question-state', () => {
    let route = {};
    let onlineHearing = {};

    beforeEach(() => {
        onlineHearing = {
            online_hearing_id: '1',
            case_id: 987654321,
            start_date: '2018-07-17T12:56:49.145+0000',
            current_state: {
                state_name: 'continuous_online_hearing_started',
                state_datetime: '2018-07-17T12:56:49Z'
            }
        };
    });

    describe('no question rounds exist', () => {
        let getCaseState;

        beforeEach(() => {
            route = proxyquire('./case-state', {
                '../questions': { getRounds: () => Promise.resolve() }
            });

            getCaseState = route.getCaseState;
        });

        it('should return case hearing status', () => {
            getCaseState(onlineHearing, {}).then(val => {
                expect(val).toEqual(onlineHearing.current_state);
            });
        });
    });

    describe('question rounds exist with question answered', () => {
        let getCaseState;

        beforeEach(() => {
            route = proxyquire('./case-state', {
                '../questions': { getRounds: () => Promise.resolve(questionAnswered) }
            });

            getCaseState = route.getCaseState;
        });

        it('should return question_answered state', () => {
            getCaseState(onlineHearing, {}).then(val => {
                expect(val).toEqual({
                    state_datetime: '2018-09-12T14:04:17Z',
                    state_name: 'question_answered'
                });
            });
        });
    });

    describe('question rounds exist with expired deadline extension', () => {
        let getCaseState;

        beforeEach(() => {
            route = proxyquire('./case-state', {
                '../questions': { getRounds: () => Promise.resolve(deadlineExtensionExpired) }
            });

            getCaseState = route.getCaseState;
        });

        it('it should return deadline-extension-elapsed state', () => {
            getCaseState(onlineHearing, {}).then(val => {
                expect(val).toEqual({
                    state_datetime: '2018-09-12T14:04:17Z',
                    state_name: 'question_deadline_extension_elapsed'
                });
            });
        });
    });
});
