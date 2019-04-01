import * as chai from 'chai'
import { expect } from 'chai'
import 'mocha'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import refCaselistFilters from '../lib/config/refCaselistFilters'
import * as filters from './filters'
import { filterByCaseTypeAndRole, filterCaseListsByRoles } from './filters'

chai.use(sinonChai)

describe('filters', () => {
    describe('filterByCaseTypeAndRole', () => {

        beforeEach(() => {
            sinon.stub(filters, 'filterCaseListsByRoles').callsFake(() => {
                return refCaselistFilters
            })
        })

        afterEach(() => {
            sinon.restore()
        })

        it('Should default to filtering by judge if no specific role found', () => {
            const userDetails = { id: 1, name: 'John Doe', roles: [1, 2, 3] }
            const result = filterByCaseTypeAndRole(userDetails)
            expect(result).to.be.an('array')
            expect(result).to.be.have.length(3)
        })
        it('Should return specific filters for given role', () => {
            const userDetails = { id: 1, name: 'John Doe', roles: ['caseworker-sscs-panelmember', 2, 3] }
            const result = filterByCaseTypeAndRole(userDetails)
            expect(result).to.be.an('array')
            expect(result).to.be.have.length(6)
        })
    })

    describe('filterCaseListsByRoles', () => {
        it('should filter the caseListFilters based on roles', () => {

            const caseListFilters = [
                {
                    accessRoles: ['caseworker-sscs-judge', 'caseworker-sscs-panelmember'],
                    caseType: 'Benefit',
                    filter: '&state=appealCreated&case.appeal.benefitType.code=PIP',
                    jur: 'SSCS',
                },
                {
                    accessRoles: ['caseworker-divorce-judge'],
                    caseType: 'DIVORCE',
                    filter: '',
                    jur: 'DIVORCE',
                },
            ]

            const roles = ['caseworker-divorce-judge']

            expect(filterCaseListsByRoles(caseListFilters, roles))
                .to.deep.equal(caseListFilters.filter(caseList => caseList.caseType === 'DIVORCE'))
        })
    })
})
