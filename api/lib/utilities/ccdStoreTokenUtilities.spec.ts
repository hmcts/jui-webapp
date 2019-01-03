const ccdStoreTokenUtilities = require('./ccdStoreTokenUtilities')

describe('eventTokenUtilities', () => {

    it('Should return', () => {
        expect(ccdStoreTokenUtilities.getEventTokenAndCase()).toEqual(false)
    })
})
