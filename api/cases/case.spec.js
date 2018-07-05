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

    beforeEach(() => {
        httpResponse = (resolve, reject) => {
            resolve({});
        };
        httpRequest = jasmine.createSpy();
        httpRequest.and.callFake((url) => {
            if (url.endsWith('events')) {
                return new Promise(eventsHttpResponse);
            } else {
                return new Promise(httpResponse);
            }
        });

        route = proxyquire('./case', {
            '../lib/request': httpRequest
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
            eventsHttpResponse = (resolve, reject) => {
                resolve([
                    {
                        id: 'hearingBooked',
                        summary: 'xxx',
                        description: 'xxxx',
                        user_id: '28',
                        user_last_name: 'PINEAPPLE',
                        user_first_name: 'BOB',
                        event_name: 'Hearing booked',
                        created_date: '2018-07-03T10:58:37.474',
                        case_type_id: 'Benefit',
                        case_type_version: 1,
                        state_id: 'appealCreated',
                        state_name: 'Appeal Created',
                        security_classification: 'PUBLIC'
                    },
                    {
                        id: 'appealCreated',
                        summary: 'xxx',
                        description: 'xxxx',
                        user_id: '28',
                        user_last_name: 'PINEAPPLE',
                        user_first_name: 'BOB',
                        event_name: 'Appeal created',
                        created_date: '2018-07-03T10:58:24.187',
                        case_type_id: 'Benefit',
                        case_type_version: 1,
                        state_id: 'appealCreated',
                        state_name: 'Appeal Created',
                        security_classification: 'PUBLIC'
                    }
                ]);
            };
        });

        it('should populate the summary panel given data is in the response', () => {
            return request.get('/api/cases/1').expect(200).then(response => {
                const jsonRes = JSON.parse(response.text);
                const actualSummarySection = jsonRes.sections.filter(section => section.id === 'summary')[0];



                const caseDetails = actualSummarySection.sections[0].sections[0];
                const representatives = actualSummarySection.sections[0].sections[1];

                expect(jsonRes.caseId).toBe('1');

                expect(caseDetails.fields).toEqual([
                    {
                        "label": "Parties",
                        "value": `${caseData.case_data.appeal.appellant.name.firstName} ${caseData.case_data.appeal.appellant.name.lastName} vs DWP`
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
                    event_name: "Hearing booked",
                    user_first_name: "BOB",
                    user_last_name: "PINEAPPLE",
                    created_date: "2018-07-03T10:58:37.474"
                });
                expect(timelineSection.sections[0].fields[0].value[1]).toEqual({
                    event_name: "Appeal created",
                    user_first_name: "BOB",
                    user_last_name: "PINEAPPLE",
                    created_date: "2018-07-03T10:58:24.187"
                });
            });
        });
    });
});
