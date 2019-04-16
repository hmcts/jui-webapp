import * as chai from 'chai'
import 'mocha'
import { expect } from 'chai'
import * as sinonChai from 'sinon-chai'
import * as errorConstants from './errorConstants'

chai.use(sinonChai)

describe('Error Constants', () => {
    it('should have error constants', () => {
        expect(errorConstants.ERROR_UNABLE_TO_GET_EVENT_TOKEN).to.exist;
        expect(errorConstants.ERROR_UNABLE_TO_POST_CASE).to.exist;
        expect(errorConstants.ERROR_UNABLE_TO_UPLOAD_DOCUMENT).to.exist;
        expect(errorConstants.ERROR_USER_HAS_NO_MATCHING_ACCESS_ROLE).to.exist;
    })
})


