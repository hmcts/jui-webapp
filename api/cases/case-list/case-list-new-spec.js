const express = require('express');
const proxyquire = require('proxyquire');
const supertest = require('supertest');
const sscsCaseListTemplate = require('./templates/sscs/benefit');
const { divorceCaseData, sscsCaseData, onlineHearingData } = require('./case-list-spec-data');

describe('case-list', () => {
    let httpRequest;
    let app;
    let route;
    let casesData;
    let request;
    let hearingData;

    beforeEach(() => {
        casesData = [];
        hearingData = {};
        httpRequest = jasmine.createSpy();
        httpRequest.and.callFake((method, url) => {
            return new Promise({});
        });

        app = express();

        route = proxyquire('./index', {'../../lib/request': httpRequest,
            '../../services/ccd-store-api/ccd-store': { getMutiJudCCDCases: () => Promise.resolve(casesData) },
            '../../services/coh-cor-api/coh-cor-api': { getOnlineHearing: () => Promise.resolve({}) }
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

    describe('empty case list', () => {
        it('should return only template columns', (done) => request.get('/cases')
            .expect(200)
            .then(response => {
                expect(response.body.results.length).toBe(0);
                expect(response.body.columns).toEqual(sscsCaseListTemplate.columns);
                done();
            }));
    });

    fdescribe('case list with cases', () => {
        beforeEach(() => {
            casesData.push(divorceCaseData);
            casesData.push(sscsCaseData);
            hearingData.push(onlineHearingData);
        });

        it('should return multiple jurisdictions cases', (done) =>
            request.get('/cases')
                .expect(200)
                .then(response => {
                    console.log('hee hee hee');
                    expect(response.body.results.length).toBe(3);
                    expect(response.body.columns).toEqual(sscsCaseListTemplate.columns);
                    // expect(response.body.results[1]).toEqual({
                    //     case_id: divorceCaseData[0].id,
                    //     case_jurisdiction: 'DIVORCE',
                    //     case_type_id: 'DIVORCE',
                    //     case_fields: {
                    //         case_ref: divorceCaseData[0].id,
                    //         parties: '  v  ',
                    //         type: 'Divorce',
                    //         createdDate: createdDate.toISOString(),
                    //         lastModified: updatedDate.toISOString()
                    //     }
                    // });
                    //
                    // expect(response.body.results[0]).toEqual({
                    //     case_id: sscsCaseData[0].id,
                    //     case_jurisdiction: 'SSCS',
                    //     case_type_id: 'Benefit',
                    //     case_fields: {
                    //         case_ref: sscsCaseData[0].case_data.caseReference,
                    //         parties: 'Louis Houghton v DWP',
                    //         type: 'PIP',
                    //         status: 'Continuous online hearing started',
                    //         createdDate: createdDate.toISOString(),
                    //         lastModified: updatedDate.toISOString()
                    //     }
                    // });
                    done;
                })
        );
    });
});
