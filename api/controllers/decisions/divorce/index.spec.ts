import * as chai from 'chai'
import { expect } from 'chai'
import 'mocha'
import * as moment from 'moment'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import { mockReq, mockRes } from 'sinon-express-mock'
import * as headerUtilities from '../../../lib/utilities/headerUtilities'
import * as divorce from './index'
import * as translateJson from './translate'

chai.use(sinonChai)

describe('Decisions - Divorce', () => {

    let sandbox

    beforeEach(() => {
        sandbox = sinon.createSandbox()
    })

    afterEach(() => {
        sandbox.restore()
    })

    it('should call getAuthHeaders on getOptions', () => {
        sandbox.stub(headerUtilities, 'getAuthHeaders')
        const req = {}
        divorce.getOptions(req)
        expect(headerUtilities.getAuthHeaders).to.have.been.calledWith(req)
    })

    it('should return a data object for CCD on prepareCaseForApproval', () => {

        const store = {
            notesForAdmin: 'test note',
        }
        const momentFormat = 'YYYY-MM-DD'
        const orderDirection = 'Order Accepted as drafted'
        const orderDirectionJudge = 'District Judge'
        const user = { forename: 'Test', surname: 'User' }
        const orderDirectionJudgeName = `${user.forename} ${user.surname} `
        const eventId = 'eventId'
        const eventToken = 'token'

        sandbox.stub(moment.fn, 'format').callsFake(() => momentFormat)

        const result = divorce.prepareCaseForApproval(eventToken, eventId, user, store)

        // test data
        expect(result).to.nested.include({ 'data.orderDirection': orderDirection })
        expect(result).to.nested.include({ 'data.orderDirectionAddComments': store.notesForAdmin })
        expect(result).to.nested.include({ 'data.orderDirectionDate': momentFormat })
        expect(result).to.nested.include({ 'data.orderDirectionJudge': orderDirectionJudge })
        expect(result).to.nested.include({ 'data.orderDirectionJudgeName': orderDirectionJudgeName })

        // test event
        expect(result).to.nested.include({ 'event.id': eventId })

        // test event_token
        expect(result).to.nested.include({ 'event_token': eventToken })

        // test ignore_warning
        expect(result).to.nested.include({ 'ignore_warning': true })

    })

    it('should perform a lookup upon translate if field exists in store', () => {
        const fieldName = Object.keys(translateJson.lookup).pop()
        const result = divorce.translate(translateJson.lookup, fieldName)
        expect(result).to.equals(translateJson.lookup[fieldName])
    })

    it('should return null upon translate if field doesn\'t exist in store', () => {
        const fieldName = 'test'
        expect(translateJson.lookup[fieldName]).to.be.undefined
        const result = divorce.translate(translateJson.lookup, fieldName)
        expect(result).to.be.null
    })
})
