const proxyquire = require('proxyquire').noPreserveCache();
const supertest = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');

describe('Questions route', () => {

    let route, request, app;
    let httpRequest, httpResponse;
    let cohResponses;
    beforeEach(() => {

        cohResponses = {
            "GET": {},
            "POST": {},
            "PUT": {},
            "DELETE": {},
        };

        httpRequest = jasmine.createSpy();
        httpRequest.and.callFake((method, url, options) => {
            console.log(`Saw ${method} request to ${url} and returning ${cohResponses[method][url]}`);

            return new Promise(resolve => {
                resolve(cohResponses[method][url])
            });
        });

        app = express();
        app.use(bodyParser.json());

        route = proxyquire('./question.js', {
            '../lib/request': httpRequest
        });
        app.use((req, res, next) => {
            req.auth = {
                token: '1234567',
                userId: '1'
            };
            req.headers.ServiceAuthorization = 'sdhfkajfa;ksfha;kdj'
            next();
        });
        route(app);

        request = supertest(app);
    });

    describe('When I try to get a single question', () => {
        const caseNumber = "123456789";
        const questionId = "987654321";
        const hearingId = "564332";

        beforeEach(() => {
            cohResponses["GET"][`http://coh-cor-aat.service.core-compute-aat.internal/continuous-online-hearings?case_id=${caseNumber}`] = {
                online_hearings: [{
                    online_hearing_id: hearingId
                }]
            };

            cohResponses["GET"][`http://coh-cor-aat.service.core-compute-aat.internal/continuous-online-hearings/${hearingId}/questions/${questionId}`] = {
                question_id: questionId,
                question_header_text: "Header text",
                question_body_text: "Body text",
                owner_reference: "Louis",
                current_question_state: {
                    state_datetime: new Date(Date.UTC(2018, 6, 25, 8, 52, 38)).toDateString()
                }
            };
        });

        describe('When I do not have an answer', () => {

            it('It should return the question', (done) => {
                request.get(`/cases/${caseNumber}/questions/${questionId}`)
                    .expect(200)
                    .then(response => {
                        expect(response.body).toEqual({
                            id: '987654321',
                            header: 'Header text',
                            body: 'Body text',
                            owner_reference: 'Louis',
                            state_datetime: 'Wed Jul 25 2018',
                            answer: null
                        });
                        done();
                    });
            });
        });

        describe('When I have an answer', () => {

            beforeEach(() => {
                cohResponses["GET"][`http://coh-cor-aat.service.core-compute-aat.internal/continuous-online-hearings/${hearingId}/questions/${questionId}/answers`] = [{
                    answer_id: "12345",
                    answer_text: 'This is my answer'
                }];
            });


            it('It should return the question with the answer', (done) => {
                request.get(`/cases/${caseNumber}/questions/${questionId}`)
                    .expect(200)
                    .then(response => {
                        expect(response.body).toEqual({
                            id: '987654321',
                            header: 'Header text',
                            body: 'Body text',
                            owner_reference: 'Louis',
                            state_datetime: 'Wed Jul 25 2018',
                            answer: {
                                answer_id: "12345",
                                answer_text: 'This is my answer'
                            }
                        });
                        done();
                    });
            });
        });
    });

    describe('when I get all questions for a case', () => {
        const caseNumber = "123456789";
        const questionId = "987654321";
        const hearingId = "564332";

        beforeEach(() => {
            cohResponses["GET"][`http://coh-cor-aat.service.core-compute-aat.internal/continuous-online-hearings?case_id=${caseNumber}`] = {
                online_hearings: [{
                    online_hearing_id: hearingId
                }]
            };
        });

        describe('when I have existing questions', () => {
            beforeEach(() => {
                cohResponses["GET"][`http://coh-cor-aat.service.core-compute-aat.internal/continuous-online-hearings/${hearingId}/questions`] = {
                    questions: [{
                        question_id: questionId,
                        question_header_text: "Header text",
                        question_body_text: "Body text",
                        owner_reference: "Louis",
                        current_question_state: {
                            state_datetime: new Date(Date.UTC(2018, 6, 25, 8, 52, 38)).toDateString(),
                            state_name: 'question_drafted'
                        }
                    }]
                };
            });

            it('should return a list of formatted questions', (done) => {
                request.get(`/cases/${caseNumber}/questions`)
                    .expect(200)
                    .then(response => {
                        expect(response.body).toEqual([{
                            id: '987654321',
                            header: 'Header text',
                            body: 'Body text',
                            owner_reference: 'Louis',
                            state_datetime: 'Wed Jul 25 2018',
                            state: 'question_drafted'
                        }]);
                        done();
                    });
            });
        });

        describe('when I have no existing questions', () => {
            beforeEach(() => {
                cohResponses["GET"][`http://coh-cor-aat.service.core-compute-aat.internal/continuous-online-hearings/${hearingId}/questions`] = {
                    questions: []
                };
            });

            it('should return a an empty list', (done) => {
                request.get(`/cases/${caseNumber}/questions`)
                    .expect(200)
                    .then(response => {
                        expect(response.body).toEqual([]);
                        done();
                    });
            });
        });

    });

    describe('when I create a new question', () => {
        const caseNumber = "123456789";
        const questionId = "987654321";
        const hearingId = "564332";

        describe('when I have an existing coh', () => {
            beforeEach(() => {
                cohResponses["GET"][`http://coh-cor-aat.service.core-compute-aat.internal/continuous-online-hearings?case_id=${caseNumber}`] = {
                    online_hearings: [{
                        online_hearing_id: hearingId
                    }]
                };

                cohResponses["POST"][`http://coh-cor-aat.service.core-compute-aat.internal/continuous-online-hearings/${hearingId}/questions`] = {
                    question_id: questionId,
                    question_header_text: "A great question",
                    question_body_text: "A new question",
                    owner_reference: "1",
                    current_question_state: {
                        state_datetime: new Date(Date.UTC(2018, 6, 25, 8, 52, 38)).toDateString(),
                        state_name: 'question_drafted'
                    }
                };
            });

            it('It should make a post request', (done) => {
                request.post(`/cases/${caseNumber}/questions`)
                    .expect(201)
                    .send({
                        subject: 'A great question',
                        question: 'A new question'
                    })
                    .then(response => {
                        expect(httpRequest).toHaveBeenCalledWith('POST',
                            'http://coh-cor-aat.service.core-compute-aat.internal/continuous-online-hearings/564332/questions', {
                            headers: {
                                Authorization: 'Bearer 1234567',
                                ServiceAuthorization: 'sdhfkajfa;ksfha;kdj'
                            },
                            body: {
                                owner_reference: '1',
                                question_body_text: 'A new question',
                                question_header_text: 'A great question',
                                question_ordinal: '1',
                                question_round: '1',
                                question_state: 'question_drafted'
                            }
                        });
                        done();
                    })
                    });
            });
        });
    });
