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

import {config} from '../../../config'

const url = config.services.ccd_data_api

describe('ccd-store spec', () => {
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

        route = proxyquire('./ccd-store.ts', {
            '../../lib/http': httpRequest,
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

    //     // it('should make a request', () => {
    //     //     getHealth()
    //     //     expect(httpRequest).to.have.been.calledWith('GET', `${url}/health`)
    //     // })
    // })

    describe('getInfo', () => {
        let getInfo

        // beforeEach(() => {
        //     getInfo = route.getInfo
        // })

        // it('should expose function', () => {
        //     expect(getInfo).to.be.ok
        // })

        // it('should make a request', () => {
        //     getInfo({})
        //     expect(httpRequest).to.have.been.calledWith('GET', `${url}/info`, {})
        // })
    })

    describe('getCCDCase', () => {
        let getCCDCase

        // beforeEach(() => {
        //     getCCDCase = route.getCCDCase
        // })

        // it('should expose function', () => {
        //     expect(getCCDCase).to.be.ok
        // })
    })

    describe('postCCDCase', () => {
        let postCCDCase

        beforeEach(() => {
            postCCDCase = route.postCCDCase
        })

        it('should expose function',   () => {
            expect( postCCDCase).to.be.ok
        })
    })

    describe('getCCDCases', () => {
        let getCCDCases

        beforeEach(() => {
            getCCDCases = route.getCCDCases
        })

        it('should expose function', () => {
            expect(getCCDCases).to.be.ok
        })
    })

    describe('getCCDEvents', () => {
        let getCCDEvents

        beforeEach(() => {
            getCCDEvents = route.getCCDEvents
        })

        it('should expose function', () => {
            expect(getCCDEvents).to.be.ok
        })
    })

    describe('getMutiJudCCDCases', () => {
        let getMutiJudCCDCases

        beforeEach(() => {
            getMutiJudCCDCases = route.getMutiJudCCDCases
        })

        it('should expose function', () => {
            expect(getMutiJudCCDCases).to.be.ok
        })
    })

    describe('getCCDEventToken', () => {
        let getCCDEventToken

        beforeEach(() => {
            getCCDEventToken = route.getCCDEventToken
        })

        it('should expose function', () => {
            expect(getCCDEventToken).to.be.ok
        })
    })

    describe('getCCDEventTokenWithoutCase', () => {
        let getCCDEventTokenWithoutCase

        beforeEach(() => {
            getCCDEventTokenWithoutCase = route.getCCDEventTokenWithoutCase
        })

        it('should expose function', () => {
            expect(getCCDEventTokenWithoutCase).to.be.ok
        })
    })

    describe('getEventTokenAndCase', () => {
        let getEventTokenAndCase

        beforeEach(() => {
            getEventTokenAndCase = route.getEventTokenAndCase
        })

        it('should expose function', () => {
            expect(getEventTokenAndCase).to.be.ok
        })
    })

    describe('postCCDEvent', () => {
        let postCCDEvent

        beforeEach(() => {
            postCCDEvent = route.postCCDEvent
        })

        it('should expose function', () => {
            expect(postCCDEvent).to.be.ok
        })
    })

    describe('postCaseWithEventToken', () => {
        let postCaseWithEventToken

        beforeEach(() => {
            postCaseWithEventToken = route.postCaseWithEventToken
        })

        it('should expose function', () => {
            expect(postCaseWithEventToken).to.be.ok
        })
    })

    describe('createCase', () => {
        let createCase

        beforeEach(() => {
            createCase = route.createCase
        })

        it('should expose function', () => {
            expect(createCase).to.be.ok
        })
    })

    describe('updateCase', () => {
        let updateCase

        beforeEach(() => {
            updateCase = route.updateCase
        })

        it('should expose function', () => {
            expect(updateCase).to.be.ok
        })
    })
})
