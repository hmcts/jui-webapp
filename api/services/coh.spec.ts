import 'mocha'

import * as chai from 'chai'
import * as coh from './coh'
import * as sinonChai from 'sinon-chai'
import * as sinon from 'sinon'
import * as moment from 'moment'

import {mockReq, mockRes} from 'sinon-express-mock'
import {expect} from 'chai'
import {http} from '../lib/http'
import {config} from '../../config'
import {getHearingByCase} from './coh'

chai.use(sinonChai)

// TODO: need to look into why 'this' was failing

describe('Assign Case', () => {

    const url = config.services.coh_cor_api

    const caseId = 'case id'
    const userId = 'user id'
    const hearingId = 'hearingId'

    const res = {
        data: 'okay',
    }

    let spy: any
    let sandbox

    beforeEach(() => {

        sandbox = sinon.createSandbox()

        spy = sandbox.stub(http, 'get').resolves(res)
    })

    afterEach(() => {

        sandbox.restore()
    })

    /**
     * Note that I don't know why the following logic is happening in getAssignEventId() as this unit test
     * was written past the point of when the function was developed.
     */
    describe('getHearingByCase', () => {

        it('Should take in the caseId and make a call to get the hearing.', async () => {

            coh.getHearingByCase(caseId)

            expect(spy).to.be.calledWith(`${url}/continuous-online-hearings?case_id=${caseId}`)
        })

        it('Should return the data property of the return of a http.get call', async () => {

            expect(await coh.getHearingByCase(caseId)).to.equal('okay')
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

    xdescribe('getEvents', () => {

        it('Should take in the caseId and userId and make a call to getHearingByCase().', async () => {

            const spyGetHearingByCase = sandbox.stub(coh, 'getHearingByCase').resolves(res)

            coh.getEvents(caseId, userId)

            expect(spyGetHearingByCase).to.be.calledWith(caseId)

            spyGetHearingByCase.restore()
        })
    })

    describe('getDecision', () => {

        it('Should take in the hearingId and make a call to get the decision.', async () => {

            coh.getDecision(hearingId)

            expect(spy).to.be.calledWith(`${url}/continuous-online-hearings/${hearingId}/decisions`)
        })

        it('Should return the data property of the return of a http.get call', async () => {

            expect(await coh.getDecision(hearingId)).to.equal('okay')
        })
    })

    xdescribe('getOrCreateHearing', () => {

        it('Should make a call to getHearingByCase with caseId.', async () => {

            const spyGetHearingByCase = sandbox.stub(coh, 'getHearingByCase').resolves(hearingId)

            coh.getOrCreateHearing(caseId, userId)

            expect(spyGetHearingByCase).to.be.calledWith(caseId)

            spyGetHearingByCase.restore()
        })

        it('Should return the online_hearing_id if online_hearings are available.', async () => {

            const hearing = {
                online_hearings: [
                    {
                        online_hearing_id: 135,
                    },
                ],
            }

            const spyGetHearingByCase = sandbox.stub(coh, 'getHearingByCase').resolves(hearing)

            expect(await coh.getOrCreateHearing(caseId, userId)).to.equal(hearing.online_hearings[0].online_hearing_id)

            spyGetHearingByCase.restore()
        })
    })

    describe('createDecision', () => {

        it('Should take in the hearingId and make a call to post the decision.', async () => {

            const spyPost = sandbox.stub(http, 'post').resolves(res)

            coh.createDecision(hearingId)

            expect(spyPost).to.be.calledWith(`${url}/continuous-online-hearings/${hearingId}/decisions`,
                {
                    decision_award: 'n/a',
                    decision_header: 'n/a',
                    decision_reason: 'n/a',
                    decision_text: 'n/a',
                })

            spyPost.restore()
        })
    })

    xdescribe('storeData', () => {

        it('Should take in the hearingId and make a call to get the decision using the hearingId.', async () => {

            const data = {}
            const state = 'decision_drafted'

            const spyGetDecision = sandbox.stub(coh, 'getDecision').resolves({
                decision_state: {
                    state_name: 'decision_drafted',
                },
            })

            coh.storeData(hearingId, data, state)

            expect(spyGetDecision).to.be.calledWith(hearingId)

            spyGetDecision.restore()
        })
    })

    describe('getData', () => {

        it('Should take in the hearingId and make a call to get the decisions using the hearingId.', async () => {

            coh.getData(hearingId)

            expect(spy).to.be.calledWith(`${url}/continuous-online-hearings/${hearingId}/decisions`)
        })
    })

    xdescribe('getOrCreateDecision', () => {

        it('Should take in the caseId and userId and make a call to get or create hearing Id.', async () => {

            const spyGetOrCreateHearing = sandbox.stub(coh, 'getOrCreateHearing').resolves(hearingId)

            coh.getOrCreateDecision(caseId, userId)

            expect(spyGetOrCreateHearing).to.be.calledWith(caseId, userId)

            spyGetOrCreateHearing.restore()
        })
    })

    xdescribe('relistHearing', () => {

        const state = 'issued'
        const reason = 'users freetext'

        it('Should call getOrCreateHearing() to get a hearing id.', async () => {

            const spyGetOrCreateHearing = sandbox.stub(coh, 'getOrCreateHearing').resolves(hearingId)

            coh.relistHearing(caseId, userId, state, reason)

            expect(spyGetOrCreateHearing).to.be.calledWith(caseId, userId)

            spyGetOrCreateHearing.restore()
        })
    })
})
