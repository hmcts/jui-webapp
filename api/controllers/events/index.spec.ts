import * as chai from 'chai'
import {expect} from 'chai'
import 'mocha'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import {mockReq, mockRes} from 'sinon-express-mock'
const moment = require('moment')

chai.use(sinonChai)

import * as eventFile from './index'

describe('controller / events', () => {
    const res = {
        data: 'okay',
    }

    // let spy: any
    // let spyDelete: any
    // let spyPost: any
    // let spyPatch: any

    // beforeEach(() => {
    //
    //     spy = sinon.stub(http, 'get').resolves(res)
    //     spyPost = sinon.stub(http, 'post').resolves(res)
    //     spyPatch = sinon.stub(http, 'patch').resolves(res)
    //     spyDelete = sinon.stub(http, 'delete').resolves(res)
    // })
    //
    // afterEach(() => {
    //
    //     spy.restore()
    //     spyPost.restore()
    //     spyPatch.restore()
    //     spyDelete.restore()
    // })

    describe('hasCOR()', () => {

        it('Should return true if jurisdiction matches SSCS', async () => {

            const jurisdiction = 'SSCS'

            expect(eventFile.hasCOR(jurisdiction)).to.be.true
        })

        it('Should return false if jurisdiction does not match SSCS', async () => {

            const jurisdiction = 'FR'

            expect(eventFile.hasCOR(jurisdiction)).to.be.false
        })
    })

    describe('convertDateTime()', () => {

        it('Should return true if jurisdiction matches SSCS', async () => {

            const dateObj = new Date(946684800)

            const conDateTime = moment(dateObj)
            const dateUtc = conDateTime.utc().format()
            const date = conDateTime.format('D MMMM YYYY')
            const time = conDateTime.format('h:mma')

            expect(eventFile.convertDateTime(dateObj)).to.deep.equal({
                dateUtc,
                date,
                time
            })
        })
    })
})
