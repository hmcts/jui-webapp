import * as chai from 'chai'
import {expect} from 'chai'
import 'mocha'
import * as sinonChai from 'sinon-chai'
import {mockReq, mockRes} from 'sinon-express-mock'

chai.use(sinonChai)

import {filterByCaseTypeAndRole} from './filters'

describe('filters', () => {
    describe('filterByCaseTypeAndRole', () => {
        it('Should default to filtering by judge if no specific role found', () => {
            const userDetails = {id: 1, name: 'John Doe', roles: [1, 2, 3]}
            const result = filterByCaseTypeAndRole(userDetails)
            expect(result).to.be.an('array')
            expect(result).to.be.have.length(3)
        })
        it('Should return specific filters for given role', () => {
            const userDetails = {id: 1, name: 'John Doe', roles: ['caseworker-sscs-panelmember', 2, 3]}
            const result = filterByCaseTypeAndRole(userDetails)
            expect(result).to.be.an('array')
            expect(result).to.be.have.length(6)
        })
    })
})
