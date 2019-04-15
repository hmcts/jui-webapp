import * as chai from 'chai'
import { expect } from 'chai'
import 'mocha'
import * as moment from 'moment'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import { config } from '../../config'
import { http } from '../lib/http'
import * as coh from './coh'

chai.use(sinonChai)

describe('Assign Case', () => {

    const url = config.services.coh_cor_api

    const caseId = 'case id'
    const userId = 'user id'
    const hearingId = 'hearingId'
    const hearing = {
        online_hearings: [
            {
                online_hearing_id: 135,
            },
        ],
    }

    const res = {
        data: 'okay',
    }

    let spyGet: any
    let spyPost: any
    let spyPut: any
    let sandbox

    beforeEach(() => {

        sandbox = sinon.createSandbox()

        spyGet = sandbox.stub(http, 'get').resolves(res)
        spyPost = sandbox.stub(http, 'post').resolves(res)
        spyPut = sandbox.stub(http, 'put').resolves(res)
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

            expect(spyGet).to.be.calledWith(`${url}/continuous-online-hearings?case_id=${caseId}`)
        })

        it('Should return the data property of the return of a http.get call', async () => {

            const result = await coh.getHearingByCase(caseId)
            expect(result).to.equal('okay')
        })
    })

    describe('convertDateTime', () => {

        it('Should convert date time', async () => {

            const dateObj = new Date('1995-12-15T03:24:00')
            const dateAsString = dateObj.toISOString()

            const momentDate = moment(dateAsString)
            const dateUtc = momentDate.utc().format()
            const date = momentDate.format('D MMMM YYYY')
            const time = momentDate.format('h:mma')

            const result = coh.convertDateTime(dateAsString)

            expect(result).to.deep.equal({
                date,
                dateUtc,
                time,
            })
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
            const result = coh.mergeCohEvents(eventsJson)

            expect(result).to.equal([])
        })
    })

    describe('getEvents', () => {

        it('Should take in the caseId and userId and make a call to getHearingByCase().', async () => {

            const spyGetHearingByCase = sandbox.stub(coh, 'getHearingByCase').resolves(hearing)

            sandbox.stub(coh, 'mergeCohEvents').returns([])

            await coh.getEvents(caseId, userId)

            expect(spyGetHearingByCase).to.be.calledWith(caseId)

            spyGetHearingByCase.restore()
        })
    })

    describe('getDecision', () => {

        it('Should take in the hearingId and make a call to get the decision.', async () => {

            await coh.getDecision(hearingId)

            expect(spyGet).to.be.calledWith(`${url}/continuous-online-hearings/${hearingId}/decisions`)
        })

        it('Should return the data property of the return of a http.get call', async () => {
            const result = await coh.getDecision(hearingId)
            expect(result).to.equal('okay')
        })
    })

    describe('getOrCreateHearing', () => {

        it('Should make a call to getHearingByCase with caseId.', async () => {

            const spyGetHearingByCase = sandbox.stub(coh, 'getHearingByCase').resolves(hearing)

            await coh.getOrCreateHearing(caseId, userId)

            expect(spyGetHearingByCase).to.be.calledWith(caseId)
        })

        it('Should return the online_hearing_id if online_hearings are available.', async () => {

            sandbox.stub(coh, 'getHearingByCase').resolves(hearing)

            const result = await coh.getOrCreateHearing(caseId, userId)
            expect(result).to.equal(hearing.online_hearings[0].online_hearing_id)

        })
    })

    describe('createDecision', () => {

        it('Should take in the hearingId and make a call to post the decision.', async () => {

            await coh.createDecision(hearingId)

            expect(spyPost).to.be.calledWith(`${url}/continuous-online-hearings/${hearingId}/decisions`,
                {
                    decision_award: 'n/a',
                    decision_header: 'n/a',
                    decision_reason: 'n/a',
                    decision_text: 'n/a',
                })

        })
    })

    describe('storeData', () => {

        it('Should take in the hearingId and make a call to get the decision using the hearingId.', async () => {

            const data = {}
            const state = 'decision_drafted'

            const spyGetDecision = sandbox.stub(coh, 'getDecision').resolves({
                decision_state: {
                    state_name: 'decision_drafted',
                },
            })

            await coh.storeData(hearingId, data, state)

            expect(spyGetDecision).to.be.calledWith(hearingId)
        })
    })

    describe('getData', () => {

        it('Should take in the hearingId and make a call to get the decisions using the hearingId.', async () => {

            await coh.getData(hearingId)

            expect(spyGet).to.be.calledWith(`${url}/continuous-online-hearings/${hearingId}/decisions`)
        })
    })

    describe('getOrCreateDecision', () => {

        it('Should take in the caseId and userId and make a call to get or create hearing Id.', async () => {

            const spyGetOrCreateHearing = sandbox.stub(coh, 'getOrCreateHearing').resolves(hearingId)

            sandbox.stub(coh, 'createDecision').resolves(true)
            await coh.getOrCreateDecision(caseId, userId)

            expect(spyGetOrCreateHearing).to.be.calledWith(caseId, userId)
        })
    })

    describe('relistHearing', () => {

        const state = 'issued'
        const reason = 'users freetext'

        it('Should call getOrCreateHearing() to get a hearing id.', async () => {

            const spyGetOrCreateHearing = sandbox.stub(coh, 'getOrCreateHearing').resolves(hearingId)

            await coh.relistHearing(caseId, userId, state, reason)

            expect(spyGetOrCreateHearing).to.be.calledWith(caseId, userId)

        })
    })
})
