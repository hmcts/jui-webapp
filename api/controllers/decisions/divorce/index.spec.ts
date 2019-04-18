/* tslint:disable:no-unused-expression no-var-requires */
import * as chai from 'chai'
import { expect } from 'chai'
import 'mocha'
import * as moment from 'moment'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import { mockReq, mockRes } from 'sinon-express-mock'
import { config } from '../../../../config'
import * as log4jui from '../../../lib/log4jui'
import * as headerUtilities from '../../../lib/utilities/headerUtilities'
import * as divorce from './index'
import * as translateJson from './translate'

const ccdStore = require('../../../services/ccd-store-api/ccd-store')

chai.use(sinonChai)
describe('Decisions - Divorce', () => {

    let sandbox
    const logger = { info: sinon.spy(), error: sinon.spy() }
    const reqParams = {
        auth: {
            userId: 1,
        },
        params: {
            caseId: 1,
            caseTypeId: 1,
            jurId: 1,
            stateId: 1,
        },
    }
    const req = mockReq(reqParams)
    const state = {
        caseId: reqParams.params.caseId,
        caseTypeId: reqParams.params.caseTypeId,
        jurisdiction: reqParams.params.jurId,
        stateId: reqParams.params.stateId,
    }
    const res = mockRes()
    const store = {
        approveDraftConsent: 'yes',
        documentAnnotationId: 'annotationId',
        notesForAdmin: 'test note',
    }

    beforeEach(() => {
        sandbox = sinon.createSandbox()
        sandbox.stub(log4jui, 'getLogger').returns(logger)
    })

    afterEach(() => {
        sandbox.restore()
    })

    it('getOptions should call getAuthHeaders', () => {
        sandbox.stub(headerUtilities, 'getAuthHeaders')
        divorce.getOptions(req)
        expect(headerUtilities.getAuthHeaders).to.have.been.calledWith(req)
    })

    it('prepareCaseForApproval should return a data object for CCD', () => {
        const user = { forename: 'Test', surname: 'User' }

        const caseForApproval = {
            data: {
                orderDirection: 'Order Accepted as drafted',
                orderDirectionAddComments: store.notesForAdmin,
                orderDirectionDate: 'YYYY-MM-DD',
                orderDirectionJudge: 'District Judge',
                orderDirectionJudgeName: `${user.forename} ${user.surname} `
            },
            event: {
                id: 'eventId',
            },
            event_token: 'token',

            ignore_warning: true,
        }

        sandbox.stub(moment.fn, 'format').callsFake(() => 'YYYY-MM-DD')

        const result = divorce.prepareCaseForApproval(caseForApproval.event_token, caseForApproval.event.id, user, store)

        expect(result).to.deep.equal(caseForApproval)

    })

    describe('translate', () => {
        it('should perform a lookup if field exists in store', () => {
            const fieldName = Object.keys(translateJson.lookup).pop()
            const result = divorce.translate(translateJson.lookup, fieldName)
            expect(result).to.equals(translateJson.lookup[fieldName])
        })

        it('should return null if field doesn\'t exist in store', () => {
            const fieldName = 'test'
            // smoke test in case fieldName does actually exist
            expect(translateJson.lookup[fieldName]).to.be.undefined
            const result = divorce.translate(translateJson.lookup, fieldName)
            expect(result).to.be.null
        })
    })

    describe('prepareCaseForRefusal', () => {

        const user = { forename: 'Test', surname: 'User' }
        let caseForRefusal
        let orderRefusalCollection
        beforeEach(() => {
            sandbox.stub(moment.fn, 'format').callsFake(() => 'YYYY-MM-DD')
            orderRefusalCollection = {
                orderRefusalAddComments: store.notesForAdmin,
                    orderRefusalDate: 'YYYY-MM-DD',
                orderRefusalDocs: {
                document_binary_url:
                    `${config.services.dm_store_api}/documents/${store.documentAnnotationId}/binary`,
                        document_url:
                `${config.services.dm_store_api}/documents/${store.documentAnnotationId}`,
            },
                orderRefusalJudge: 'District Judge',
                    orderRefusalJudgeName: `${user.forename} ${user.surname} `,
            }
            caseForRefusal = {
                data: {
                    orderRefusalCollection,
                },
                event: { id: 'eventId' },
                event_token: 'token',
                ignore_warning: true,
            }
        })

        it('should return default payload', () => {

            const payload = divorce.prepareCaseForRefusal(caseForRefusal.event_token, caseForRefusal.event.id, user, store)

            expect(payload).to.deep.equal(caseForRefusal)
        })

        it('should add hearing details if parties need attend', () => {
            const hearingDetails = {
                estimateLengthOfHearing: 10,
                partiesNeedAttend: true,
                whenHearingPlaced: '01/01/2020',
            }
            const newStore = {...store, ...hearingDetails}
            const payload = divorce.prepareCaseForRefusal(caseForRefusal.event_token, caseForRefusal.event.id, user, newStore)

            caseForRefusal.data.orderRefusalCollection = {...caseForRefusal.data.orderRefusalCollection, ...{
                    estimateLengthOfHearing: 10,
                    whenShouldHearingTakePlace: '01/01/2020',
                },
            }

            expect(payload).to.deep.equal(caseForRefusal)
        })

        it('should ')
    })

    describe('getEventTokenForMakeDecision', () => {

        let result

        beforeEach(() => {
            sandbox.stub(divorce, 'getOptions').returns('getOptionsReturn')
        })

        describe('success', () => {
            beforeEach(() => {
                sandbox.stub(ccdStore, 'getEventTokenAndCase').resolves({
                    token: 'eventToken',
                })
            })

            it('should log the eventToken', async () => {
                result = await divorce.getEventTokenForMakeDecision(store.approveDraftConsent, req, state)
                expect(logger.info).to.have.been.calledWith('Got token eventToken')
            })

            it('should return the eventToken on decision == yes', async () => {
                result = await divorce.getEventTokenForMakeDecision(store.approveDraftConsent, req, state)
                expect(result).to.equals('eventToken')
            })

            it('should return the eventToken on decision == no', async () => {
                result = await divorce.getEventTokenForMakeDecision('no', req, state)
                expect(result).to.equals('eventToken')
            })
        })

        describe('exceptions', () => {
            beforeEach(async () => {
                sandbox.stub(ccdStore, 'getEventTokenAndCase').throws('Invalid token')
                result = await divorce.getEventTokenForMakeDecision(store.approveDraftConsent, req, state)
            })

            it('should log errors on exception', () => {

                expect(logger.info).to.have.been.calledWith('Getting Event Token')
                expect(logger.error).to.have.been.calledWith('Error getting event token')
            })

            it('should return false on exception', () => {

                expect(ccdStore.getEventTokenAndCase).to.have.been.calledWith(
                    reqParams.auth.userId,
                    'DIVORCE',
                    'FinancialRemedyMVP2',
                    state.caseId,
                    'FR_approveApplication',
                    'getOptionsReturn'
                )
                expect(result).to.be.false
            })
        })
    })

    describe('getPayloadDataForMakeDecision', () => {

        const payloadData = {
            data: {},
            event: {
                id: 1,
            },
            event_token: 'token',
            ignore_warning: true,
        }

        beforeEach(() => {
            sandbox.stub(divorce, 'getEventTokenForMakeDecision').resolves({ token: 'test' })
            sandbox.stub(divorce, 'prepareCaseForApproval').returns(payloadData)
            sandbox.stub(divorce, 'prepareCaseForRefusal').returns(payloadData)
        })

        it('should call prepareCaseForApproval if decision is yes', async () => {
            const result = await divorce.getPayloadDataForMakeDecision('yes', req, state, store)
            expect(result).to.deep.equal(payloadData)
            expect(divorce.prepareCaseForApproval).to.have.been.called
        })

        it('should call prepareCaseForRefusal if decision is no', async () => {
            const result = await divorce.getPayloadDataForMakeDecision('no', req, state, store)
            expect(result).to.deep.equal(payloadData)
            expect(divorce.prepareCaseForRefusal).to.have.been.called
        })

    })

    describe('makeDecision', () => {

        beforeEach(() => {
            sandbox.stub(divorce, 'getPayloadDataForMakeDecision').returns({ payload: 'test' })
            sandbox.stub(divorce, 'getOptions').returns(true)
        })

        describe('success', () => {

            it('should make a call to getPayloadDataForMakeDecision', async () => {
                sandbox.stub(ccdStore, 'postCaseWithEventToken').resolves(true)
                const result = await divorce.makeDecision('yes', req, state, store)
                expect(result).to.be.true
                expect(ccdStore.postCaseWithEventToken).to.have.been.called
            })
        })
        describe('exceptions', () => {

            let result

            beforeEach(async () => {
                sandbox.stub(ccdStore, 'postCaseWithEventToken').throws('Invalid token')
                result = await divorce.makeDecision('yes', req, state, store)
            })

            it('should catch any exceptions', () => {
                expect(result).to.be.false
                expect(ccdStore.postCaseWithEventToken).to.have.been.called
            })

            it('should log errors on exception', () => {
                expect(logger.error).to.have.been.calledWith('Error sending event')
            })
        })

    })

    describe('payload.divorce', () => {
        it('should not have a payload', async () => {
            const result = await divorce.payload.divorce()
            expect(result).to.be.undefined
        })
    })

    describe('payload.financialremedymvp2', () => {

        let makeDecisionStub

        beforeEach(() => {
            makeDecisionStub = sandbox.stub(divorce, 'makeDecision').resolves('test')
        })

        it('should log POST call', async () => {
            await divorce.payload.financialremedymvp2(req, res, store)
            expect(logger.info).to.have.been.calledWith('Posting to CCD')
            expect(logger.info).to.have.been.calledWith('Posted to CCD', 'test')
        })

        it('should return decision-confirmation', async () => {
            const result = await divorce.payload.financialremedymvp2(req, res, store)
            expect(divorce.makeDecision).to.have.been.calledWith(store.approveDraftConsent, req, state, store)
            expect(result).to.equals('decision-confirmation')
        })

        it('should set 400 error status and return null if not a valid decision', async () => {

            makeDecisionStub.restore()
            sandbox.stub(divorce, 'makeDecision').resolves(false)

            const result = await divorce.payload.financialremedymvp2(req, res, store)
            expect(result).to.be.null
            expect(res.status).to.be.calledWith(400)
            expect(res.send).to.be.calledWith('Error updating case')
        })
    })
})
