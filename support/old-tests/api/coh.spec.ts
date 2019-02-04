import 'mocha'

import * as chai from 'chai'
import {expect} from 'chai'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import {mockReq, mockRes} from 'sinon-express-mock'
chai.use(sinonChai)

import * as coh from './coh'
import {getOrCreateHearing, relistHearing} from './coh'

// describe('Continous online hearing service', () => {
//
// })
