import * as chai from 'chai'
import { expect } from 'chai'
import 'mocha'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import { mockReq, mockRes } from 'sinon-express-mock'
chai.use(sinonChai)

import { http } from '../lib/http'
import * as cohQA from './cohQA'

import { config } from '../../config'

describe('cohQA', () => {
    let res

    const url = config.services.coh_cor_api

    let spy: any
    let spyDelete: any
    let spyPost: any
    let spyPut: any

    beforeEach(() => {
        // this doesn't change much but it is different for createHearing
        // so is just set by default and overridden in that test, to be reset after
        res = {
            data: 'okay',
        }

        spy = sinon.stub(http, 'get').callsFake(() => {
            return Promise.resolve(res)
        })

        spyDelete = sinon.stub(http, 'delete').callsFake(() => {
            return Promise.resolve(res)
        })

        spyPost = sinon.stub(http, 'post').callsFake(() => {
            return Promise.resolve(res)
        })

        spyPut = sinon.stub(http, 'put').callsFake(() => {
            return Promise.resolve(res)
        })
    })

    afterEach(() => {
        spy.restore()
        spyPost.restore()
        spyPut.restore()
        spyDelete.restore()
    })

    describe('getHearing', () => {
        it('Should make a http.get call based on the hearing Id', async () => {
            await cohQA.getHearing('test')
            expect(spy).to.be.calledWith(`${url}/continuous-online-hearings/test`)
        })
        it('Should return the data property of the return ofa http.get call', async () => {
            expect(await cohQA.getHearing('test')).to.equal('okay')
        })
    })

    describe('getHearingByCase', () => {
        it('Should make a http.get call based on the casee Id', async () => {
            await cohQA.getHearingByCase('test')
            expect(spy).to.be.calledWith(`${url}/continuous-online-hearings?case_id=test`)
        })
        it('Should return the data property of the return ofa http.get call', async () => {
            expect(await cohQA.getHearingByCase('test')).to.equal('okay')
        })
    })

    describe('getQuestions', () => {
        it('Should make a http.get call based on the hearing Id', async () => {
            await cohQA.getQuestions('test')
            expect(spy).to.be.calledWith(`${url}/continuous-online-hearings/test/questions`)
        })
        it('Should return the data property of the return ofa http.get call', async () => {
            expect(await cohQA.getQuestions('test')).to.equal('okay')
        })
    })

    describe('postQuestion', () => {
        it('Should make a http.post call based on the hearing Id and given payload', async () => {
            await cohQA.postQuestion('test', 'body')
            expect(spyPost).to.be.calledWith(`${url}/continuous-online-hearings/test/questions`, 'body')
        })
        it('Should return the data property of the return ofa http.get call', async () => {
            expect(await cohQA.postQuestion('test', 'body')).to.equal('okay')
        })
    })

    describe('getQuestion', () => {
        it('Should make a http.get call based on the hearing Id, question id', async () => {
            await cohQA.getQuestion('test', 'test2', {})
            expect(spy).to.be.calledWith(`${url}/continuous-online-hearings/test/questions/test2`, {})
        })
        it('Should return the data property of the return ofa http.get call', async () => {
            expect(await cohQA.getQuestion('test', 'test2', {})).to.equal('okay')
        })
    })

    describe('putQuestion', () => {
        it('Should make a http.put call based on the hearing Id, question id', async () => {
            await cohQA.putQuestion('test', 'test2', {})
            expect(spyPut).to.be.calledWith(`${url}/continuous-online-hearings/test/questions/test2`, {})
        })
    })

    describe('deleteQuestion', () => {
        it('Should make a http.get call based on the hearing Id, question id', async () => {
            await cohQA.deleteQuestion('test', 'test2')
            expect(spyDelete).to.be.calledWith(`${url}/continuous-online-hearings/test/questions/test2`)
        })
        it('Should return the data property of the return ofa http.get call', async () => {
            expect(await cohQA.deleteQuestion('test', 'test2')).to.equal('okay')
        })
    })

    describe('getAnswers', () => {
        it('Should make a http.get call based on the hearing Id, question id', async () => {
            await cohQA.getAnswers('test', 'test2')
            expect(spy).to.be.calledWith(`${url}/continuous-online-hearings/test/questions/test2/answers`)
        })
        it('Should return the data property of the return ofa http.get call', async () => {
            expect(await cohQA.getAnswers('test', 'test2')).to.equal('okay')
        })
    })

    describe('postAnswer', () => {
        it('Should make a http.get call based on the hearing Id, question id and given payload', async () => {
            await cohQA.postAnswer('test', 'test2', 'test3')
            expect(spyPost).to.be.calledWith(`${url}/continuous-online-hearings/test/questions/test2/answers`, 'test3')
        })
        it('Should return the data property of the return ofa http.get call', async () => {
            expect(await cohQA.postAnswer('test', 'test2', 'test3')).to.equal('okay')
        })
    })

    describe('getAnswer', () => {
        it('Should make a http.get call based on the hearing Id, question id and answer id', async () => {
            await cohQA.getAnswer('test', 'test2', 'test3')
            // there seems to be a missing '/' i'm not sure
            expect(spy).to.be.calledWith(`${url}/continuous-online-hearings/test/questions/test2/answerstest3`)
        })
        it('Should return the data property of the return ofa http.get call', async () => {
            expect(await cohQA.getAnswer('test', 'test2', 'test3')).to.equal('okay')
        })
    })

    describe('putAnswer', () => {
        it('Should make a http.put call based on the hearing Id, question id and given payload', async () => {
            await cohQA.putAnswer('test', 'test2', 'test3', 'test4')
            expect(spyPut).to.be.calledWith(`${url}/continuous-online-hearings/test/questions/test2/answerstest3`, 'test4')
        })
    })

    describe('getAllRounds', () => {
        it('Should make a http.get call based on the hearing Id', async () => {
            await cohQA.getAllRounds('test')
            // there seems to be a missing '/' i'm not sure
            expect(spy).to.be.calledWith(`${url}/continuous-online-hearings/test/questionrounds/`)
        })
        it('Should return the data property of the return ofa http.get call', async () => {
            expect(await cohQA.getAllRounds('test')).to.equal('okay')
        })
    })

    describe('getRound', () => {
        it('Should make a http.get call based on the hearing Id', async () => {
            await cohQA.getRound('test', 'test2')
            // there seems to be a missing '/' i'm not sure
            expect(spy).to.be.calledWith(`${url}/continuous-online-hearings/test/questionrounds/test2`)
        })
        it('Should return the data property of the return ofa http.get call', async () => {
            expect(await cohQA.getRound('test', 'test2')).to.equal('okay')
        })
    })

    describe('putRound', () => {
        it('Should make a http.put call based on the hearing Id, round id and given payload', async () => {
            await cohQA.putRound('test', 'test2', 'test3')
            expect(spyPut).to.be.calledWith(`${url}/continuous-online-hearings/test/questionrounds/test2`, 'test3')
        })
        it('Should return the data property of the return ofa http.get call', async () => {
            expect(await cohQA.putRound('test', 'test2', 'test3')).to.equal('okay')
        })
    })

    describe('getOnlineHearingConversation', () => {
        it('Should make a http.get call based on the onlineHearingId', async () => {
            await cohQA.getOnlineHearingConversation('test')
            expect(spy).to.be.calledWith(`${url}/continuous-online-hearings/test/conversations`)
        })
        it('Should return the data property of the return ofa http.get call', async () => {
            expect(await cohQA.getOnlineHearingConversation('test')).to.equal('okay')
        })
    })

    describe('postDecision', () => {
        it('Should make a http.post call based on the hearing Id and given payload', async () => {
            await cohQA.postDecision('test', 'body')
            expect(spyPost).to.be.calledWith(`${url}/continuous-online-hearings/test/decisions`, 'body')
        })
        it('Should return the data property of the return ofa http.get call', async () => {
            expect(await cohQA.postDecision('test', 'body')).to.equal('okay')
        })
    })

    describe('putDecision', () => {
        it('Should make a http.put call based on the hearing Id and given payload', async () => {
            await cohQA.putDecision('test', 'test2')
            expect(spyPut).to.be.calledWith(`${url}/continuous-online-hearings/test/decisions`, 'test2')
        })
        it('Should return the data property of the return ofa http.get call', async () => {
            expect(await cohQA.putDecision('test', 'test2')).to.equal('okay')
        })
    })

    describe('getDecision', () => {
        it('Should make a http.get call based on the onlineHearingId', async () => {
            await cohQA.getDecision('test')
            expect(spy).to.be.calledWith(`${url}/continuous-online-hearings/test/decisions`)
        })
        it('Should return the data property of the return ofa http.get call', async () => {
            expect(await cohQA.getDecision('test')).to.equal('okay')
        })
    })

    describe('createHearing', () => {
        it('Should make a http.post call based on the case Id and jurisdiction', async () => {
            await cohQA.createHearing('test', 'sscs')

            const body = {
                case_id: 'test',
                jurisdiction: 'sscs',
                start_date: (new Date()).toISOString().split('.')[0] + 'Z',
            }

            expect(spyPost).to.be.calledWith(`${url}/continuous-online-hearings`, body)
        })

        it(`Should make a http.post call based on the case Id and SSCS as a default jurisdiction 
        if on is not provided`, async () => {
                await cohQA.createHearing('test')

                const body = {
                    case_id: 'test',
                    jurisdiction: 'SSCS',
                    start_date: (new Date()).toISOString().split('.')[0] + 'Z',
                }

                expect(spyPost).to.be.calledWith(`${url}/continuous-online-hearings`, body)
            })
        it('Should return the data property of the return ofa http.get call', async () => {
            res.data = {
                online_hearing_id: 'testId',
            }
            expect(await cohQA.createHearing('test', 'body')).to.equal('testId')
        })
    })

    describe('getHearingIdOrCreateHearing', () => {
        it('Should make a get based on a case id ', async () => {

            res.data = {
                online_hearings: [{
                    online_hearing_id: 'existingId',
                }],
            }

            await cohQA.getHearingIdOrCreateHearing('test')
            expect(spy).to.be.calledWith(`${url}/continuous-online-hearings?case_id=test`)
        })

        it('Should return the id of an existing hearing for a case if one exists', async () => {

            res.data = {
                online_hearings: [{
                    online_hearing_id: 'existingId',
                }],
            }
            expect(await cohQA.getHearingIdOrCreateHearing('test')).to.equal('existingId')
        })

        it('Should return the id of an existing hearing for a case if one exists', async () => {

            res.data = {
                online_hearings: [],
                online_hearing_id: 'testId',
            }

            expect(await cohQA.getHearingIdOrCreateHearing('test')).to.equal('testId')
        })
    })

    describe('postHearing', () => {
        it('Should make a http.post call based a given payload', async () => {
            await cohQA.postHearing('body')
            expect(spyPost).to.be.calledWith(`${url}/continuous-online-hearings`, 'body')
        })
        it('Should return the data property of the return ofa http.get call', async () => {
            expect(await cohQA.postDecision('test', 'body')).to.equal('okay')
        })
    })

})
