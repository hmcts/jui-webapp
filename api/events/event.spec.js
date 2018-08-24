const proxyquire = require('proxyquire').noPreserveCache();
const supertest = require('supertest');
const express = require('express');
const moment = require('moment');

describe('Events route', () => {
    let route, request, app;
    let httpRequest, httpResponse, cohHearingIdResponse, cohEventsResponse;

    beforeEach(() => {
        cohHearingIdResponse = {
                    online_hearings : [
                        {
                            online_hearing_id : '5ea1ac54-406c-4e7e-bebe-76723672127c',
                            case_id : '1534513630400666',
                            start_date : '2018-08-17T15:55:21Z',
                            panel : [
                                {
                                     name: '123141'
                                }
                            ]
                        }
                    ]
        };

        httpResponse = (resolve, reject) => {
            resolve([
                {
                    event_name: 'event_name',
                    user_first_name: 'user_first_name',
                    user_last_name: 'user_last_name',
                    created_date: '2018-08-06T16:14:11.898'
                }
            ]);
        };
        cohEventsResponse = {
                online_hearing : {
                    online_hearing_id : '5ea1ac54-406c-4e7e-bebe-76723672127c',
                    case_id : '1534513630400666',
                    start_date : "2018-08-22T11:54:48Z",
                    panel : [
                        {
                            name : '123141'
                        }
                    ],
                    current_state : {
                        state_name : 'continuous_online_hearing_decision_issued',
                        state_desc : 'Continuous Online Hearing Decision Issued',
                        state_datetime : '2018-08-22T11:54:48Z'
                    },
                    history : [
                        {
                            state_name :  'continuous_online_hearing_started',
                            state_desc: 'Continuous Online Hearing Started',
                            state_datetime : '2018-08-22T11:54:48Z'
                        },
                        {
                            state_name : 'continuous_online_hearing_decision_issued',
                            state_desc: 'Continuous Online Hearing Decision Issued',
                            state_datetime : '2018-08-22T11:56:31Z'
                        }
                    ],
                    uri : '/continuous-online-hearings/5ea1ac54-406c-4e7e-bebe-76723672127c'
                }

        };
        httpRequest = jasmine.createSpy();
        httpRequest.and.callFake((method, url) => {
            console.log(url.toString());
            if (url.includes('continuous-online-hearings?case_id=')) {
                console.log('inside continuous-online-hearings/?case_id=');
                return Promise.resolve(cohHearingIdResponse);
            } else if (url.includes('continuous-online-hearings/5ea1ac54-406c-4e7e-bebe-76723672127c/conversations')) {
                console.log('inside continuous-online-hearings/5ea1ac54-406c-4e7e-bebe-76723672127c/conversations');
                return Promise.resolve(cohEventsResponse);
            }
             return Promise.resolve(httpResponse);
        });

        app = express();

        route = proxyquire('./event.js', {
            '../lib/request': httpRequest,
            './options': () => {
                {}
            }
        });

        route(app);

        request = supertest(app);
    });

    describe('getEvents', () => {
        let getEvents;
        let utcDate = moment.utc('2018-08-06T16:14:11Z');

        beforeEach(() => {
            getEvents = route.getEvents;
        });

        it('should expose getDocuments function', () => {
            expect(getEvents).toBeTruthy();
        });

        it('should return a promise of all outstanding requests', () => {
            expect(getEvents().then).toBeTruthy();
        });

        it('should return all documents requested for coh and ccd events', done => {
            httpResponse =
               [{
                        event_name: 'event_name',
                        user_first_name: 'user_first_name',
                        user_last_name: 'user_last_name',
                        created_date: moment.utc('2018-08-06T16:14:11.898').format()
                    },
                {
                    event_name: 'event_name2',
                    user_first_name: 'user_first_name2',
                    user_last_name: 'user_last_name2',
                    created_date: moment.utc('2018-08-06T16:14:11.898').format()
                }];

            getEvents().then(events => {
                console.log(" then events >> " , events);
                expect(events).toEqual([
                    {
                        title: 'event_name',
                        by: 'user_first_name user_last_name',
                        dateUtc: utcDate.format(),
                        date: '6 Aug 2018',
                        time: utcDate.format('HH:mma'),
                        documents: []
                    },
                    {
                        title: 'event_name2',
                        by: 'user_first_name2 user_last_name2',
                        dateUtc: utcDate.format(),
                        date: '6 Aug 2018',
                        time: utcDate.format('HH:mma'),
                        documents: []
                    },
                    { title: 'Continuous Online Hearing Started',
                        by: 'coh',
                        dateUtc: '2018-08-22T11:54:48Z',
                        date: '22 Aug 2018',
                        time: '11:54am',
                        documents: [] },
                    { title: 'Continuous Online Hearing Decision Issued',
                        by: 'coh',
                        dateUtc: '2018-08-22T11:56:31Z',
                        date: '22 Aug 2018',
                        time: '11:56am',
                        documents: [] }
                ]);
                done();
            });
        });
    });
});
