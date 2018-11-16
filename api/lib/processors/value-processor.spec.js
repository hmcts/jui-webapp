const proxyquire = require('proxyquire')

describe('Value Processor Helper', () => {
    let sampleObject = {}
    const documentProcessorSpy = jasmine.createSpy()
    const valueProcessor = proxyquire('./value-processor', { './document-processor': documentProcessorSpy })

    beforeEach(() => {
        sampleObject = {
            simpleField1: 'simpleField1',
            simpleField2: 'simpleField2',
            complexField1: { simpleField3: 'simpleField3' },
            complexField2: { complexField3: { simpleField4: 'simpleField4' } }
        }
    })

    describe('simple values', () => {
        it('should get lookup value if value is a lookup', () => {
            expect(valueProcessor('$.simpleField1', sampleObject)).toEqual('simpleField1')
            expect(valueProcessor('$.complexField1.simpleField3', sampleObject)).toEqual('simpleField3')
        })

        it('should return value if a hardcoded value', () => {
            expect(valueProcessor('bob', sampleObject)).toEqual('bob')
        })
    })

    describe('array values', () => {
        it('should process all array values and concatonate', () => {
            expect(valueProcessor(['$.simpleField1', ' ', '$.simpleField2'], sampleObject)).toEqual('simpleField1 simpleField2')
        })

        it('should be able to combine lookups and hard values', () => {
            expect(valueProcessor(['$.simpleField1', ' ', 'one', ' ', '$.simpleField2', ' ', 'two'], sampleObject)).toEqual('simpleField1 one simpleField2 two')
        })
    })

    describe('processor values', () => {
        it('should call the relevant processor with value(s)', () => {
            valueProcessor(['$.simpleField1|document_processor'], sampleObject)
            expect(documentProcessorSpy).toHaveBeenCalledWith('simpleField1', sampleObject)
        })
    })
})
