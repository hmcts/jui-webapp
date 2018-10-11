const express = require('express');
const proxyquire = require('proxyquire');
const supertest = require('supertest');
const sscsCaseListTemplate = require('./templates/sscs/benefit');
const { divorceCaseData, sscsCaseData} = require('./case-list-spec-data');

describe('case-list', () => {
    let httpRequest;
    let app;
    let route;
    let casesData;
    let request;

    beforeEach(() => {
        casesData = [];
        httpRequest = jasmine.createSpy();
        httpRequest.and.callFake((method, url) => {
            return new Promise({});
        });

        app = express();

        route = proxyquire('./index', {'../../lib/request': httpRequest,
            '../../services/ccd-store-api/ccd-store': { getMutiJudCCDCases: () => Promise.resolve(casesData) }
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
                console.log('haa haa haa');
                expect(response.body.results.length).toBe(0);
                expect(response.body.columns).toEqual(sscsCaseListTemplate.columns);
                done();
            }));
    });

    describe('case list with cases', () => {
        beforeEach(() => {
            casesData.push(divorceCaseData);
            casesData.push(sscsCaseData);
        });

        it('should have multiple jurisdictions cases', () => {

        });
    });
});
