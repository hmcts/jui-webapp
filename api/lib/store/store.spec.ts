import {expect} from 'chai'
import 'mocha'
import {mockReq, mockRes} from 'sinon-express-mock'

import {Store} from './store'

describe('Store', () => {
    it('Should construct session based on req session', () => {
        const req = {
            session: {
                foo: 'bar',
            },
        }
        const store = new Store(req)
        expect(store.session).to.be.an('object')
        expect(store.session.foo).to.equal('bar')
    })
    it('Should set session key and value', () => {
        const req = {
            session: {
                foo: 'bar',
            },
        }
        const store = new Store(req)
        store.set('foo2', 'bar2')
        expect(store.session.foo2).to.equal('bar2')
    })
    it('Should get session key and value', () => {
        const req = {
            session: {
                foo3: 'bar3',
            },
        }
        const store = new Store(req)
        store.get('foo3')
        expect(store.session.foo3).to.equal('bar3')
    })
})
