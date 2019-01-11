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
const router = express.Router()

describe('case spec', () => {
    let httpRequest
    let route
    let app
    let request
    let httpResponse
    let eventsHttpResponse
    let hearingGetHttpResponse
    let hearingPostHttpResponse
    let questionsGetHttpResponse

    const eventsMock = {
        getEvents: () => Promise.resolve([{ field: 'value' }, { field: 'value' }])
    }

    const questionsMock = {
        getQuestionsByCase: () =>
            Promise.resolve([
                null,
                [
                    {
                        id: '9727a0fc-11bb-4212-821f-b36e312bbace',
                        header: 'Test',
                        body: 'Test1',
                        owner_reference: '5899',
                        state_datetime: '2018-07-19 06:32:59.425'
                    },
                    {
                        id: 'b889ed7b-61d7-4494-a6f9-94b40534b37a',
                        header: 'Hello',
                        body: 'World',
                        owner_reference: '5899',
                        state_datetime: '2018-07-18 21:16:50.729'
                    }
                ]
            ])
    }

    const documentsMock = { getDocuments: () => Promise.resolve([]) }

    beforeEach(() => {
        httpResponse = (resolve, reject) => {
            resolve({})
        }
        httpRequest = sinon.stub()
        httpRequest.callsFake(url => {
            if (url.endsWith('events')) {
                return new Promise(eventsHttpResponse)
            } else if (url.endsWith('?case_id')) {
                return new Promise(hearingGetHttpResponse)
            } else if (url.endsWith('questions')) {
                return new Promise(questionsGetHttpResponse)
            } else if (url.endsWith('continuous-online-hearings')) {
                return new Promise(hearingPostHttpResponse)
            }
            return new Promise(httpResponse)
        })

        app = express()
        route = proxyquire('./index', {
            '../../lib/request/request': httpRequest,
            '../../questions': questionsMock,
            '../../events': eventsMock,
            '../../documents': documentsMock
        })

        route(app)
        request = supertest(app)
    })

    describe('when no case data is returned', () => {
        beforeEach(() => {
            httpResponse = (resolve, reject) => {
                reject({
                    error: {
                        status: 400,
                        message: 'Case reference is not valid'
                    }
                })
            }
            eventsHttpResponse = (resolve, reject) => {
                reject({
                    error: {
                        status: 400,
                        message: 'Case reference is not valid'
                    }
                })
            }
            hearingGetHttpResponse = (resolve, reject) => {
                reject({
                    error: {
                        status: 400,
                        message: 'Case reference is not valid'
                    }
                })
            }
            hearingPostHttpResponse = (resolve, reject) => {
                reject({
                    error: {
                        status: 400,
                        message: 'Case reference is not valid'
                    }
                })
            }
            questionsGetHttpResponse = (resolve, reject) => {
                reject({
                    error: {
                        status: 400,
                        message: 'Case reference is not valid'
                    }
                })
            }
        })
        xit('should return an error', () => request.get('/case/SSCS/Benefit/null').expect(400))
    })

    describe('when all expected case data is returned', () => {
        let caseData
        beforeEach(() => {
            caseData = {
                id: 1528476356357908,
                case_data: {
                    subscriptions: {},
                    caseReference: 'SC001/01/46863',
                    appeal: {
                        appellant: {
                            name: {
                                title: 'Mr',
                                lastName: 'May_146863',
                                firstName: 'A'
                            }
                        },
                        benefitType: { code: 'PIP' }
                    },
                    region: 'LEEDS',
                    sscsDocument: [{ id: 'b4390fb6-8248-49d5-8560-41a7c2f27418' }, { id: '6ad97d36-2c85-4aec-9909-e5ca7592faae' }],
                    panel: {
                        assignedTo: 'assignedTo',
                        medicalMember: 'medicalMember',
                        disabilityQualifiedMember: 'disabilityQualifiedMember'
                    }
                }
            }
            httpResponse = (resolve, reject) => resolve(caseData)
            eventsHttpResponse = resolve => resolve()
            hearingPostHttpResponse = resolve => resolve()
            hearingGetHttpResponse = resolve => resolve()
            questionsGetHttpResponse = resolve => resolve()
        })

        xit('should populate the summary panel given data is in the response', () =>
            request
                .get('/SSCS/Benefit/1')
                .expect(200)
                .then(response => {
                    const jsonRes = JSON.parse(response.text)
                    const actualSummarySection = jsonRes.sections.filter(section => section.id === 'summary')[0]
                    const caseDetails = actualSummarySection.sections[0].sections[0]
                    const representatives = actualSummarySection.sections[0].sections[1]

                    expect(caseDetails.fields).to.equal([
                        {
                            label: 'Parties',
                            value: `${caseData.case_data.appeal.appellant.name.firstName} ${
                                caseData.case_data.appeal.appellant.name.lastName
                            } v DWP`
                        },
                        {
                            label: 'Case number',
                            value: caseData.case_data.caseReference
                        },
                        {
                            label: 'Case type',
                            value: caseData.case_data.appeal.benefitType.code
                        }
                    ])

                    expect(representatives.fields).to.equal([
                        {
                            label: 'Judge',
                            value: caseData.case_data.panel.assignedTo
                        },
                        {
                            label: 'Medical member',
                            value: caseData.case_data.panel.medicalMember
                        },
                        {
                            label: 'Disability qualified member',
                            value: caseData.case_data.panel.disabilityQualifiedMember
                        }
                    ])

                    const timelineSection = jsonRes.sections.filter(section => section.id === 'timeline')[0]
                    expect(timelineSection.sections[0].fields[0].value[0]).to.equal({ field: 'value' })

                    const draftQuestionsToAppellant = jsonRes.sections
                        .filter(section => section.id === 'questions')[0]
                        .sections[0].sections.filter(section => section.id === 'questions-to-appellant')[0]
                        .sections.filter(section => section.id === 'draft-questions')[0].fields[0].value[1]

                    expect(draftQuestionsToAppellant[0]).to.equal({
                        id: '9727a0fc-11bb-4212-821f-b36e312bbace',
                        header: 'Test',
                        body: 'Test1',
                        owner_reference: '5899',
                        state_datetime: '2018-07-19 06:32:59.425'
                    })

                    expect(draftQuestionsToAppellant[1]).to.equal({
                        id: 'b889ed7b-61d7-4494-a6f9-94b40534b37a',
                        header: 'Hello',
                        body: 'World',
                        owner_reference: '5899',
                        state_datetime: '2018-07-18 21:16:50.729'
                    })
                }))
    })
})
