import 'mocha'
import * as chai from 'chai'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import * as express from 'express'
import * as pq from 'proxyquire'
import * as supertest from 'supertest'

chai.use(sinonChai)
const expect = chai.expect
const proxyquire = pq.noPreserveCache()

import { config } from '../../../config'

const url = config.services.coh_cor_api

describe('coh-cor-api spec', () => {
    let route
    let request
    let app
    let httpRequest
    let httpResponse

    beforeEach(() => {
        httpResponse = (resolve, reject) => {
            resolve({})
        }
        httpRequest = sinon.stub()
        httpRequest.callsFake((url) => new Promise(httpResponse))

        app = express()

        route = proxyquire('./coh-cor-api.ts', {
            '../../lib/http': httpRequest
        })

        route.default(app)

        request = supertest(app)
    })

    // describe('getHealth', () => {
    //     let getHealth

    //     beforeEach(() => {
    //         getHealth = route.getHealth
    //     })

    //     it('should expose function', () => {
    //         expect(getHealth).to.be.ok
    //     })

    //     it('should make a request', () => {
    //         getHealth()
    //         expect(httpRequest).to.have.been.calledWith(`${url}/health`)
    //     })
    // })

    // describe('getInfo', () => {
    //     let getInfo

    //     beforeEach(() => {
    //         getInfo = route.getInfo
    //     })

    //     it('should expose function', () => {
    //         expect(getInfo).to.be.ok
    //     })

    //     it('should make a request', () => {
    //         getInfo({})
    //         expect(httpRequest).to.have.been.calledWith(`${url}/info`)
    //     })
    // })

    describe('getHearing', () => {
        let getHearing

        beforeEach(() => {
            getHearing = route.getHearing
        })

        it('should expose function', () => {
            expect(getHearing).to.be.ok
        })
    })

    describe('getHearingByCase', () => {
        let getHearingByCase

        beforeEach(() => {
            getHearingByCase = route.getHearingByCase
        })

        it('should expose function', () => {
            expect(getHearingByCase).to.be.ok
        })
    })

    describe('postHearing', () => {
        let postHearing

        beforeEach(() => {
            postHearing = route.postHearing
        })

        it('should expose function', () => {
            expect(postHearing).to.be.ok
        })
    })

    describe('getQuestions', () => {
        let getQuestions

        beforeEach(() => {
            getQuestions = route.getQuestions
        })

        it('should expose function', () => {
            expect(getQuestions).to.be.ok
        })
    })

    describe('getQuestion', () => {
        let getQuestion

        beforeEach(() => {
            getQuestion = route.getQuestion
        })

        it('should expose function', () => {
            expect(getQuestion).to.be.ok
        })
    })

    describe('postQuestion', () => {
        let postQuestion

        beforeEach(() => {
            postQuestion = route.postQuestion
        })

        it('should expose function', () => {
            expect(postQuestion).to.be.ok
        })
    })

    describe('putQuestion', () => {
        let putQuestion

        beforeEach(() => {
            putQuestion = route.putQuestion
        })

        it('should expose function', () => {
            expect(putQuestion).to.be.ok
        })
    })

    describe('deleteQuestion', () => {
        let deleteQuestion

        beforeEach(() => {
            deleteQuestion = route.deleteQuestion
        })

        it('should expose function', () => {
            expect(deleteQuestion).to.be.ok
        })
    })

    describe('getAnswers', () => {
        let getAnswers

        beforeEach(() => {
            getAnswers = route.getAnswers
        })

        it('should expose function', () => {
            expect(getAnswers).to.be.ok
        })
    })

    describe('postAnswer', () => {
        let postAnswer

        beforeEach(() => {
            postAnswer = route.postAnswer
        })

        it('should expose function', () => {
            expect(postAnswer).to.be.ok
        })
    })

    describe('getAnswer', () => {
        let getAnswer

        beforeEach(() => {
            getAnswer = route.getAnswer
        })

        it('should expose function', () => {
            expect(getAnswer).to.be.ok
        })
    })

    describe('putAnswer', () => {
        let putAnswer

        beforeEach(() => {
            putAnswer = route.putAnswer
        })

        it('should expose function', () => {
            expect(putAnswer).to.be.ok
        })
    })

    describe('getAllRounds', () => {
        let getAllRounds

        beforeEach(() => {
            getAllRounds = route.getAllRounds
        })

        it('should expose function', () => {
            expect(getAllRounds).to.be.ok
        })
    })

    describe('getRound', () => {
        let getRound

        beforeEach(() => {
            getRound = route.getRound
        })

        it('should expose function', () => {
            expect(getRound).to.be.ok
        })
    })

    describe('putRound', () => {
        let putRound

        beforeEach(() => {
            putRound = route.putRound
        })

        it('should expose function', () => {
            expect(putRound).to.be.ok
        })
    })

    describe('getOnlineHearingConversation', () => {
        let getOnlineHearingConversation

        beforeEach(() => {
            getOnlineHearingConversation = route.getOnlineHearingConversation
        })

        it('should expose function', () => {
            expect(getOnlineHearingConversation).to.be.ok
        })
    })

    describe('getDecision', () => {
        let getDecision

        beforeEach(() => {
            getDecision = route.getDecision
        })

        it('should expose function', () => {
            expect(getDecision).to.be.ok
        })
    })

    describe('postDecision', () => {
        let postDecision

        beforeEach(() => {
            postDecision = route.postDecision
        })

        it('should expose function', () => {
            expect(postDecision).to.be.ok
        })
    })

    describe('putDecision', () => {
        let putDecision

        beforeEach(() => {
            putDecision = route.putDecision
        })

        it('should expose function', () => {
            expect(putDecision).to.be.ok
        })
    })

    describe('createHearing', () => {
        let createHearing

        beforeEach(() => {
            createHearing = route.createHearing
        })

        it('should expose function', () => {
            expect(createHearing).to.be.ok
        })
    })

    describe('getHearingIdOrCreateHearing', () => {
        let getHearingIdOrCreateHearing

        beforeEach(() => {
            getHearingIdOrCreateHearing = route.getHearingIdOrCreateHearing
        })

        it('should expose function', () => {
            expect(getHearingIdOrCreateHearing).to.be.ok
        })
    })
})
