import * as chai from 'chai';
import {expect} from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import {mockReq, mockRes} from 'sinon-express-mock';

chai.use(sinonChai);

import * as coh from './coh';
import {http} from '../lib/http';
import {config} from '../../config';
import {url} from './coh';

describe('Assign Case', () => {

    const res = {
        data: 'okay',
    };

    // let spy: any;
    // let spyDelete: any;
    // let spyPost: any;
    // let spyPatch: any;

    beforeEach(() => {

        // spy = sinon.stub(http, 'get').resolves(res);
        // spyPost = sinon.stub(http, 'post').resolves(res);
        // spyPatch = sinon.stub(http, 'patch').resolves(res);
        // spyDelete = sinon.stub(http, 'delete').resolves(res);
    });

    afterEach(() => {

        // spy.restore();
        // spyPost.restore();
        // spyPatch.restore();
        // spyDelete.restore();
    });

    // describe('sortCasesByLastModifiedDate', () => {
    //
    //     const results = [{
    //
    //     }]
    //
    //     it('Should sort the cases by the last modified date.', async () => {
    //
    //         // await assignCase.unassignFromJudge(userId, caseData)
    //
    //         expect(true).to.equal(false)
    //         // expect(spy).to.be.calledWith(`${url}/documents/${documentId}`);
    //     })
    // })

    let spy: any;

    const url = config.services.coh_cor_api;

    /**
     * Note that I don't know why the following logic is happening in getAssignEventId() as the unit test
     * was written way past the point of when the function was developed.
     */
    describe('getHearingByCase', () => {

        it('Should take in the caseId and make a call to get the hearing.', async () => {

            const caseId = '42'

            spy = sinon.stub(http, 'get').resolves(res)

            coh.getHearingByCase(caseId)

            expect(spy).to.be.calledWith(`${url}/continuous-online-hearings?case_id=${caseId}`)

            spy.restore()
        });

        it('Should return the data property of the return of a http.get call', async () => {

            spy = sinon.stub(http, 'get').resolves(res)

            const caseId = '42'

            expect(await coh.getHearingByCase(caseId)).to.equal('okay')

            spy.restore()
        })
    })

    describe('createHearing', () => {

        // TODO: Not working.
        xit('Should take in the caseId, userId, jurisdictionId and make a call to post the hearing.', async () => {

            const caseId = 'caseId'
            const userId = 'userId'
            const jurisdictionId = 'jurisdictionId'

            const spyPost = sinon.stub(http, 'post').resolves(res)

            coh.createHearing(caseId, userId, jurisdictionId)

            expect(spyPost).to.be.calledWith(`${url}/continuous-online-hearings`, {
                case_id: caseId,
                userId,
                jurisdiction: jurisdictionId,
                panel: [{ identity_token: 'string', name: userId }],
                start_date: new Date().toISOString(),
            })

            spyPost.restore()
        })
    })

    // TODO: Working through.
    xdescribe('getEvents', () => {

        it('Should take in the caseId, userId, jurisdictionId and make a call to post the hearing.', async () => {

            const caseId = 'caseId'
            const userId = 'userId'
            const hearingId = 'hearingId'

            spy = sinon.stub(http, 'get').resolves(res)

            coh.getEvents(caseId, userId)

            expect(spy).to.be.calledWith(`${url}/continuous-online-hearings/${hearingId}/conversations`)

            spy.restore()
        })
    })

    describe('getDecision', () => {

        it('Should take in the hearingId and make a call to get the decision.', async () => {

            const hearingId = '42'

            spy = sinon.stub(http, 'get').resolves(res)

            coh.getDecision(hearingId)

            expect(spy).to.be.calledWith(`${url}/continuous-online-hearings/${hearingId}/decisions`)

            spy.restore()
        });

        it('Should return the data property of the return of a http.get call', async () => {

            spy = sinon.stub(http, 'get').resolves(res)

            const hearingId = '42'

            expect(await coh.getDecision(hearingId)).to.equal('okay')

            spy.restore()
        })
    })

    describe('createDecision', () => {

        it('Should take in the hearingId and make a call to post the decision.', async () => {

            const hearingId = '42'

            spy = sinon.stub(http, 'post').resolves(res)

            coh.createDecision(hearingId)

            expect(spy).to.be.calledWith(`${url}/continuous-online-hearings/${hearingId}/decisions`,
                {
                    decision_award: 'n/a',
                    decision_header: 'n/a',
                    decision_reason: 'n/a',
                    decision_text: 'n/a',
                })

            spy.restore()
        })
    })
})
