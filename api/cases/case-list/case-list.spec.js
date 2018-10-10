const express = require('express');
const proxyquire = require('proxyquire');
const supertest = require('supertest');

const sscsCaseListTemplate = require('./templates/sscs/benefit');

xdescribe('case-list spec', () => {
    let sscsCaseData;
    let divorceCaseData;
    let onlineHearingData;
    let multipleOnlineHearingData;
    let httpRequest;
    let route;
    let app;
    let request;
    let casesData;

    beforeEach(() => {
        casesData = [];
        sscsCaseData = [];
        divorceCaseData = [];
        onlineHearingData = {};
        multipleOnlineHearingData = {};
        httpRequest = jasmine.createSpy();
        httpRequest.and.callFake((method, url) => {
            if (url.includes('continuous-online-hearings/?case_id=987654321')) {
                return Promise.resolve(onlineHearingData);
            } else if (url.includes('continuous-online-hearings/?case_id=987654322&case_id=987654323&case_id=987654324')) {
                return Promise.resolve(multipleOnlineHearingData);
            }
        });

        app = express();
        let ccdStoreMock = {
            getCCDCases: () => Promise.resolve(casesData)
        };

        route = proxyquire('./index', {'../../lib/request': httpRequest,
            '../../services/ccd-store-api/ccd-store': {getCCDCases: () => Promise.resolve(casesData)},
        });
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


    describe('when no case data is returned', () => {
        it('should return the columns with no rows', (done) => request.get('/cases')
            .expect(200)
            .then(response => {
                expect(response.body.results.length).toBe(0);
                expect(response.body.columns).toEqual(sscsCaseListTemplate.columns);
                done();
            }));
    });

    describe('when data is returned', () => {
        const createdDate = new Date();
        const updatedDate = new Date();

        beforeEach(() => {
            sscsCaseData.push({
                id: 987654321,
                jurisdiction: 'SSCS',
                case_type_id: 'Benefit',
                case_data: {
                    caseReference: '123-123-123',
                    appeal: {
                        appellant: {
                            name: {
                                firstName: 'Louis',
                                lastName: 'Houghton'
                            }
                        },
                        benefitType: {code: 'PIP'}
                    }
                },
                created_date: createdDate,
                last_modified: updatedDate

            });
            casesData.push(sscsCaseData);
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
                    }
                ]
            };
        });

        it('for a single jurisdiction it should only return 1 row', () => {
            request.get('/cases')
                .expect(200)
                .then(response => {
                    expect(response.body.results.length).toBe(1);
                    expect(response.body.columns).toEqual(sscsCaseListTemplate.columns);
                    expect(response.body.results[0]).toEqual({
                        case_id: sscsCaseData[0].id,
                        case_jurisdiction: sscsCaseData[0].jurisdiction,
                        case_type_id: 'Benefit',
                        case_fields: {
                            case_ref: sscsCaseData[0].case_data.caseReference,
                            parties: 'Louis Houghton v DWP',
                            type: 'PIP',
                            status: 'Continuous online hearing started',
                            createdDate: createdDate.toISOString(),
                            lastModified: updatedDate.toISOString()
                        }
                    });
                });
        });


        it('for multiple jurisdictions it should return 2 rows - 1 for each jur', () => {
            divorceCaseData.push({
                id: 123456789,
                jurisdiction: 'DIVORCE',
                case_type_id: 'DIVORCE',
                case_data: {
                    caseReference: '456-456-456',
                    appeal: {
                        appellant: {
                            name: {
                                firstName: 'Bob',
                                lastName: 'Smith'
                            }
                        }
                    }
                },
                created_date: createdDate,
                last_modified: updatedDate
            });
            casesData.push(divorceCaseData);

            request.get('/cases')
                .expect(200)
                .then(response => {
                    expect(response.body.results.length).toBe(2);
                    expect(response.body.columns).toEqual(sscsCaseListTemplate.columns);
                    expect(response.body.results[1]).toEqual({
                        case_id: divorceCaseData[0].id,
                        case_jurisdiction: 'DIVORCE',
                        case_type_id: 'DIVORCE',
                        case_fields: {
                            case_ref: divorceCaseData[0].id,
                            parties: '  v  ',
                            type: 'Divorce',
                            createdDate: createdDate.toISOString(),
                            lastModified: updatedDate.toISOString()
                        }
                    });

                    expect(response.body.results[0]).toEqual({
                        case_id: sscsCaseData[0].id,
                        case_jurisdiction: 'SSCS',
                        case_type_id: 'Benefit',
                        case_fields: {
                            case_ref: sscsCaseData[0].case_data.caseReference,
                            parties: 'Louis Houghton v DWP',
                            type: 'PIP',
                            status: 'Continuous online hearing started',
                            createdDate: createdDate.toISOString(),
                            lastModified: updatedDate.toISOString()
                        }
                    });
                });
        });

    });

    describe('when 2 cases exist, one with valid and other with missing case reference', () => {
        const createdDate = new Date();
        const updatedDate = new Date();

        beforeEach(() => {
            casesData.length = 0;
            sscsCaseData.length = 0;
            sscsCaseData.push({
                id: 987654321,
                jurisdiction: 'SSCS',
                case_type_id: 'Benefit',
                case_data: {
                    caseReference: '123-123-123',
                    appeal: {
                        appellant: {
                            name: {
                                firstName: 'Louis',
                                lastName: 'Houghton'
                            }
                        },
                        benefitType: {code: 'PIP'}
                    }
                },
                created_date: createdDate,
                last_modified: updatedDate

            });
            sscsCaseData.push({
                id: 987654322,
                jurisdiction: 'SSCS',
                case_type_id: 'Benefit',
                case_data: {
                    appeal: {
                        appellant: {
                            name: {
                                firstName: 'James',
                                lastName: 'Bond'
                            }
                        },
                        benefitType: {code: 'PIP'}
                    }
                },
                created_date: createdDate,
                last_modified: updatedDate

            });
            casesData.push(sscsCaseData);
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

        it('should filter cases to show only valid case reference', () => request.get('/cases')
            .expect(200)
            .then(response => {
                expect(response.body.results.length).toBe(1);
                expect(response.body.columns).toEqual(sscsCaseListTemplate.columns);
                expect(response.body.results[0]).toEqual({
                    case_id: sscsCaseData[0].id,
                    case_jurisdiction: 'SSCS',
                    case_type_id: 'Benefit',
                    case_fields: {
                        case_ref: sscsCaseData[0].case_data.caseReference,
                        parties: 'Louis Houghton v DWP',
                        type: 'PIP',
                        status: 'Continuous online hearing started',
                        createdDate: createdDate.toISOString(),
                        lastModified: updatedDate.toISOString()
                    }
                });
            }));
    });


    describe('when multiple row of case data is returned order by ascending order of last updated date', () => {
        const createdDate1 = new Date(2018, 6, 25);
        const updatedDate1 = new Date(2018, 6, 30, 10, 10);

        const createdDate2 = new Date(2018, 6, 25);
        const updatedDate2 = new Date(2018, 6, 29, 12, 10);

        const createdDate3 = new Date(2018, 6, 25);
        const updatedDate3 = new Date(2018, 6, 30, 9, 10);

        const lastModifiedDate1 = new Date(2018, 7, 24, 10, 30, 1);
        const lastModifiedDate2 = new Date(2018, 7, 25, 10, 30, 1);

        beforeEach(() => {
            casesData.length = 0;
            sscsCaseData.length = 0;
            sscsCaseData.push({
                id: 987654322,
                jurisdiction: 'SSCS',
                case_type_id: 'Benefit',
                case_data: {
                    caseReference: '123-123-123',
                    appeal: {
                        appellant: {
                            name: {
                                firstName: 'Louis',
                                lastName: 'Houghton'
                            }
                        },
                        benefitType: {code: 'PIP'}
                    }
                },
                created_date: createdDate1,
                last_modified: updatedDate1

            });
            sscsCaseData.push({
                id: 987654323,
                jurisdiction: 'SSCS',
                case_type_id: 'Benefit',
                case_data: {
                    caseReference: '123-123-124',
                    appeal: {
                        appellant: {
                            name: {
                                firstName: 'Padmaja',
                                lastName: 'Ramisetti'
                            }
                        },
                        benefitType: {code: 'PIP'}
                    }
                },
                created_date: createdDate2,
                last_modified: updatedDate2

            });

            sscsCaseData.push({
                id: 987654324,
                jurisdiction: 'SSCS',
                case_type_id: 'Benefit',
                case_data: {
                    caseReference: '123-123-125',
                    appeal: {
                        appellant: {
                            name: {
                                firstName: 'Roopa',
                                lastName: 'Ramisetty'
                            }
                        },
                        benefitType: {code: 'PIP'}
                    }
                },
                created_date: createdDate3,
                last_modified: updatedDate3

            });
            casesData.push(sscsCaseData);
            multipleOnlineHearingData = {
                online_hearings: [
                    {
                        online_hearing_id: '2',
                        case_id: 987654322,
                        start_date: '2018-06-30T12:56:49.145+0000',
                        current_state: {
                            state_name: 'continuous_online_hearing_started',
                            state_datetime: lastModifiedDate1
                        }
                    },
                    {
                        online_hearing_id: '3',
                        case_id: 987654323,
                        start_date: '2018-06-29T12:56:49Z',
                        current_state: {
                            state_name: 'question_drafted',
                            state_datetime: lastModifiedDate2
                        }
                    },
                    {
                        online_hearing_id: '4',
                        case_id: 987654324,
                        start_date: '2018-07-189T12:56:49.145+0000'
                    }
                ]
            };
        });


        it('should return the columns with multiple rows order by ascending order of last updated date', () => request.get('/cases')
            .expect(200)
            .then(response => {
                expect(response.body.results.length).toBe(3);
                expect(response.body.columns).toEqual(sscsCaseListTemplate.columns);
                expect(response.body.results[0]).toEqual({
                    case_id: sscsCaseData[2].id,
                    case_jurisdiction: 'SSCS',
                    case_type_id: 'Benefit',
                    case_fields: {
                        case_ref: sscsCaseData[2].case_data.caseReference,
                        parties: 'Roopa Ramisetty v DWP',
                        type: 'PIP',
                        createdDate: createdDate3.toISOString(),
                        lastModified: updatedDate3.toISOString()
                    }
                });
            }));

        it('should return only cases having case number and order by ascending order of last updated date', () => {
            sscsCaseData.push({
                id: 987654326,
                jurisdiction: 'SSCS',
                case_type_id: 'Benefit',
                case_data: {
                    caseReference: '',
                    appeal: {
                        appellant: {
                            name: {
                                firstName: 'Harry',
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

            sscsCaseData.push({
                id: 987654327,
                jurisdiction: 'SSCS',
                case_type_id: 'Benefit',
                case_data: {
                    caseReference: null,
                    appeal: {
                        appellant: {
                            name: {
                                firstName: 'Prince',
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
            return request.get('/cases')
                .expect(200)
                .then(response => {
                    expect(response.body.results.length).toBe(3);
                    expect(response.body.columns).toEqual(sscsCaseListTemplate.columns);
                    expect(response.body.results[0]).toEqual({
                        case_id: sscsCaseData[2].id,
                        case_jurisdiction: 'SSCS',
                        case_type_id: 'Benefit',
                        case_fields: {
                            case_ref: sscsCaseData[2].case_data.caseReference,
                            parties: 'Roopa Ramisetty v DWP',
                            type: 'PIP',
                            createdDate: createdDate3.toISOString(),
                            lastModified: updatedDate3.toISOString()
                        }
                    });
                    expect(response.body.results[1]).toEqual({
                        case_id: sscsCaseData[0].id,
                        case_jurisdiction: 'SSCS',
                        case_type_id: 'Benefit',
                        case_fields: {
                            case_ref: sscsCaseData[0].case_data.caseReference,
                            parties: 'Louis Houghton v DWP',
                            type: 'PIP',
                            status: 'Continuous online hearing started',
                            createdDate: createdDate1.toISOString(),
                            lastModified: lastModifiedDate1.toISOString()
                        }
                    });
                    expect(response.body.results[2]).toEqual({
                        case_id: sscsCaseData[1].id,
                        case_jurisdiction: 'SSCS',
                        case_type_id: 'Benefit',
                        case_fields: {
                            case_ref: sscsCaseData[1].case_data.caseReference,
                            parties: 'Padmaja Ramisetti v DWP',
                            type: 'PIP',
                            status: 'Question drafted',
                            createdDate: createdDate2.toISOString(),
                            lastModified: lastModifiedDate2.toISOString()
                        }
                    });
                });
        });
    });
});
