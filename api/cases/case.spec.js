const proxyquire = require('proxyquire');
const supertest = require('supertest');
const express = require('express');
const router = express.Router();

describe('case spec', () => {
    let httpRequest;
    let route;
    let app;
    let request;
    let httpResponse;
    let eventsHttpResponse;
    let hearingHttpResponse;
    let questionsHttpResponse;


    const eventsMock = {
        getEvents: () => Promise.resolve([
            {
                field: 'value'
            },
            {
                field: 'value'
            }
        ])
    };

    const documentsMock = {
        getDocuments: () => Promise.resolve([])
    };


    beforeEach(() => {
        httpResponse = (resolve, reject) => {
            resolve({});
        };
        httpRequest = jasmine.createSpy();
        httpRequest.and.callFake((url) => {
            if (url.endsWith('events')) {
                return new Promise(eventsHttpResponse);
            } else if (url.endsWith('questions')) {
                return new Promise(questionsHttpResponse);
            } else if (url.includes('continuous-online-hearings?case_id')) {
                return new Promise(hearingHttpResponse);
            } else {
                return new Promise(httpResponse);
            }
        });

        route = proxyquire('./case', {
            '../lib/request': httpRequest,
            '../events': eventsMock,
            '../documents': documentsMock
        });
        router.get('/:case_id', route);
        app = express();
        app.use((req, res, next) => {
            req.auth = {
                token: '1234567',
                userId: '1'
            };
            next();
        });
        app.use('/api/cases', router);

        request = supertest(app);
    });

    describe('when no case data is returned', () => {
        beforeEach(() => {
            httpResponse = (resolve, reject) => {
                reject({
                    error: {
                        status: 400,
                        message: 'Case reference is not valid'
                    }
                });
            };
            eventsHttpResponse = (resolve, reject) => {
                reject({
                    error: {
                        status: 400,
                        message: 'Case reference is not valid'
                    }
                });
            };
            questionsHttpResponse = (resolve, reject) => {
                reject({
                    error: {
                        status: 400,
                        message: 'Case reference is not valid'
                    }
                });
            };
            hearingHttpResponse = (resolve, reject) => {
                reject({
                    error: {
                        status: 400,
                        message: 'Case reference is not valid'
                    }
                });
            };
        });
        it('should return an error', () => {
            return request.get('/api/cases/null')
                .expect(400);
        });
    });

    describe('when all expected case data is returned', () => {
        let caseData;
        beforeEach(() => {
            caseData = {
                id: 1528476356357908,
                case_data: {
                    subscriptions: {},
                    caseReference: "SC001/01/46863",
                    appeal: {
                        appellant: {
                            name: {
                                title: "Mr",
                                lastName: "May_146863",
                                firstName: "A"
                            },
                        },
                        benefitType: {
                            code: "PIP"
                        },
                    },
                    region: "LEEDS",
                    sscsDocument: [
                        {
                            id: "b4390fb6-8248-49d5-8560-41a7c2f27418",
                        },
                        {
                            id: "6ad97d36-2c85-4aec-9909-e5ca7592faae",
                        }
                    ],
                    panel: {
                        assignedTo: 'assignedTo',
                        medicalMember: 'medicalMember',
                        disabilityQualifiedMember: 'disabilityQualifiedMember'
                    }
                }
            };
            httpResponse = (resolve, reject) => {
                resolve(caseData);
            };
            hearingHttpResponse = (resolve, reject) => {
                resolve({
                    online_hearings: [{
                        online_hearing_id: "bf34ebf6-4082-4b7e-9c11-57cffcd8a717",
                    case_id: "1531477344211657",
                    start_date: "2018-07-13T15:54:07.080+0000",
                    panel: [
                        {
                            name: "5899"
                        }
                    ],
                    state: null
                }]
                })
            };
            eventsHttpResponse = (resolve, reject) => {
                resolve();
            };
            questionsHttpResponse = (resolve, reject) => {
                resolve({
                    questions: [
                        {
                            question_round: "1",
                            question_ordinal: "1",
                            question_header_text: "What are you doing?",
                            question_body_text: "Describe what you are doing now.",
                            owner_reference: "5899",
                            question_id: "de8896df-1de7-4f46-a2e4-483d6bc3a27b",
                            current_question_state: {
                                state_name: "question_drafted",
                                state_datetime: "2018-07-13 15:54:07.376"
                            }
                        },
                        {
                            question_round: "1",
                            question_ordinal: "1",
                            question_header_text: "What are you doing tomorrow?",
                            question_body_text: "Describe what you are doing tomorrow.",
                            owner_reference: "5899",
                            question_id: "re8896df-1de7-4f46-a2e4-483d6bc3a27b",
                            current_question_state: {
                                state_name: "question_drafted",
                                state_datetime: "2018-07-13 15:54:07.376"
                            }
                        }
                    ]
                });
            };
        });

        it('should populate the summary panel given data is in the response', () => {
            return request.get('/api/cases/1').expect(200).then(response => {
                const jsonRes = JSON.parse(response.text);
                const actualSummarySection = jsonRes.sections.filter(section => section.id === 'summary')[0];


                const caseDetails = actualSummarySection.sections[0].sections[0];
                const representatives = actualSummarySection.sections[0].sections[1];

                expect(caseDetails.fields).toEqual([
                    {
                        "label": "Parties",
                        "value": `${caseData.case_data.appeal.appellant.name.firstName} ${caseData.case_data.appeal.appellant.name.lastName} v DWP`
                    },
                    {
                        "label": "Case number",
                        "value": caseData.case_data.caseReference
                    },
                    {
                        "label": "Case type",
                        "value": caseData.case_data.appeal.benefitType.code
                    }
                ]);

                expect(representatives.fields).toEqual([
                    {
                        "label": "Judge",
                        "value": caseData.case_data.panel.assignedTo
                    },
                    {
                        "label": "Medical Member",
                        "value": caseData.case_data.panel.medicalMember
                    },
                    {
                        "label": "Disability qualified member",
                        "value": caseData.case_data.panel.disabilityQualifiedMember
                    }
                ]);

                const timelineSection = jsonRes.sections.filter(section => section.id === 'timeline')[0];
                expect(timelineSection.sections[0].fields[0].value[0]).toEqual({
                    field: 'value'
                });

                const draftQuestionsToAppellant = jsonRes.sections
                    .filter(section => section.id === 'questions')[0].sections[0].sections
                    .filter(section => section.id === 'questions-to-appellant')[0].sections
                    .filter(section => section.id === 'draft-questions')[0].fields[0].value[1];


                expect(draftQuestionsToAppellant[0]).toEqual({
                    body: 'Describe what you are doing now.',
                    header: 'What are you doing?',
                    id: 'de8896df-1de7-4f46-a2e4-483d6bc3a27b',
                    owner_reference: '5899',
                    state_datetime: '2018-07-13 15:54:07.376'
                });

                expect(draftQuestionsToAppellant[1]).toEqual({
                    body: 'Describe what you are doing tomorrow.',
                    header: 'What are you doing tomorrow?',
                    id: 're8896df-1de7-4f46-a2e4-483d6bc3a27b',
                    owner_reference: '5899',
                    state_datetime: '2018-07-13 15:54:07.376'
                });
            });
        });
    });
});
