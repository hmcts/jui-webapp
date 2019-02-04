import 'mocha'
import * as chai from 'chai'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import * as express from 'express'
import * as pq from 'proxyquire'
import * as supertest from 'supertest'

chai.use(sinonChai)
const expect = chai.expect
const assert = chai.assert
const proxyquire = pq.noPreserveCache()
const {
    sscsCaseDataNullCaseRef,
    divorceCaseData,
    sscsCaseData,
    onlineHearingData,
    userDetails,
    LAST_MODIFIED_DATE
} = require('./case-list-spec-data')

const columns = [
    {
        label: 'Case Reference',
        case_field_id: 'case_ref'
    },
    {
        label: 'Parties',
        case_field_id: 'parties'
    },
    {
        label: 'Type',
        case_field_id: 'type'
    },
    {
        label: 'Decision needed on',
        case_field_id: 'status'
    },
    {
        label: 'Case received',
        case_field_id: 'createdDate',
        date_format: 'd MMM yyyy'
    },
    {
        label: 'Date of last event',
        case_field_id: 'lastModified',
        date_format: 'd MMM yyyy'
    }
]

describe('case-list', () => {
    let httpRequest
    let app
    let route
    let casesData
    let request

    beforeEach(() => {
        casesData = []
        httpRequest = sinon.stub()
        httpRequest.callsFake((method, url) => new Promise({} as any))

        app = express()

        route = proxyquire('./index', {
            '../../lib/request/request': httpRequest,
            '../../services/ccd-store-api/ccd-store': { getMutiJudCCDCases: () => Promise.resolve(casesData) },
            '../../services/coh-cor-api/coh-cor-api': { getHearingByCase: () => Promise.resolve(onlineHearingData) },
            '../../services/idam-api/idam-api': { getDetails: () => Promise.resolve(userDetails) },
            '../questions': { getAllQuestionsByCase: () => Promise.resolve([]) }
        })

        app.use((req, res, next) => {
            req.auth = {
                token: '1234567',
                userId: '1'
            }
            req.headers.ServiceAuthorization = 'sdhfkajfa;ksfha;kdj'
            next()
        })

        route(app)
        request = supertest(app)
    })

    describe('empty case list', () => {
        xit('should return only template columns', () =>
            request
                .get('/cases')
                .expect(200)
                .then(response => {
                    expect(response.body.results.length).to.equal(0)
                    expect(response.body.columns).to.deep.equal(columns)
                }))
    })

    describe('non-empty case list', () => {
        beforeEach(() => {
            casesData.push(divorceCaseData)
            casesData.push(sscsCaseData)
        })

        xit('should have cases order by last modified ASC', done => {
            request
                .get('/cases')
                .expect(200)
                .then(response => {
                    expect(response.body.results.length).to.equal(2)
                    expect(response.body.columns).to.deep.equal(columns)
                    expect(response.body.results[0]).to.deep.equal({
                        case_id: sscsCaseData[0].id,
                        case_jurisdiction: 'SSCS',
                        case_type_id: 'Benefit',
                        case_fields: {
                            case_ref: sscsCaseData[0].case_data.caseReference,
                            parties: 'Louis Houghton v DWP',
                            type: 'PIP',
                            status: { name: 'DWP response', actionGoTo: 'casefile', ID: null },
                            createdDate: sscsCaseData[0].created_date.toISOString(),
                            lastModified: LAST_MODIFIED_DATE.toISOString()
                        }
                    })
                    expect(response.body.results[1]).to.deep.equal({
                        case_id: divorceCaseData[0].id,
                        case_jurisdiction: 'DIVORCE',
                        case_type_id: 'FinancialRemedyMVP2',
                        case_fields: {
                            case_ref: divorceCaseData[0].id,
                            parties: '  v  ',
                            type: 'Financial remedy',
                            status: { name: 'Draft consent order', actionGoTo: 'casefile', ID: null },
                            createdDate: divorceCaseData[0].created_date.toISOString(),
                            lastModified: divorceCaseData[0].last_modified.toISOString()
                        },
                        assignedToJudge: 'test@test.com'
                    })
                })
            done()
        })
    })

    describe('case list with missing case-ref', () => {
        beforeEach(() => {
            casesData.push(sscsCaseDataNullCaseRef)
        })

        xit('should filter out', done => {
            request
                .get('/cases')
                .expect(200)
                .then(response => {
                    expect(response.body.results.length).to.equal(0)
                    expect(response.body.columns).to.deep.equal(columns)
                })
            done()
        })
    })
})
