const proxyquire = require('proxyquire').noPreserveCache()
const supertest = require('supertest')
const express = require('express')
const moment = require('moment')

const utcDate4 = moment.utc('2018-08-06T16:14:11Z')
const utcDate3 = moment.utc('2018-08-06T16:16:11Z')
const utcDate2 = moment.utc('2018-08-22T11:54:48Z')
const utcDate1 = moment.utc('2018-08-22T11:56:31Z')

describe('Events route', () => {
    let route
    let request
    let app
    let httpRequest
    let httpResponse
    let cohHearingIdResponse
    let cohEventsResponse

    beforeEach(() => {
        cohHearingIdResponse = {
            online_hearings: [
                {
                    online_hearing_id: '5ea1ac54-406c-4e7e-bebe-76723672127c',
                    case_id: '1534513630400666',
                    start_date: utcDate1,
                    panel: [{ name: '123141' }]
                }
            ]
        }

        httpResponse = (resolve, reject) => {
            resolve([
                {
                    event_name: 'event_name',
                    user_first_name: 'user_first_name',
                    user_last_name: 'user_last_name',
                    created_date: utcDate1
                }
            ])
        }
        cohEventsResponse = {
            online_hearing: {
                online_hearing_id: '5ea1ac54-406c-4e7e-bebe-76723672127c',
                case_id: '1534513630400666',
                start_date: utcDate1,
                panel: [{ name: '123141' }],
                current_state: {
                    state_name: 'continuous_online_hearing_decision_issued',
                    state_desc: 'Continuous Online Hearing Decision Issued',
                    state_datetime: utcDate4
                },
                history: [
                    {
                        state_name: 'continuous_online_hearing_started',
                        state_desc: 'Continuous Online Hearing Started',
                        state_datetime: utcDate3
                    },
                    {
                        state_name: 'continuous_online_hearing_decision_issued',
                        state_desc: 'Continuous Online Hearing Decision Issued',
                        state_datetime: utcDate4
                    }
                ],
                uri: '/continuous-online-hearings/5ea1ac54-406c-4e7e-bebe-76723672127c'
            }

        }
        httpRequest = jasmine.createSpy()
        httpRequest.and.callFake((method, url) => {
            if (url.includes('continuous-online-hearings?case_id=')) {
                return Promise.resolve(cohHearingIdResponse)
            } else if (url.includes('continuous-online-hearings/5ea1ac54-406c-4e7e-bebe-76723672127c/conversations')) {
                return Promise.resolve(cohEventsResponse)
            }
            return Promise.resolve(httpResponse)
        })

        app = express()

        route = proxyquire('./index.js', {
            '../lib/request/request': httpRequest,
            './options': () => {
                {}
            }
        })

        route(app)

        request = supertest(app)
    })

    describe('getEvents', () => {
        let getEvents

        beforeEach(() => {
            getEvents = route.getEvents
        })

        it('should expose getDocuments function', () => {
            expect(getEvents).toBeTruthy()
        })

        xit('should return a promise of all outstanding requests', () => {
            expect(getEvents().then).toBeTruthy()
        })

        xit('should return all documents requested for coh and ccd events', done => {
            httpResponse = [
                {
                    event_name: 'event_name',
                    user_first_name: 'user_first_name',
                    user_last_name: 'user_last_name',
                    created_date: utcDate1
                },
                {
                    event_name: 'event_name2',
                    user_first_name: 'user_first_name2',
                    user_last_name: 'user_last_name2',
                    created_date: utcDate2
                }
            ]

            getEvents('x', '1534513630400666', 'SSCS', 'Benefits').then(events => {
                expect(events).toEqual([
                    {
                        title: 'event_name',
                        by: 'user_first_name user_last_name',
                        dateUtc: utcDate1.utc().format(),
                        date: utcDate1.format('D MMMM YYYY'),
                        time: utcDate1.format('h:mma'),
                        documents: []
                    },
                    {
                        title: 'event_name2',
                        by: 'user_first_name2 user_last_name2',
                        dateUtc: utcDate2.utc().format(),
                        date: utcDate2.format('D MMMM YYYY'),
                        time: utcDate2.format('h:mma'),
                        documents: []
                    },
                    {
                        title: 'Continuous Online Hearing Started',
                        by: 'coh',
                        dateUtc: utcDate3.utc().format(),
                        date: utcDate3.format('D MMMM YYYY'),
                        time: utcDate3.format('h:mma'),
                        documents: []
                    },
                    {
                        title: 'Continuous Online Hearing Decision Issued',
                        by: 'coh',

                        dateUtc: utcDate4.utc().format(),
                        date: utcDate4.format('D MMMM YYYY'),
                        time: utcDate4.format('h:mma'),
                        documents: []
                    }
                ])
                done()
            })
        })

        xit('should return all documents requested for coh and ccd events', done => {
            httpResponse = [
                {
                    event_name: 'event_name',
                    user_first_name: 'user_first_name',
                    user_last_name: 'user_last_name',
                    created_date: utcDate1
                },
                {
                    event_name: 'event_name2',
                    user_first_name: 'user_first_name2',
                    user_last_name: 'user_last_name2',
                    created_date: utcDate2
                }
            ]

            getEvents('x', '1534513630400666', 'DIVORCE', 'DIVORCE').then(events => {
                expect(events).toEqual([
                    {
                        title: 'event_name',
                        by: 'user_first_name user_last_name',
                        dateUtc: utcDate1.utc().format(),
                        date: utcDate1.format('D MMMM YYYY'),
                        time: utcDate1.format('h:mma'),
                        documents: []
                    },
                    {
                        title: 'event_name2',
                        by: 'user_first_name2 user_last_name2',
                        dateUtc: utcDate2.utc().format(),
                        date: utcDate2.format('D MMMM YYYY'),
                        time: utcDate2.format('h:mma'),
                        documents: []
                    }
                ])
                done()
            })
        })
    })
})
