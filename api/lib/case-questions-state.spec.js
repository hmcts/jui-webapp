const express = require('express');
const proxyquire = require('proxyquire');
const supertest = require('supertest');
const getQuestionRoundState = require('./case-questions-state');

describe('case-question-state', () => {
    let questionRoundsData;
    let httpRequest;
    let route;
    let app;
    let request;
    let onlineHearing;

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

        questionRoundsData = {};
        httpRequest = jasmine.createSpy();
        httpRequest.and.callFake((method, url) => Promise.resolve(questionRoundsData));

        app = express();
        route = proxyquire('../questions', { '../lib/request': httpRequest });

        app.use((req, res, next) => {
            req.auth = {
                token: '1234567',
                userId: '1'
            };
            req.headers.ServiceAuthorization = 'sdhfkajfa;ksfha;kdj';
            next();
        });

        route(app);
        request = supertest(app);
    });

    fdescribe('no question rounds exist', () => {
        it('should return no case status', () => {
            const caseState = getQuestionRoundState(onlineHearing, {});
            expect(caseState).toEqual({});
        });
    });
});
