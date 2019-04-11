import * as chai from 'chai'
import { expect } from 'chai'
import 'mocha'
import * as sinonChai from 'sinon-chai'


import {CASE_RECEIVED_DATE} from './case-list-spec-data';

chai.use(sinonChai)
describe('Case Data', () => {
   it('should have divorce data', () => {
       expect(CASE_RECEIVED_DATE).to.be.an('undefined')
   })

});

