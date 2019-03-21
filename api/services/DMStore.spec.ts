import * as chai from 'chai'
import { expect } from 'chai'
import 'mocha'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import { mockReq, mockRes } from 'sinon-express-mock'
chai.use(sinonChai)

import { http } from '../lib/http'
import * as DMStore from './DMStore'

import { config } from '../../config'

describe('DMStore', () => {
    const res = {
        data: 'okay',
    }

    const url = config.services.dm_store_api

    // let spy: any
    let spyDelete: any
    let spyPost: any
    let spyPut: any

    beforeEach(() => {
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
        // spy.restore()
        spyPost.restore()
        spyPut.restore()
        spyDelete.restore()
    })

    describe('getDocument()', () => {

        const documentId = 'document Id'

        it('Should make a http.get call based on the document Id', async () => {

            const spy = sinon.stub(http, 'get').resolves(res)

            await DMStore.getDocument(documentId)
            expect(spy).to.be.calledWith(`${url}/documents/${documentId}`)

            spy.restore()
        })

        it('Should return the data property of the return of a http.get call', async () => {

            const spy = sinon.stub(http, 'get').resolves(res)

            expect(await DMStore.getDocument(documentId)).to.equal('okay')

            spy.restore()
        })

        /**
         * Error Condition if asyncReturnOrError returns a null.
         */
        it('should return null if asyncReturnOrError returns null', async () => {

            const spy = sinon.stub(http, 'get').resolves(null)

            expect(await DMStore.getDocument(documentId)).to.equal(null)

            spy.restore()
        })
    })

    // describe('getHearingByCase', () => {
    //     it('Should make a http.get call based on the casee Id', async () => {
    //         await cohQA.getHearingByCase('test')
    //         expect(spy).to.be.calledWith(`${url}/continuous-online-hearings?case_id=test`)
    //     })
    //     it('Should return the data property of the return ofa http.get call', async () => {
    //         expect(await cohQA.getHearingByCase('test')).to.equal('okay')
    //     })
    // })
    //
    // describe('getQuestions', () => {
    //     it('Should make a http.get call based on the hearing Id', async () => {
    //         await cohQA.getQuestions('test')
    //         expect(spy).to.be.calledWith(`${url}/continuous-online-hearings/test/questions`)
    //     })
    //     it('Should return the data property of the return ofa http.get call', async () => {
    //         expect(await cohQA.getQuestions('test')).to.equal('okay')
    //     })
    // })
    //
    // describe('postQuestion', () => {
    //     it('Should make a http.post call based on the hearing Id and given payload', async () => {
    //         await cohQA.postQuestion('test', 'body')
    //         expect(spyPost).to.be.calledWith(`${url}/continuous-online-hearings/test/questions`, 'body')
    //     })
    //     it('Should return the data property of the return ofa http.get call', async () => {
    //         expect(await cohQA.postQuestion('test', 'body')).to.equal('okay')
    //     })
    // })
    //
    // describe('getQuestion', () => {
    //     it('Should make a http.get call based on the hearing Id, question id', async () => {
    //         await cohQA.getQuestion('test', 'test2', {})
    //         expect(spy).to.be.calledWith(`${url}/continuous-online-hearings/test/questions/test2`, {})
    //     })
    //     it('Should return the data property of the return ofa http.get call', async () => {
    //         expect(await cohQA.getQuestion('test', 'test2', {})).to.equal('okay')
    //     })
    // })
    //
    // describe('putQuestion', () => {
    //     it('Should make a http.put call based on the hearing Id, question id', async () => {
    //         await cohQA.putQuestion('test', 'test2', {})
    //         expect(spyPut).to.be.calledWith(`${url}/continuous-online-hearings/test/questions/test2`, {})
    //     })
    // })
    //
    // describe('deleteQuestion', () => {
    //     it('Should make a http.get call based on the hearing Id, question id', async () => {
    //         await cohQA.deleteQuestion('test', 'test2')
    //         expect(spyDelete).to.be.calledWith(`${url}/continuous-online-hearings/test/questions/test2`)
    //     })
    //     it('Should return the data property of the return ofa http.get call', async () => {
    //         expect(await cohQA.deleteQuestion('test', 'test2')).to.equal('okay')
    //     })
    // })
    //
    // describe('getAnswers', () => {
    //     it('Should make a http.get call based on the hearing Id, question id', async () => {
    //         await cohQA.getAnswers('test', 'test2')
    //         expect(spy).to.be.calledWith(`${url}/continuous-online-hearings/test/questions/test2/answers`)
    //     })
    //     it('Should return the data property of the return ofa http.get call', async () => {
    //         expect(await cohQA.getAnswers('test', 'test2')).to.equal('okay')
    //     })
    // })

})
