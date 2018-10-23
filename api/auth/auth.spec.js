const proxyquire = require('proxyquire');
const supertest = require('supertest');
const express = require('express');
const config = require('../../config');

describe('oAuth callback route', () => {
    const getTokenCodeSpy = jasmine.createSpy();
    getTokenCodeSpy.and.callFake(() => Promise.resolve({ access_token: '__access__' }));

    let route, request, app;
    beforeEach(() => {
        app = express();

        httpRequest = jasmine.createSpy();
        httpRequest.and.callFake((method, url) => {
            return new Promise({});
        });

        route = proxyquire('./index', {
            '../lib/request/request': httpRequest,
            '../services/idam-api/idam-api': {
                getDetails: () => Promise.resolve({ id: '__userid__' }),
                postOauthToken: getTokenCodeSpy
            }
        });

        route(app);

        request = supertest(app);
    });

    it('Should redirect to /', () => request
        .get('/oauth2/callback')
        .expect(302)
        .then(res => {
            expect(res.headers.location).toEqual('/');
        }));

    it('Should convert the idam code toa jwt', () => request
        .get('/oauth2/callback?code=bob')
        .then(res => {
            expect(getTokenCodeSpy).toHaveBeenCalled();
            expect(getTokenCodeSpy.calls.mostRecent().args[0]).toEqual('bob');
        }));

    it('Should set cookies', () => request
        .get('/oauth2/callback')
        .then(res => {
            expect(res.headers['set-cookie'].length).toEqual(2);
            expect(res.headers['set-cookie']).toEqual(
                [
                    `${config.cookies.token}=__access__; Path=/`,
                    `${config.cookies.userId}=__userid__; Path=/`
                ]);
        }));
});