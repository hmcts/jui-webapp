import { expect } from 'chai'
import 'mocha'
import * as sinon from 'sinon'

import { http } from '../lib/http'
import * as emNpa from './emNpa'

import { config } from '../../config'

describe('emNpa', () => {

    let res

    const url = config.services.em_npa_api

    let spyPost: any

    beforeEach(() => {

        res = {
            data: 'okay',
        }

        spyPost = sinon.stub(http, 'post').resolves(res)
    })

    afterEach(() => {

        spyPost.restore()
    })

    describe('emNpa', () => {

        it('Should make a post call to get the document tasks', async () => {

            const body = {}
            await emNpa.createNpaTask(body)
            expect(spyPost).to.be.calledWith(`${url}/api/document-tasks`)
        })
    })

})
