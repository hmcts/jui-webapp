const proxyquire = require('proxyquire').noPreserveCache();
const supertest = require('supertest');
const express = require('express');
const config = require('../../config');

xdescribe('Documents route', () => {
    let route, request, app;
    let httpRequest, httpResponse;

    beforeEach(() => {
        httpResponse = (resolve, reject) => {
            resolve({});
        };
        httpRequest = jasmine.createSpy();
        httpRequest.and.callFake((url, options) => new Promise(httpResponse));

        app = express();

        route = proxyquire('./document.js', {
            '../lib/request': httpRequest,
            './options': () => {
                {}
            }
        });

        route(app);

        request = supertest(app);
    });

    describe('getDocument', () => {
        let getDocument;

        beforeEach(() => {
            getDocument = route.getDocument;
        });

        it('should expose getDocument function', () => {
            expect(getDocument).toBeTruthy();
        });

        it('should make a request to doc store', () => {
            getDocument('1234', {});
            expect(httpRequest).toHaveBeenCalledWith('GET', `${config.services.dm_store_api}/documents/1234`, {});
        });
    });

    describe('getDocumentBinary', () => {
        let getDocumentBinary;

        beforeEach(() => {
            getDocumentBinary = route.getDocumentBinary;
        });

        it('should expose getDocumentBinary function', () => {
            expect(getDocumentBinary).toBeTruthy();
        });

        it('should make a request to doc store', () => {
            getDocumentBinary('1234', {});
            expect(httpRequest).toHaveBeenCalledWith('GET', `${config.services.dm_store_api}/documents/1234/binary`, {});
        });
    });

    describe('getDocuments', () => {
        let getDocuments;

        beforeEach(() => {
            getDocuments = route.getDocuments;
        });

        it('should expose getDocuments function', () => {
            expect(getDocuments).toBeTruthy();
        });

        it('should return a promise of all outstanding requests', () => {
            expect(getDocuments().then).toBeTruthy();
        });

        it('should return all documents requested', done => {
            const docIds = ['1234', '5678'];
            httpResponse = (resolve, reject) => {
                resolve({ docId: '1234' });
            };

            getDocuments(docIds, {}).then(documents => {
                expect(documents).toEqual([{ docId: '1234' }, { docId: '1234' }]);
                done();
            });
        });
    });
});
