const proxyquire = require('proxyquire');
const supertest = require('supertest');
const express = require('express');
const router = express.Router();
const sscsCaseListTemplate = require('./sscsCaseList.template');

describe('case-list spec', () => {
    const caseData = [];
    let onlineHearingData = {};
    let multipleOnlineHearingData = {};
    let httpRequest;
    let route;
    let app;
    let request;

    beforeEach(() => {
        httpRequest = jasmine.createSpy();
        httpRequest.and.callFake((method, url) => {
            if (url.includes('continuous-online-hearings/?case_id=987654321')) {
                return Promise.resolve(onlineHearingData);
            } else if (url.includes('continuous-online-hearings/?case_id=987654322&case_id=987654323&case_id=987654324')) {
                return Promise.resolve(multipleOnlineHearingData);
            }
            return Promise.resolve(caseData);
        });

        route = proxyquire('./case-list', {
            '../lib/request': httpRequest
        });
        router.get('/', route);
        app = express();
        app.use((req, res, next) => {
            req.auth = {
                token: '1234567',
                userId: '1'
            };
            next();
        });
        app.use('/api/cases', router);

        request = supertest(app);
    });

    describe('when no case data is returned', () => {
        it('should return the columns with no rows', () => {
            return request.get('/api/cases')
                .expect(200)
                .then(response => {
                    expect(response.body.results.length).toBe(0);
                    expect(response.body.columns).toEqual(sscsCaseListTemplate.columns);
                });
        });
    });

    describe('when one row of case data is returned', () => {
        const createdDate = new Date();
        const updatedDate = new Date();

        beforeEach(() => {
            caseData.push({
                id: 987654321,
                case_data: {
                    caseReference: '123-123-123',
                    appeal: {
                        appellant: {
                            name: {
                                firstName: 'Louis',
                                lastName: 'Houghton'
                            }
                        },
                        benefitType: {
                            code: 'PIP'
                        }
                    }
                },
                created_date: createdDate,
                last_modified: updatedDate

            });
            onlineHearingData = {
                online_hearings: [
                    {
                        online_hearing_id: '1',
                        case_id: 987654321,
                        start_date: '2018-07-17T12:56:49.145+0000',
                        current_state: {
                            state_name: 'continuous_online_hearing_started',
                            state_datetime: '2018-07-17T12:56:49Z'
                        }
                    }]
            };
        });

        it('should return the columns with one rows', () => {
            return request.get('/api/cases')
                .expect(200)
                .then(response => {
                    expect(response.body.results.length).toBe(1);
                    expect(response.body.columns).toEqual(sscsCaseListTemplate.columns);
                    expect(response.body.results[0]).toEqual({
                        case_id: caseData[0].id,
                        case_reference: caseData[0].case_data.caseReference,
                        case_fields: {
                            parties: 'Louis Houghton v DWP',
                            type: 'PIP',
                            status: 'Continuous online hearing started',
                            caseStartDate: createdDate.toISOString(),
                            dateOfLastAction: updatedDate.toISOString()
                        }
                    });
                });
        });
    });


    describe('when 2 cases exist, one with valid and other with missing case reference', () => {
        const createdDate = new Date();
        const updatedDate = new Date();

        beforeEach(() => {
            caseData.length = 0;
            caseData.push({
                id: 987654321,
                case_data: {
                    caseReference: '123-123-123',
                    appeal: {
                        appellant: {
                            name: {
                                firstName: 'Louis',
                                lastName: 'Houghton'
                            }
                        },
                        benefitType: {
                            code: 'PIP'
                        }
                    }
                },
                created_date: createdDate,
                last_modified: updatedDate

            });
            caseData.push({
                id: 987654322,
                case_data: {
                    appeal: {
                        appellant: {
                            name: {
                                firstName: 'James',
                                lastName: 'Bond'
                            }
                        },
                        benefitType: {
                            code: 'PIP'
                        }
                    }
                },
                created_date: createdDate,
                last_modified: updatedDate

            });
            onlineHearingData = {
                online_hearings: [
                    {
                        online_hearing_id: '1',
                        case_id: 987654321,
                        start_date: '2018-07-17T12:56:49.145+0000',
                        current_state: {
                            state_name: 'continuous_online_hearing_started',
                            state_datetime: '2018-07-17T12:56:49Z'
                        }
                    },
                    {
                        online_hearing_id: '2',
                        case_id: 987654322,
                        start_date: '2018-07-17T12:56:49.145+0000',
                        current_state: {
                            state_name: 'continuous_online_hearing_started',
                            state_datetime: '2018-07-17T12:56:49Z'
                        }
                    }
                    ]
            };
        });

        it('should filter cases to show only valid case reference', () => {
            return request.get('/api/cases')
                .expect(200)
                .then(response => {
                    expect(response.body.results.length).toBe(1);
                    expect(response.body.columns).toEqual(sscsCaseListTemplate.columns);
                    expect(response.body.results[0]).toEqual({
                        case_id: caseData[0].id,
                        case_reference: caseData[0].case_data.caseReference,
                        case_fields: {
                            parties: 'Louis Houghton v DWP',
                            type: 'PIP',
                            status: 'Continuous online hearing started',
                            caseStartDate: createdDate.toISOString(),
                            dateOfLastAction: updatedDate.toISOString()
                        }
                    });
                });
        });
    });


    describe('when multiple row of case data is returned order by ascending order of last updated date', () => {
        const createdDate1 = new Date(2018,6,25);
        const updatedDate1 = new Date(2018,6,30,10,10);

        const createdDate2 = new Date(2018,6,25);
        const updatedDate2 = new Date(2018,6,29, 12, 10);

        const createdDate3 = new Date(2018,6,25);
        const updatedDate3 = new Date(2018,6,30, 9, 10);

        beforeEach(() => {
            caseData.length = 0;
            caseData.push({
                id: 987654322,
                case_data: {
                    caseReference: '123-123-123',
                    appeal: {
                        appellant: {
                            name: {
                                firstName: 'Louis',
                                lastName: 'Houghton'
                            }
                        },
                        benefitType: {
                            code: 'PIP'
                        }
                    }
                },
                created_date: createdDate1,
                last_modified: updatedDate1

            });
            caseData.push({
                id: 987654323,
                case_data: {
                    caseReference: '123-123-124',
                    appeal: {
                        appellant: {
                            name: {
                                firstName: 'Padmaja',
                                lastName: 'Ramisetti'
                            }
                        },
                        benefitType: {
                            code: 'PIP'
                        }
                    }
                },
                created_date: createdDate2,
                last_modified: updatedDate2

            });

            caseData.push({
                id: 987654324,
                case_data: {
                    caseReference: '123-123-125',
                    appeal: {
                        appellant: {
                            name: {
                                firstName: 'Roopa',
                                lastName: 'Ramisetty'
                            }
                        },
                        benefitType: {
                            code: 'PIP'
                        }
                    }
                },
                created_date: createdDate3,
                last_modified: updatedDate3

            });
        });
        multipleOnlineHearingData = {
            online_hearings: [
                {
                    online_hearing_id: '2',
                    case_id: 987654322,
                    start_date: '2018-07-17T12:56:49.145+0000',
                    current_state: {
                        state_name: 'continuous_online_hearing_started',
                        state_datetime: '2018-06-30T10:10:49Z'
                    }
                },
                {
                    online_hearing_id: '3',
                    case_id: 987654323,
                    start_date: '2018-07-18T12:56:49.145+0000',
                    current_state: {
                        state_name: 'continuous_online_hearing_started',
                        state_datetime: '2018-06-29T12:10:49Z'
                    }
                },
                {
                    online_hearing_id: '4',
                    case_id: 987654324,
                    start_date: '2018-07-189T12:56:49.145+0000',
                }]
        };

        it('should return the columns with multiple rows order by ascending order of last updated date', () => {
            return request.get('/api/cases')
                .expect(200)
                .then(response => {
                    expect(response.body.results.length).toBe(3);
                    expect(response.body.columns).toEqual(sscsCaseListTemplate.columns);
                    expect(response.body.results[2]).toEqual({
                        case_id: caseData[0].id,
                        case_reference: caseData[0].case_data.caseReference,
                        case_fields: {
                            parties: 'Louis Houghton v DWP',
                            type: 'PIP',
                            status: 'Continuous online hearing started',
                            caseStartDate: createdDate1.toISOString(),
                            dateOfLastAction: updatedDate1.toISOString()
                        }
                    });
                    expect(response.body.results[1]).toEqual({
                        case_id: caseData[2].id,
                        case_reference: caseData[2].case_data.caseReference,
                        case_fields: {
                            parties: 'Roopa Ramisetty v DWP',
                            type: 'PIP',
                            caseStartDate: createdDate3.toISOString(),
                            dateOfLastAction: updatedDate3.toISOString()
                        }
                    });
                    expect(response.body.results[0]).toEqual({
                        case_id: caseData[1].id,
                        case_reference: caseData[1].case_data.caseReference,
                        case_fields: {
                            parties: 'Padmaja Ramisetti v DWP',
                            type: 'PIP',
                            status: 'Continuous online hearing started',
                            caseStartDate: createdDate2.toISOString(),
                            dateOfLastAction: updatedDate2.toISOString()
                        }
                    });
                });
        });
    });
});
