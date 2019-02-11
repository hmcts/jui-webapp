import * as chai from 'chai'
import {expect} from 'chai'
import 'mocha'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'

chai.use(sinonChai)

import * as ccdStore from '../../services/ccd-store-api/ccd-store'
import {combineLists, getMutiJudCaseRaw, getMutiJudCaseRawCoh, sortCases, sortTransformedCases} from './index'

describe('index', () => {
    describe('getMutiJudCaseRaw', () => {
        it('Should return caseLists array', async () => {
            const userDetails = {id: 1, name: 'John Doe', roles: [1, 2, 3]}
            const stub = sinon.stub(ccdStore, 'getMutiJudCCDCases')
            stub.returns([1, 2, 3])
            const result = await getMutiJudCaseRaw(userDetails)
            expect(stub).to.be.called
            expect(result).to.be.an('array')
            stub.restore()
        })
    })
    describe('combineLists', () => {
        it('Should return concatenated array', () => {
            const lists = [[1, 2], [3, 4]]
            const result = combineLists(lists)
            expect(result).to.be.an('array')
            expect(result).to.eql([1, 2, 3, 4])
        })
    })
    describe('sortTransformedCases', () => {
        it('Should return array of cases sorted by lastModified', () => {
            const results = [
                {id: 1, case_fields: {lastModified: 1549899256}},
                {id: 2, case_fields: {lastModified: 1549899156}},
                {id: 3, case_fields: {lastModified: 1549899216}},
            ]
            const result = sortTransformedCases(results)
            expect(result).to.be.an('array')
            expect(result[0].id).to.equal(2)
            expect(result[1].id).to.equal(3)
            expect(result[2].id).to.equal(1)
        })
    })
    describe('sortCases', () => {
        it('Should return array of cases sorted by lastModified', () => {
            const results = [
                {id: 1, last_modified: 1549899256},
                {id: 2, last_modified: 1549899156},
                {id: 3, last_modified: 1549899216},
            ]
            const result = sortCases(results)
            expect(result).to.be.an('array')
            expect(result[0].id).to.equal(2)
            expect(result[1].id).to.equal(3)
            expect(result[2].id).to.equal(1)
        })
    })
})
