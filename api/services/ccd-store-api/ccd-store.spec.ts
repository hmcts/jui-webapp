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

    const userId = '42'
    const jurisdiction = 'jurisdiction'
    const caseType = 'caseType'
    const caseId = 'caseId'
    const eventId = 'eventId'
    const body = {}
    const filter = 'filter'

    let spy: any
    let spyPost: any

    beforeEach(() => {

        spy = sinon.stub(http, 'get').resolves(res)
        spyPost = sinon.stub(http, 'post').resolves(res)
    })

    afterEach(() => {

        spy.restore()
        spyPost.restore()
    })

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

    describe('postCaseWithEventToken()', () => {

        const caseTypeId = 'caseTypeId'

        it('Should make a http.post call', async () => {

            await ccdStore.postCaseWithEventToken(userId, jurisdiction, caseTypeId, caseId, body)
            expect(spyPost).to.be.calledWith(`${url}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${caseTypeId}/cases/${caseId}/events`)
        })

        it('Should return the data property of the return of a http.post call', async () => {

            expect(await ccdStore.postCaseWithEventToken(userId, jurisdiction, caseTypeId, caseId, body)).to.equal(res.data)
        })
    })

    describe('postCCDEvent()', () => {

        it('Should make a http.get call', async () => {

            await ccdStore.postCCDEvent(userId, jurisdiction, caseType, caseId, body)
            expect(spy).to.be.calledWith(`${url}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${caseType}/cases/${caseId}/events`)
        })

        it('Should return the data property of the return of a http.get call', async () => {

            expect(await ccdStore.postCCDEvent(userId, jurisdiction, caseType, caseId, body)).to.equal(res.data)
        })
    })

    describe('getCCDCase()', () => {

        it('Should make a http.get call', async () => {

            await ccdStore.getCCDCase(userId, jurisdiction, caseType, caseId)
            expect(spy).to.be.calledWith(`${url}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${caseType}/cases/${caseId}`)
        })

        it('Should return the data property of the return of a http.get call', async () => {

            expect(await ccdStore.getCCDCase(userId, jurisdiction, caseType, caseId)).to.equal(res.data)
        })
    })

    describe('getCCDEvents()', () => {

        it('Should make a http.get call', async () => {

            await ccdStore.getCCDEvents(userId, jurisdiction, caseType, caseId)
            expect(spy).to.be.calledWith(`${url}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${caseType}/cases/${caseId}/events`)
        })

        it('Should return the data property of the return of a http.get call', async () => {

            expect(await ccdStore.getCCDEvents(userId, jurisdiction, caseType, caseId)).to.equal(res.data)
        })
    })

    describe('getCCDCases()', () => {

        it('Should make a http.get call', async () => {

            await ccdStore.getCCDCases(userId, jurisdiction, caseType, filter)
            expect(spy).to.be.calledWith(`${url}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${caseType}/cases?sortDirection=DESC${filter}`)
        })

        it('Should return the data property of the return of a http.get call', async () => {

            expect(await ccdStore.getCCDCases(userId, jurisdiction, caseType, filter)).to.equal(res.data)
        })
    })

    describe('postCCDCase()', () => {

        it('Should make a http.get call', async () => {

            await ccdStore.postCCDCase(userId, jurisdiction, caseType, body)
            expect(spyPost).to.be.calledWith(`${url}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${caseType}/cases`)
        })
    })

    describe('getMutiJudCCDCases()', () => {

        it('Should make a call to getCCDCases', async () => {

            const jurisdictions = [{
                caseType: 'caseType',
                filter: 'filter',
                jur: 'jur',
            }]

            await ccdStore.getMutiJudCCDCases(userId, jurisdictions)
            expect(spy).to.be.called
        })
    })

    describe('createCase()', () => {

        it('Should make a call to getCCDEventTokenWithoutCase', async () => {

            const description = ''
            const summary = ''
            const data = {}

            await ccdStore.createCase(userId, jurisdiction, caseType, eventId, description, summary, data)
            expect(spy).to.be.calledWith(`${url}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${caseType}/event-triggers/${eventId}/token`)
        })
    })

    describe('updateCase()', () => {

        it('Should make a call to getCCDEventToken', async () => {

            const description = ''
            const summary = ''
            const data = {}

            await ccdStore.updateCase(userId, jurisdiction, caseType, caseId, eventId, description, summary, data)
            expect(spy).to.be.calledWith(`${url}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${caseType}/cases/${caseId}/event-triggers/${eventId}/token`)
        })
    })
})
