const proxyquire = require('proxyquire');
const supertest = require('supertest');
const express = require('express');
const router = express.Router();
const sscsCaseListTemplate = require('./sscsCaseList.template');

describe('case-list spec', () => {
    const caseData = [];

    let httpRequest;
    let route;
    let app;
    let request;

    beforeEach(() => {
        httpRequest = jasmine.createSpy();
        httpRequest.and.callFake(() => Promise.resolve(caseData));

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
                id: '987654321',
                case_data: {
                    caseReference: '123-123-123',
                    appeal: {
                        appellant: {
                            name: {
                                firstName: 'Louis',
                                lastName: 'Houghton'
                            }
                        }
                    }
                },
                created_date: createdDate,
                last_modified: updatedDate,

            });
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
                            parties: 'Louis Houghton vs DWP',
                            type: 'PIP',
                            caseStartDate: createdDate.toISOString(),
                            dateOfLastAction: updatedDate.toISOString()
                        }
                    });
                });
        });
    });

    describe('when multiple row of case data is returned order by ascending order of last updated date', () => {
        const createdDate1 = new Date(2018,6,28);
        const updatedDate1 = new Date(2018,6,29);

        const createdDate2 = new Date(2018,6,28);
        const updatedDate2 = new Date(2018,6,30);

        beforeEach(() => {
            caseData.pop();
            caseData.push({
                id: '987654321',
                case_data: {
                    caseReference: '123-123-123',
                    appeal: {
                        appellant: {
                            name: {
                                firstName: 'Louis',
                                lastName: 'Houghton'
                            }
                        }
                    }
                },
                created_date: createdDate1,
                last_modified: updatedDate1

            });
            caseData.push({
                id: '987654322',
                case_data: {
                    caseReference: '123-123-124',
                    appeal: {
                        appellant: {
                            name: {
                                firstName: 'Padmaja',
                                lastName: 'Ramisetti'
                            }
                        }
                    }
                },
                created_date: createdDate2,
                last_modified: updatedDate2

            });
        });

        it('should return the columns with multiple rows order by ascending order of last updated date', () => {
            return request.get('/api/cases')
                .expect(200)
                .then(response => {
                    expect(response.body.results.length).toBe(2);
                    expect(response.body.columns).toEqual(sscsCaseListTemplate.columns);
                    expect(response.body.results[0]).toEqual({
                        case_id: caseData[0].id,
                        case_reference: caseData[0].case_data.caseReference,
                        case_fields: {
                            parties: 'Louis Houghton vs DWP',
                            type: 'PIP',
                            caseStartDate: createdDate1.toISOString(),
                            dateOfLastAction: updatedDate1.toISOString()
                        }
                    });
                    expect(response.body.results[1]).toEqual({
                        case_id: caseData[1].id,
                        case_reference: caseData[1].case_data.caseReference,
                        case_fields: {
                            parties: 'Padmaja Ramisetti vs DWP',
                            type: 'PIP',
                            caseStartDate: createdDate2.toISOString(),
                            dateOfLastAction: updatedDate2.toISOString()
                        }
                    });
                });
        });
    });
});
