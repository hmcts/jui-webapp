import * as chai from 'chai'
import { expect } from 'chai'
import 'mocha'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'

import { isAnyCaseViewableByAJudge, isCaseListPopulated } from './case-list-helper'

chai.use(sinonChai)

describe('case list helpers', () => {
    describe('isCaseListAvailable', () => {

        /**
         * The following contains the data structure of the caseList / caseLists
         *
         * Why it is an array within an array - I have no idea, but due to project time
         * scales and where we are at in the project we need to keep it in this structure.
         *
         * [17th April 2019]
         */
        it('Should return true if the case list is populated.', () => {

            const caseList = [ [ { id: 1554974408669103,
                jurisdiction: 'SSCS',
                case_type_id: 'Benefit',
                created_date: '2019-04-11T09:20:08.602',
                last_modified: '2019-04-11T09:30:23.802',
                security_classification: 'PUBLIC',
                case_data: [Object],
                data_classification: [Object],
                after_submit_callback_response: null,
                callback_response_status_code: null,
                callback_response_status: null,
                delete_draft_response_status_code: null,
                delete_draft_response_status: null,
                security_classifications: [Object],
                hearing_data: [Object],
                question_data: [Array] } ] ]

            expect(isCaseListPopulated(caseList)).to.be.true
        })

        it('Should return false if the case list is not populated.', () => {

            const caseList = [ [] ]

            expect(isCaseListPopulated(caseList)).to.be.false
        })
    })

    describe('isAnyCaseViewableByAJudge', () => {

        /**
         * @see case-list/index.ts  caseLists = applyStateFilter(caseLists)
         */
        it('Should return true if the case list is populated, as in ' +
            'all the cases have not been filtered out by applyStateFilter.', () => {

            const caseList = [ [ { id: 1554974408669103,
                jurisdiction: 'SSCS',
                case_type_id: 'Benefit',
                created_date: '2019-04-11T09:20:08.602',
                last_modified: '2019-04-11T09:30:23.802',
                security_classification: 'PUBLIC',
                case_data: [Object],
                data_classification: [Object],
                after_submit_callback_response: null,
                callback_response_status_code: null,
                callback_response_status: null,
                delete_draft_response_status_code: null,
                delete_draft_response_status: null,
                security_classifications: [Object],
                hearing_data: [Object],
                question_data: [Array] } ] ]

            expect(isAnyCaseViewableByAJudge(caseList)).to.be.true
        })

        it('Should return false if the case list is not populated.', () => {

            const caseList = [ [] ]

            expect(isCaseListPopulated(caseList)).to.be.false
        })
    })
})
