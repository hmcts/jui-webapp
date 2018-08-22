const proxyquire = require('proxyquire').noPreserveCache();
const supertest = require('supertest');
const express = require('express');
const moment = require('moment');

describe('Events route', () => {
    let route, request, app;
    let httpRequest, httpResponse;

    beforeEach(() => {
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
        httpRequest = jasmine.createSpy();
        httpRequest.and.callFake((url, options) => new Promise(httpResponse));

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

        it('should return all documents requested', done => {
            httpResponse = (resolve, reject) => {
                resolve([
                    {
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
                    }
                ]);
            };

            getEvents().then(events => {
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
                    }
                ]);
                done();
            });
        });
    });
});
