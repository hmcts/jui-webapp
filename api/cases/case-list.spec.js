const proxyquire = require('proxyquire');
const supertest = require('supertest');
const express = require('express');
const router = express.Router();
const config = require('../../config');
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
                        case_fields: {
                            parties: 'Louis Houghton versus DWP',
                            type: 'PIP',
                            caseStartDate: createdDate.toISOString(),
                            dateOfLastAction: updatedDate.toISOString()
                        }
                    });
                });
        });
    });
});
