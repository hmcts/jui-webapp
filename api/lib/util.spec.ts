import * as chai from 'chai'
import {expect} from 'chai'
import 'mocha'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import {mockReq, mockRes} from 'sinon-express-mock'

chai.use(sinonChai)

import {dotNotation, isObject, shorten, some, valueOrNull} from './util'

describe('util', () => {
    describe('isObject', () => {
        it('Should return true if object is passed', () => {
            const anObject = {k: 'v'}
            const result = isObject(anObject)
            expect(result).to.equal(true)
        })
        it('Should return false if array is passed', () => {
            const result = isObject(['k', 'v'])
            expect(result).to.equal(false)
        })
        it('Should return false if string is passed', () => {
            const result = isObject('hello')
            expect(result).to.equal(false)
        })
        it('Should return false if null is passed', () => {
            const result = isObject(null)
            expect(result).to.equal(false)
        })
    })
    describe('shorten', () => {
        it('Should return shortened string with suffixed ellipses if string is longer than maxLen', () => {
            const str = 'qwertyuiop'
            const maxLength = 3
            const result = shorten(str, maxLength)
            expect(result).to.equal('qwe...')
        })
        it('Should return full string if string equals maxLen', () => {
            const str = '123'
            const maxLength = 3
            const result = shorten(str, maxLength)
            expect(result).to.equal('123')
        })
        it('Should return full string if string is less than maxLen', () => {
            const str = '12'
            const maxLength = 3
            const result = shorten(str, maxLength)
            expect(result).to.equal('12')
        })
    })
    describe('dotNotation', () => {
        it('Should replace straight brackets for object key with dot notation', () => {
            const theObject = {key1: {key2: 'hello'}}
            const object = 'theObject\[key1\]\[key2\]'
            const result = dotNotation(object)
            // @todo - verifiy this is desired
            expect(result).to.equal('theObject.key1..key2.')
        })
    })
    describe('valueOrNull', () => {
        it('Should return a value if string is present in object', () => {
            const object = {'a': 'b', 'c': 'd'}
            const nestled = 'a'
            const result = valueOrNull(object, nestled)
            expect(result).to.equal('b')
        })
        it('Should return null if string is not present in object', () => {
            const object = {'a': 'b', 'c': 'd'}
            const nestled = 'z'
            const result = valueOrNull(object, nestled)
            expect(result).to.equal(null)
        })
    })
    describe('some', () => {
        it('Should return true if predicate matches array value', () => {
            const array = [{1: 0}, {1: 1}]
            const predicate = x => {
                if (x[1] === 1) {
                    return true
                }
                return false
            }
            const result = some(array, predicate)
            expect(result).to.equal(true)
        })
        it('Should return null if predicate does not match array value', () => {
            const array = [{1: 0}, {1: 2}]
            const predicate = x => {
                if (x[1] === 1) {
                    return true
                }
                return false
            }
            const result = some(array, predicate)
            expect(result).to.equal(null)
        })
    })
})
