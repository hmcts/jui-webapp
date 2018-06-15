const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const supertest = require('supertest');
const express = require('express');
const config = require('../../config');
const sinon = require('sinon');

describe('oAuth callback route', () => {

    let getTokenCodeSpy = sinon.stub();
    getTokenCodeSpy.returns(Promise.resolve({
        access_token: '__access__'
    }));

    let route, request, app;
    beforeEach(() => {
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
                expect(res.headers.location).to.equal('/');
            });
    });

    it('Should convert the idam code toa jwt', () => {
        return request
            .get('/oauth2/callback?code=bob')
            .then((res) => {
                expect(getTokenCodeSpy.called).to.equal(true);
                expect(getTokenCodeSpy.calledWith('bob')).to.equal(true);
            });
    });

    it('Should set cookies', () => {
        return request
            .get('/oauth2/callback')
            .then((res) => {
                expect(res.headers['set-cookie'].length).to.equal(2);
                expect(res.headers['set-cookie']).to.deep.equal(
                    [`${config.cookies.token}=__access__; Path=/`,
                        `${config.cookies.userId}=__userid__; Path=/`
                    ]);
            });
    });
});