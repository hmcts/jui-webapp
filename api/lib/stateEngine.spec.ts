import * as chai from 'chai'
import {expect} from 'chai'
import * as log4js from 'log4js'
import 'mocha'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'

chai.use(sinonChai)

import {handleCondition, handleState} from './stateEngine'
import * as util from './util'

describe('stateEngine', () => {
    describe('handleCondition', () => {
        it('Should return null if variable key does not match conditionNode key', () => {
            const conditionNode = {
                condition: [
                    {condition1: 1},
                ],
            }
            const variables = []
            const result = handleCondition(conditionNode, variables)
            expect(result).to.equal(null)
        })
        it('Should return a result if variable key does match conditionNode key', () => {
            const conditionNode = {
                condition: [
                    {1: 'condition1'},
                ], result: 'result',
            }
            const variables = {1: 'condition1'}
            const result = handleCondition(conditionNode, variables)
            expect(result).to.equal('result')
        })
    })
    describe('handleState', () => {
        it('Should return null if stateNode has no properties', () => {
            const stateNode = {}
            const variables = []
            const result = handleState(stateNode, variables)
            expect(result).to.equal(null)
        })
        it('Should return with handleCondition if stateNode containing condition is passed', () => {
            const stateNode = {
                condition: [
                    {1: 'condition1'},
                ],
            }
            const variables = []
            const result = handleState(stateNode, variables)
            expect(result).to.equal(null)
        })
        it('Should return with some() if stateNode containing conditions is passed', () => {
            const stateNode = {
                conditions: [
                    {
                        condition: [
                            {1: 'condition1'},
                        ],
                    },
                    {
                        condition: [
                            {2: 'condition2'},
                        ],
                    },
                ],
                state: 2,
            }
            const spySome = sinon.spy(util, 'some')
            const variables = []
            const result = handleState(stateNode, variables)
            expect(result).to.equal(null)
            expect(spySome).to.be.called
        })
        it('Should return with stateNode.result if stateNode.result is passed', () => {
            const stateNode = {
                result: 1,
                state: 2,
            }
            const variables = []
            const result = handleState(stateNode, variables)
            expect(result).to.equal(stateNode.result)
        })
    })
})
