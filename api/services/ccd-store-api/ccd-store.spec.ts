import * as chai from 'chai'
import {expect} from 'chai'
import 'mocha'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import {mockReq, mockRes} from 'sinon-express-mock'

chai.use(sinonChai)

import {http} from '../../lib/http'
import * as ccdStore from './ccd-store'

import {config} from '../../../config'

describe('ccd Store', () => {

    const res = {
        data: {
            case_details : 'caseDetails',
            token: 'tokenValue',
        },
    }

    const url = config.services.ccd_data_api

    let spy: any
    // let spyDelete: any
    // let spyPost: any
    // let spyPatch: any

    beforeEach(() => {

        spy = sinon.stub(http, 'get').resolves(res)
        // spyPost = sinon.stub(http, 'post').resolves(res)
        // spyPatch = sinon.stub(http, 'patch').resolves(res)
        // spyDelete = sinon.stub(http, 'delete').resolves(res)
    })

    afterEach(() => {

        spy.restore()
        // spyPost.restore()
        // spyPatch.restore()
        // spyDelete.restore()
    })

    // TODO: Abstract up a level
    const userId = '42'
    const jurisdiction = 'jurisdiction'
    const caseType = 'caseType'
    const caseId = 'caseId'
    const eventId = 'eventId'

    describe('getCCDEventToken()', () => {

        it('Should make a http.get call', async () => {

            await ccdStore.getCCDEventToken(userId, jurisdiction, caseType, caseId, eventId)
            expect(spy).to.be.calledWith(`${url}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${caseType}/cases/${caseId}/event-triggers/${eventId}/token`)
        })

        it('Should return the data property of the return of a http.get call', async () => {

            expect(await ccdStore.getCCDEventToken(userId, jurisdiction, caseType, caseId, eventId)).to.equal(res.data)
        })

    })

    describe('getEventTokenAndCase()', () => {

        it('Should make a http.get call', async () => {

            await ccdStore.getEventTokenAndCase(userId, jurisdiction, caseType, caseId, eventId)
            expect(spy).to.be.calledWith(`${url}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${caseType}/cases/${caseId}/event-triggers/${eventId}/token`)
        })

        it('Should return the token, and caseDetails properties from the http.get call', async () => {

            expect(await ccdStore.getEventTokenAndCase(userId, jurisdiction, caseType, caseId, eventId)).to.deep.equal({token: 'tokenValue', caseDetails: 'caseDetails'})
        })

    })

    describe('getCCDEventTokenWithoutCase()', () => {

        it('Should make a http.get call', async () => {

            await ccdStore.getCCDEventTokenWithoutCase(userId, jurisdiction, caseType, eventId)
            expect(spy).to.be.calledWith(`${url}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${caseType}/event-triggers/${eventId}/token`)
        })

        it('Should return the data property of the return of a http.get call', async () => {

            expect(await ccdStore.getCCDEventTokenWithoutCase(userId, jurisdiction, caseType, eventId)).to.equal(res.data)
        })
    })

    //TODO: Working through
    describe('postCaseWithEventToken()', () => {

        xit('Should make a http.get call', async () => {

            const caseTypeId = 'caseTypeId';

            await ccdStore.postCaseWithEventToken(userId, jurisdiction, caseType, caseTypeId, eventId)
            expect(spy).to.be.calledWith(`${url}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${caseTypeId}/cases/${caseId}/events`)
        })

        xit('Should return the data property of the return of a http.get call', async () => {

            expect(await ccdStore.getCCDEventTokenWithoutCase(userId, jurisdiction, caseType, eventId)).to.equal(res.data)
        })
    })
})
