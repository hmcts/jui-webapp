const express = require('express');
const proxyquire = require('proxyquire');
const supertest = require('supertest');
const { getCCDCases } = require('./ccd-store');

xdescribe('ccd-store spec', () => {
    let httpRequest;
    const divorceCaseData = [];
    let app;
    let route;
    let request;
    const sscsCaseData = [];
    const jurisdictions = [
        {
            jur: 'DIVORCE',
            caseType: 'DIVORCE',
            filter: ''
        },
        {
            jur: 'SSCS',
            caseType: 'Benefit',
            filter: '&state=appealCreated&case.appeal.benefitType.code=PIP'
        }
    ];
    app = express();


    beforeEach(() => {
        httpRequest = jasmine.createSpy();
        httpRequest.and.callFake((method, url) => {
            if (url.includes('jurisdictions/DIVORCE')) {
                console.log('divorce', url);
                return Promise.resolve(divorceCaseData);
            } else if (url.includes('jurisdictions/SSCS')) {
                console.log('SSCS', url);
                return Promise.resolve(sscsCaseData);
            }
        });

        app.use((req, res, next) => {
            req.auth = {
                token: '1234567',
                userId: '1'
            };
            req.headers.ServiceAuthorization = 'sdhfkajfa;ksfha;kdj';
            next();
        });

        route = proxyquire('./index', { '../../lib/request': httpRequest });

        route(app);
        request = supertest(app);
    });

 describe("when ccd request and process.env.JUI_ENV is not set", ()=> {
     it('should create CCD request with CCD endpoints', () => {
         let ccdCases = getCCDCases(1, jurisdictions, {
             headers: {
                 'Authorization': `Bearer 1234567`,
                 'ServiceAuthorization': 'sdhfkajfa;ksfha;kdj'
             }
         });
             expect(ccdCases.length).toBe(0);
     })
 })

    afterEach(()=> {
        delete process.env.JUI_ENV;

    });
});
