import { expect } from 'chai'
import 'mocha'
import * as sinon from 'sinon'
import { mockReq, mockRes } from 'sinon-express-mock'
import { http } from '../lib/http'
import * as serviceAuth from './serviceAuth'

import { config } from '../../config'

describe('serviceAuth', () => {

    let res

    const url = config.services.s2s
    const microservice = config.microservice
    const s2sSecret = process.env.S2S_SECRET || 'AAAAAAAAAAAAAAAA'

    let spy: any
    let spyPost: any

    beforeEach(() => {

        res = {
            data: 'okay',
        }

        spyPost = sinon.stub(http, 'post').callsFake(() => {
            return Promise.resolve(res)
        })
    })

    afterEach(() => {

        //spy.restore()
        spyPost.restore()
    })

    describe('service Auth', async () => {

        it('Should make a http.post call ', async () => {

            const request = mockReq({})
            const response = mockRes({})

            await serviceAuth.postS2SLease()
            //{ microservice: "jui_webapp", oneTimePassword: "952643" }
            console.log('@@@', `${url}/api/lease`)
            //expect(spyPost).to.be.calledWith(`${url}/api/lease`, { microservice: "jui_webapp", oneTimePassword: "952643" })

            expect(await serviceAuth.postS2SLease()).to.equal('okay')
            expect(spyPost).to.be.calledWith(`${url}/api/lease`, { microservice: "jui_webapp", oneTimePassword: "343008" })

        })
    })

})
