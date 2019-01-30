import {expect} from 'chai'
import * as sinon from 'sinon'
import * as ccdDataStoreApiUtilities from './ccdDataStoreApiUtilities'
import * as ccdStore from '../../services/ccd-store-api/ccd-store'

describe('Ccd Data Store Utilities', () => {

    it('Should make a call to get the Event Token from the CCD Store Api.', () => {

        const userId = '42'
        const caseId = '1548761902417900'
        const jurisdiction = 'DIVORCE'
        const caseType = 'FinancialRemedyMVP2'
        const eventId = 'FR_uploadDocument'

        const sandbox = sinon.createSandbox()
        sandbox.stub(ccdStore, 'getEventTokenAndCase').resolves({token: 'eyJhbGciOiJIUzI1NiJ9...'})

        ccdDataStoreApiUtilities.getEventToken(userId, caseId, jurisdiction, caseType, eventId)

        expect(ccdStore.getEventTokenAndCase).to.be.calledWith(userId, jurisdiction, caseType, caseId, eventId)
    })

    /**
     * @see ccdDataStoreApiPayloads.ts for payload data.
     */
    it('Should make a call to post a case update to the CCD Store Api.', () => {

        const userId = '42'
        const caseId = '1548761902417900'
        const jurisdiction = 'DIVORCE'
        const caseType = 'FinancialRemedyMVP2'
        const payload = {
            data: {
                uploadDocuments: [],
            },
            event: {
                id: 'FR_uploadDocument',
            },
            event_token: 'eyJhbGciOiJIUz...',
            ignore_warning: true,
        }

        const sandbox = sinon.createSandbox()
        sandbox.stub(ccdStore, 'postCaseWithEventToken').resolves()

        ccdDataStoreApiUtilities.postCase(userId, caseId, jurisdiction, caseType, payload)

        expect(ccdStore.postCaseWithEventToken).to.be.calledWith(userId, jurisdiction, caseType, caseId, payload)
    })
})
