import * as chai from 'chai';
import {expect} from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import {getTotalPages} from './pagination';

chai.use(sinonChai);

describe('pagination', () => {

    const reducer = (accumulator, currentValue) => {
        return accumulator + currentValue;
    }

    const getPageCountForEachCaseSet = paginationMetadata => paginationMetadata.map(
        paginationResultForCaseSet => paginationResultForCaseSet.total_pages_count)

    const expectedGetTotalPages = paginationMetadataForCaseSets => {

        const totalPagesCount = getPageCountForEachCaseSet(paginationMetadataForCaseSets)

        return totalPagesCount.reduce(reducer);
    }

    describe('should return the concatenated result of the total pages', () => {

        const paginationMetadata = [
            {total_results_count: 0, total_pages_count: 0},
            {total_results_count: 255, total_pages_count: 13},
        ];

        expect(getTotalPages(paginationMetadata)).to.equal(expectedGetTotalPages(paginationMetadata));
    });
});
