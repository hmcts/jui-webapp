// const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const supertest = require('supertest');
const express = require('express');
const config = require('../../config');
// const sinon = require('sinon');
const url = require('url');

describe('oAuth callback route', () => {

    let getTokenCodeSpy;


    let route, request, app;
    beforeEach(() => {
        getTokenCodeSpy = jasmine.createSpy();
        getTokenCodeSpy.and.callFake(() => Promise.resolve({
            access_token: '__access__'
        }));

        app = express();

        route = proxyquire('./index.js', {
            './getTokenFromCode': getTokenCodeSpy,
            './getUserDetails': () => {
                return Promise.resolve({
                    id: '__userid__'
                })
            }
        });

        route(app);

        request = supertest(app);
    });

    it('Should redirect to /', () => {
        return request
            .get('/oauth2/callback')
            .expect(302)
            .then((res) => {
                expect(res.headers.location).toEqual('/');
            });
    });

    it('Should convert the idam code to a jwt', () => {
        return request
            .get('/oauth2/callback?code=bob')
            .then((res) => {
                const myURL = url.parse(JSON.parse(JSON.stringify(res)).req.url);
                expect(getTokenCodeSpy).toHaveBeenCalled();
                expect(getTokenCodeSpy).toHaveBeenCalledWith('bob', 'http', myURL.host);
            });
    });

    it('Should set cookies', () => {
        return request
            .get('/oauth2/callback')
            .then((res) => {
                expect(res.headers['set-cookie'].length).toEqual(2);
                expect(res.headers['set-cookie']).toEqual(
                    [`${config.cookies.token}=__access__; Path=/`,
                        `${config.cookies.userId}=__userid__; Path=/`
                    ]);
            });
    });
});
