import * as chai from 'chai'
import {expect} from 'chai'
import 'mocha'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import {mockReq, mockRes} from 'sinon-express-mock'
import * as moment from 'moment'
import * as log4jui from '../lib/log4jui'

chai.use(sinonChai)

import * as coh from './coh'
import {http} from '../lib/http'
import {config} from '../../config'

import {getHearingByCase} from './coh'

const logger = log4jui.getLogger('COH')

describe('Assign Case', () => {

    const res = {
        data: 'okay',
    }

    // let spy: any
    // let spyDelete: any
    // let spyPost: any
    // let spyPatch: any

    beforeEach(() => {

        // spy = sinon.stub(http, 'get').resolves(res)
        // spyPost = sinon.stub(http, 'post').resolves(res)
        // spyPatch = sinon.stub(http, 'patch').resolves(res)
        // spyDelete = sinon.stub(http, 'delete').resolves(res)
    })

    afterEach(() => {

        // spy.restore()
        // spyPost.restore()
        // spyPatch.restore()
        // spyDelete.restore()
    })

    let spy: any

    const url = config.services.coh_cor_api

    /**
     * Note that I don't know why the following logic is happening in getAssignEventId() as the unit test
     * was written way past the point of when the function was developed.
     */
    describe('getHearingByCase', () => {

        it('Should take in the caseId and make a call to get the hearing.', async () => {

            const caseId = '42'

            spy = sinon.stub(http, 'get').resolves(res)

            coh.getHearingByCase(caseId)

            expect(spy).to.be.calledWith(`${url}/continuous-online-hearings?case_id=${caseId}`)

            spy.restore()
        })

        it('Should return the data property of the return of a http.get call', async () => {

            spy = sinon.stub(http, 'get').resolves(res)

            const caseId = '42'

            expect(await coh.getHearingByCase(caseId)).to.equal('okay')

            spy.restore()
        })
    })

    describe('convertDateTime', () => {

        it('Should convert date time', async () => {

            const dateObj = new Date('1995-12-15T03:24:00')
            const dateAsString = String(dateObj)

            const momentDate = moment(dateAsString)
            const dateUtc = momentDate.utc().format()
            const date = momentDate.format('D MMMM YYYY')
            const time = momentDate.format('h:mma')

            expect(coh.convertDateTime(dateAsString).date).to.equal(date)
            expect(coh.convertDateTime(dateAsString).time).to.equal(time)
            expect(coh.convertDateTime(dateAsString).dateUtc).to.equal(dateUtc)
        })
    })

    /**
     * The production code that this test relates to does something unusual - it always returns
     * an array of "history", with subsequent values being [undefined]'s.
     *
     * Writing a unit test around this would only inflate the issue, hence
     * it's being skipped until there is more clarity around the production code here.
     */
    xdescribe('mergeCohEvents', () => {

        it('Should merge history, questions history, answers history and decision history together.', async () => {

            const eventsJson = {
                online_hearing: {
                    answers: ['answers', 'answers2', 'answers3'],
                    decision: ['decision', 'decision2', 'decision3'],
                    history: ['history', 'history2', 'history3'],
                    questions: ['questions', 'questions2', 'questions3'],
                },
            }

            expect(coh.mergeCohEvents(eventsJson)).to.equal([])
        })
    })

    describe('createHearing', () => {

        it('Should take in the caseId, userId, jurisdictionId and make a call to post the hearing.', async () => {

            const caseId = 'caseId'
            const userId = 'userId'
            const jurisdictionId = 'jurisdictionId'

            const spyPost = sinon.stub(http, 'post').resolves(res)

            coh.createHearing(caseId, userId, jurisdictionId)

            expect(spyPost).to.be.calledWith(`${url}/continuous-online-hearings`, {
                case_id: caseId,
                jurisdiction: jurisdictionId,
                panel: [{identity_token: 'string', name: userId}],
                start_date: new Date().toISOString(),
            })

            spyPost.restore()
        })
    })

    // TODO: Working through.
    describe('getEvents', () => {

        const caseId = 'case id'
        const userId = 'user id'

        it('Should take in the caseId and userId and make a call to getHearingByCase().', async () => {

            spy = sinon.stub(coh, 'getHearingByCase').resolves(res)

            coh.getEvents(caseId, userId)

            expect(spy).to.be.calledWith(caseId)

            spy.restore()
        })

        xit('Should make a call to continuous-online-hearings /conversations.', async () => {

            const hearingId = 'hearingId'

            spy = sinon.stub(http, 'get').resolves(res)

            coh.getEvents(caseId, userId)

            expect(spy).to.be.calledWith(`${url}/continuous-online-hearings/${hearingId}/conversations`)

            spy.restore()
        })

        xit('Should return the online_hearing_id if online_hearings are available.', async () => {

            const hearing = {
                online_hearings: [
                    {
                        online_hearing_id: 135,
                    },
                ],
            }

            spy = sinon.stub(coh, 'getHearingByCase').resolves(hearing)

            expect(await coh.getEvents(caseId, userId)).to.equal(hearing.online_hearings[0].online_hearing_id)

            spy.restore()
        })
    })

    describe('getDecision', () => {

        it('Should take in the hearingId and make a call to get the decision.', async () => {

            const hearingId = '42'

            spy = sinon.stub(http, 'get').resolves(res)

            coh.getDecision(hearingId)

            expect(spy).to.be.calledWith(`${url}/continuous-online-hearings/${hearingId}/decisions`)

            spy.restore()
        })

        it('Should return the data property of the return of a http.get call', async () => {

            spy = sinon.stub(http, 'get').resolves(res)

            const hearingId = '42'

            expect(await coh.getDecision(hearingId)).to.equal('okay')

            spy.restore()
        })
    })

    describe('getOrCreateHearing', () => {

        it('Should make a call to getHearingByCase with caseId.', async () => {

            const caseId = '42'
            const userId = '42'

            const hearingId = 'hearingId'

            spy = sinon.stub(coh, 'getHearingByCase').resolves(hearingId)

            coh.getOrCreateHearing(caseId, userId)

            expect(spy).to.be.calledWith(caseId)

            spy.restore()
        })

        it('Should return the online_hearing_id if online_hearings are available.', async () => {

            const caseId = '42'
            const userId = '42'

            const hearingId = {
                online_hearings: [
                    {
                        online_hearing_id: 135,
                    },
                ],
            }

            spy = sinon.stub(coh, 'getHearingByCase').resolves(hearingId)

            expect(await coh.getOrCreateHearing(caseId, userId)).to.equal(hearingId.online_hearings[0].online_hearing_id)

            spy.restore()
        })

        xit('Should call createHearing() if there is no hearing.', async () => {

            const caseId = 'caseId'
            const userId = 'userId'
            const hearingId = 'hearingId'

            spy = sinon.stub(coh, 'getHearingByCase').resolves(false)
            const spyCreateHearing = sinon.stub(coh, 'createHearing').resolves(hearingId)

            coh.getOrCreateHearing(caseId, userId)

            expect(spyCreateHearing).to.be.calledWith(caseId, userId)

            spyCreateHearing.restore()
        })
    })

    describe('createDecision', () => {

        it('Should take in the hearingId and make a call to post the decision.', async () => {

            const hearingId = '42'

            spy = sinon.stub(http, 'post').resolves(res)

            coh.createDecision(hearingId)

            expect(spy).to.be.calledWith(`${url}/continuous-online-hearings/${hearingId}/decisions`,
                {
                    decision_award: 'n/a',
                    decision_header: 'n/a',
                    decision_reason: 'n/a',
                    decision_text: 'n/a',
                })

            spy.restore()
        })
    })

    /**
     * TODO: This test request getDecision to be test.getDecision, so that the spy has a refenece, as to
     * what to spy upon.
     */
    describe('storeData', () => {

        it('Should take in the hearingId and make a call to get the decision using the hearingId.', async () => {

            const hearingId = '42'
            const data = {}
            const state = 'decision_drafted'

            spy = sinon.stub(coh, 'getDecision').resolves({
                decision_state: {
                    state_name: 'decision_drafted',
                },
            })

            coh.storeData(hearingId, data, state)

            expect(spy).to.be.calledWith(hearingId)

            spy.restore()
        })
    })

    describe('getData', () => {

        it('Should take in the hearingId and make a call to get the decisions using the hearingId.', async () => {

            const hearingId = '42'

            spy = sinon.stub(http, 'get').resolves(res)

            coh.getData(hearingId)

            expect(spy).to.be.calledWith(`${url}/continuous-online-hearings/${hearingId}/decisions`)

            spy.restore()
        })

        xit('Should log the error if there is an issue getting decisions.', async () => {

            const hearingId = '42'

            spy = sinon.stub(http, 'get').throws()
            const loggerSpy = sinon.stub(logger, 'info')

            coh.getData(hearingId)

            expect(loggerSpy).to.be.calledWith(`No decision for hearing ${hearingId} found`)

            loggerSpy.restore()
        })
    })

    /**
     * Requires this. to be placed on the getOrCreateHearing function.
     */
    describe('getOrCreateDecision', () => {

        it('Should take in the caseId and userId and make a call to get or create hearing Id.', async () => {

            const hearingId = 'hearingId'
            const caseId = 'caseId'
            const userId = 'userId'

            spy = sinon.stub(coh, 'getOrCreateHearing').resolves(hearingId)

            coh.getOrCreateDecision(caseId, userId)

            expect(spy).to.be.calledWith(caseId, userId)

            spy.restore()
        })
    })

    describe('relistHearing', () => {

        const caseId = 'caseId'
        const userId = 'userId'
        const state = 'issued'
        const reason = 'users freetext'

        it('Should call getOrCreateHearing() to get a hearing id.', async () => {

            const hearingId = 'hearingId'

            spy = sinon.stub(coh, 'getOrCreateHearing').resolves(hearingId)

            coh.relistHearing(caseId, userId, state, reason)

            expect(spy).to.be.calledWith(caseId, userId)

            spy.restore()
        })
    })
})
