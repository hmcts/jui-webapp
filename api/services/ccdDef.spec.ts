import { expect } from 'chai'
import 'mocha'
import * as sinon from 'sinon'

import { http } from '../lib/http'
import * as ccdDef from './ccdDef'

import { config } from '../../config'

describe('ccdDef', () => {

    let res

    const url = config.services.ccd_def_api

    let spy: any

    beforeEach(() => {

        res = {
            data: 'okay',
        }

        spy = sinon.stub(http, 'get').resolves(res)
    })

    afterEach(() => {

        spy.restore()
    })

    describe('ccdDef', () => {

        it('Should make a get call to get the jurisdictions', async () => {

            const body = {}
            await ccdDef.getJurisdictions()
            expect(spy).to.be.calledWith(`${url}/api/data/jurisdictions`)
        })
    })

})
