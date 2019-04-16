import * as chai from 'chai'
import { expect } from 'chai'
import 'mocha'
import * as sinonChai from 'sinon-chai'


import {
    assignToJudge,
    combineLists,
    filterAssignedCases,
    generateAssignToJudgeBody,
    getAssignEventId, getNewCase,
    getUnassignEventId,
    sortCasesByLastModifiedDate,
    unassignAllCaseFromJudge,
    unassignFromJudge,
} from './assignCase';

chai.use(sinonChai)
describe('Assign Case', () => {
    describe('helper functions', () => {
        it('shold sort case by last nodified day', () => {
            const array = [
                {
                    lastModified: new Date()
                },
                {
                    lastModified: new Date()
                }
            ];
            const lastModified  = sortCasesByLastModifiedDate(array);
            expect(lastModified).to.be.an('array')
        })

        it('should sort filter an array', () => {
            const cases = [
                {
                    case_data: {
                        assignedToJudge: true
                    }
                }
            ];
            const lastModified  = filterAssignedCases(cases)
            expect(lastModified).to.be.an('array')
        })

        it('should sort case by last modified day', () => {
            const list = [1, 2, 3];
            const combineList  = combineLists(list)
            expect(combineList).to.be.an('array')
        })
    })

    describe('event functions', () => {
        it('should get assign event Id', () => {
            const assignedEventId  = getAssignEventId('jurisdiction', 'divorce')
            expect(assignedEventId).to.exist
            expect(assignedEventId).to.be.an('string')
        })

        it('should un-assign event Id', () => {
            const unAssignedEventId  = getUnassignEventId('jurisdiction', 'divorce')
            expect(unAssignedEventId).to.be.an('string')
            expect(unAssignedEventId).to.exist
        })

        it('should generate assign to judgeBody', () => {
            const judgeBody  = generateAssignToJudgeBody('jurisdiction', 'divorce', '5', '')
            expect(judgeBody).to.exist
            expect(judgeBody).to.be.an('object')
        })

        it('should generate assign to judge', () => {
            const judgeBody  = assignToJudge('5', [])
            expect(judgeBody).to.be.an('undefined')
        })


        it('should unassing all Cases From Judge', () => {
            const judgeBody  = unassignAllCaseFromJudge(5, [])
            expect(judgeBody).to.be.an('array')
        })
    })

    describe('new case', () => {
        it('should return new case ', () => {
            const newCase = getNewCase('5')
            expect(newCase).to.exist;
        })
    })


});

