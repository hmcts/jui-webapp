import * as chai from 'chai'
import {expect} from 'chai'
import 'mocha'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import {mockReq, mockRes} from 'sinon-express-mock'

const moment = require('moment')

chai.use(sinonChai)

import {http} from '../../lib/http'

import * as eventFile from './index'
import * as ccdStore from '../../services/ccd-store-api/ccd-store'
import {config} from '../../../config';

describe('controller / events', () => {
    const res = {
        data: 'okay',
    }

    // let spy: any
    // let spyDelete: any
    // let spyPost: any
    // let spyPatch: any

    // beforeEach(() => {
    //
    //     spy = sinon.stub(http, 'get').resolves(res)
    //     spyPost = sinon.stub(http, 'post').resolves(res)
    //     spyPatch = sinon.stub(http, 'patch').resolves(res)
    //     spyDelete = sinon.stub(http, 'delete').resolves(res)
    // })
    //
    // afterEach(() => {
    //
    //     spy.restore()
    //     spyPost.restore()
    //     spyPatch.restore()
    //     spyDelete.restore()
    // })

    describe('hasCOR()', () => {

        it('Should return true if jurisdiction matches SSCS', async () => {

            const jurisdiction = 'SSCS';

            expect(eventFile.hasCOR(jurisdiction)).to.be.true;
        });

        it('Should return false if jurisdiction does not match SSCS', async () => {

            const jurisdiction = 'FR';

            expect(eventFile.hasCOR(jurisdiction)).to.be.false;
        });
    });

    describe('convertDateTime()', () => {

        it('Should return true if jurisdiction matches SSCS', async () => {

            const dateObj = new Date(946684800);

            const conDateTime = moment(dateObj);
            const dateUtc = conDateTime.utc().format();
            const date = conDateTime.format('D MMMM YYYY');
            const time = conDateTime.format('h:mma');

            expect(eventFile.convertDateTime(dateObj)).to.deep.equal({
                dateUtc,
                date,
                time
            });
        });
    });

    describe('sortEvents()', () => {

        it('Should sort events', async () => {

            const events = [
                {
                    dateUtc: '1970-01-11',
                },
                {
                    dateUtc: '1970-01-13',
                },
                {
                    dateUtc: '1970-01-12',
                },
            ];

            const expectedEvents = [
                {
                    dateUtc: '1970-01-13',
                },
                {
                    dateUtc: '1970-01-12',
                },
                {
                    dateUtc: '1970-01-11',
                },
            ];

            expect(eventFile.sortEvents(events)).to.deep.equal(expectedEvents);
        });
    });

    describe('combineLists()', () => {

        it('Should combine two arrays', async () => {

            const arrayOne = ['one', 'two', 'three']
            const arrayTwo = ['four', 'five']

            expect(eventFile.combineLists([arrayOne, arrayTwo])).to.deep.equal([...arrayOne, ...arrayTwo])
        })
    })

    describe('getHistory()', () => {

        it('Should get history', async () => {

            const arrObject = [{
                history: 'history',
                removed: 'removed',
            }]

            expect(eventFile.getHistory(arrObject)).to.deep.equal([
                'history',
            ])
        })
    })

    describe('getCcdEvents()', () => {

        it('Should call getCCDEvents in Ccd Store.', async () => {

            const url = config.services.ccd_data_api

            const userId = 'userId'
            const jurisdiction = 'jurisdiction'
            const caseType = 'caseType'
            const caseId = 'caseId'

            let spy: any

            spy = sinon.stub(http, 'get').resolves(res)

            eventFile.getCcdEvents(userId, jurisdiction, caseType, caseId)

            expect(spy).to.be.calledWith(`${url}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${caseType}/cases/${caseId}/events`)
        })
    })

    describe('getCohEvents()', () => {

        it('Should return an object.', async () => {

            const userId = 'userId'
            const caseId = 'caseId'

            expect(eventFile.getCohEvents(userId, caseId)).to.exist
        })
    })

    describe('reduceCohEvents()', () => {

        it('Should have coh in the by field.', async () => {

            const events = [{
                'state_datetime' : {
                    date: '',
                    dateUtc: '',
                    time: '',
                },
            }]

            expect(eventFile.reduceCohEvents(events)[0].by).to.equal('coh')
        })

        it('Should have documents return as an empty array.', async () => {

            const events = [{
                'state_datetime' : {
                    date: '',
                    dateUtc: '',
                    time: '',
                },
            }]

            expect(eventFile.reduceCohEvents(events)[0].documents).to.deep.equal([])
        })
    })

    describe('getEvents()', () => {

        it('Should take in userId, jurisdiction, caseType, caseId.', async () => {

            const events = [{
                'state_datetime' : {
                    date: '',
                    dateUtc: '',
                    time: '',
                },
            }]

            expect(eventFile.reduceCohEvents(events)[0].by).to.equal('coh')
        })
    })

    xdescribe('reduceCcdEvents()', () => {

        it('Should take in jurisdiction, caseType, caseId and events.', async () => {

            const jurisdiction = 'SCSS';
            const caseType = 'caseType';
            const caseId = 'caseId';
            const events = [
                {
                    documents: [
                        {
                            document_filename: '',
                            id: '',
                        },
                    ],
                }, {}]

            expect(eventFile.reduceCcdEvents(jurisdiction, caseType, caseId, events)).to.deep.equal({});
        });
    });
});
