import * as axios from 'axios'
import * as chai from 'chai'
import {expect} from 'chai'
import 'mocha'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'

chai.use(sinonChai)

import {request} from './request'

describe('request', () => {
    const response = {
        headers:
            {
                'cache-control': 'no-cache',
                connection: 'close',
                date: 'Mon, 28 Jan 2019 14:34:48 GMT',
                p3p: 'CP="NON DSP COR ADMa OUR IND UNI COM NAV INT"',
                server: 'nginx/1.13.12',
                'transfer-encoding': 'chunked',
                'x-dis-request-id': '76e218ca563ead8f3381fdb4ea518bc4',
            },
        request: {
            body: '',
            data: undefined,
            formData: '',

            headers:
                {
                    Accept: 'application/json, text/plain, */*',
                    'User-Agent': 'axios/0.18.0',
                }
            ,
            json: true,
            method: 'get',
            url: 'https://test.com',
        },
        status: 200,
        statusText: 'OK',
    }
    it('Should call request and get response', async () => {
        const method = 'GET'
        const url = 'https://test.com'
        const params = {headers: {'Content-Type': 'text/html'}}
        const stub = sinon.stub(axios, 'default')
        stub.returns(response)
        const result = await request(method, url, params)
        expect(result.status).to.equal(200)
        stub.restore()
    })
    it('Should default to JSON content type if none provided', async () => {
        const method = 'GET'
        const url = 'https://test.com'
        const params = {headers: {}}
        const expectedObject = {
            body: '',
            formData: '',
            headers: {
                'Content-Type': 'application/json',
            },
            json: true,
            method,
            url,
        }
        const stub = sinon.stub(axios, 'default')
        await request(method, url, params)
        expect(stub).to.be.calledWith(expectedObject)
        stub.restore()
    })
    it('Should replace options.body if in params', async () => {
        const method = 'GET'
        const url = 'https://test.com'
        const params = {body: '123', headers: {}}
        const stub = sinon.stub(axios, 'default')
        const expectedObject = {
            body: '123',
            formData: '',
            headers: {
                'Content-Type': 'application/json',
            },
            json: true,
            method,
            url,
        }
        await request(method, url, params)
        expect(stub).to.be.calledWith(expectedObject)
        stub.restore()
    })
    it('Should replace options.formData if in params', async () => {
        const method = 'GET'
        const url = 'https://test.com'
        const params = {formData: '123', headers: {}}
        const stub = sinon.stub(axios, 'default')
        const expectedObject = {
            body: '',
            formData: '123',
            headers: {
                'Content-Type': 'application/json',
            },
            json: true,
            method,
            url,
        }
        await request(method, url, params)
        expect(stub).to.be.calledWith(expectedObject)
        stub.restore()
    })
})
