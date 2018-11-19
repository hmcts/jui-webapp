const express = require('express')
const proxyquire = require('proxyquire')
const supertest = require('supertest')
const sscsCaseListTemplate = require('./templates/sscs/benefit')
const { sscsCaseDataNullCaseRef, divorceCaseData, sscsCaseData, onlineHearingData, userDetails, LAST_MODIFIED_DATE } = require('./case-list-spec-data')

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
        httpRequest = jasmine.createSpy()
        httpRequest.and.callFake((method, url) => new Promise({}))

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
        it('should return only template columns', done => request.get('/cases')
            .expect(200)
            .then(response => {
                expect(response.body.results.length).toBe(0)
                expect(response.body.columns).toEqual(columns)
                done()
            }))
    })

    describe('non-empty case list', () => {
        beforeEach(() => {
            casesData.push(divorceCaseData)
            casesData.push(sscsCaseData)
        })

        it('should have cases order by last modified ASC', done =>
            request.get('/cases')
                .expect(200)
                .then(response => {
                    expect(response.body.results.length).toBe(2)
                    expect(response.body.columns).toEqual(columns)
                    expect(response.body.results[0]).toEqual({
                        case_id: sscsCaseData[0].id,
                        case_jurisdiction: 'SSCS',
                        case_type_id: 'Benefit',
                        case_fields: {
                            case_ref: sscsCaseData[0].case_data.caseReference,
                            parties: 'Louis Houghton v DWP',
                            type: 'PIP',
                            status: { name: 'DWP response', actionGoTo: 'casefile' },
                            createdDate: sscsCaseData[0].created_date.toISOString(),
                            lastModified: LAST_MODIFIED_DATE.toISOString()
                        }
                    })
                    expect(response.body.results[1]).toEqual({
                        case_id: divorceCaseData[0].id,
                        case_jurisdiction: 'DIVORCE',
                        case_type_id: 'FinancialRemedyMVP2',
                        case_fields: {
                            case_ref: divorceCaseData[0].id,
                            parties: '  v  ',
                            type: 'Financial remedy',
                            status: { name: 'Draft consent order', actionGoTo: 'casefile' },
                            createdDate: divorceCaseData[0].created_date.toISOString(),
                            lastModified: divorceCaseData[0].last_modified.toISOString()
                        },
                        assignedToJudge: 'test@test.com'
                    })
                    done()
                })
        )
    })

    describe('case list with missing case-ref', () => {
        beforeEach(() => {
            casesData.push(sscsCaseDataNullCaseRef)
        })

        it('should filter out', done => request.get('/cases')
            .expect(200)
            .then(response => {
                expect(response.body.results.length).toBe(0)
                expect(response.body.columns).toEqual(columns)
                done()
            }))
    })
})
