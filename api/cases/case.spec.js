const proxyquire = require('proxyquire');
const supertest = require('supertest');
const express = require('express');
const router = express.Router();

describe('case spec', () => {
    let httpRequest;
    let route;
    let app;
    let request;

    beforeEach(() => {
        httpRequest = jasmine.createSpy();
        httpRequest.and.callFake(() => Promise.resolve([]));

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
        
        it('should return the case sections with no values', () => {
            return request.get('/api/cases/1')
                .expect(200)
                .then(response => {
                     expect(response.text).toEqual(JSON.stringify({
                         "sections": [
                             {
                                 "id": "summary",
                                 "name": "Summary",
                                 "type": "page",
                                 "sections": [
                                     {
                                         "name": "Summary",
                                         "type": "summary-panel",
                                         "sections": [
                                             {
                                                 "name": "Case Details",
                                                 "fields": [
                                                     {
                                                         "label": "Parties",
                                                         "value": ""
                                                     },
                                                     {
                                                         "label": "Case number",
                                                         "value": ""
                                                     },
                                                     {
                                                         "label": "Case type",
                                                         "value": ""
                                                     }
                                                 ]
                                             },
                                             {
                                                 "name": "Representative",
                                                 "fields": [
                                                     {
                                                         "label": "Judge",
                                                         "value": "na"
                                                     },
                                                     {
                                                         "label": "Medical Member",
                                                         "value": "na"
                                                     },
                                                     {
                                                         "label": "Disability qualified member",
                                                         "value": "na"
                                                     }
                                                 ]
                                             }
                                         ]
                                     }
                                 ]
                             },
                             {
                                 "id": "parties",
                                 "name": "Parties",
                                 "type": "page",
                                 "sections": [
                                     {
                                         "id": "case_details",
                                         "name": "Case Details",
                                         "type": "parties-panel",
                                         "sections": [
                                             {
                                                 "id": "petitioner",
                                                 "name": "Petitioner",
                                                 "type": "tab",
                                                 "fields": [
                                                     {
                                                         "label": "Parties",
                                                         "value": ""
                                                     },
                                                     {
                                                         "label": "Case number",
                                                         "value": ""
                                                     },
                                                     {
                                                         "label": "Case type",
                                                         "value": ""
                                                     }
                                                 ]
                                             },
                                             {
                                                 "id": "respondent",
                                                 "name": "Respondent",
                                                 "type": "tab",
                                                 "fields": [
                                                     {
                                                         "label": "Parties",
                                                         "value": ""
                                                     },
                                                     {
                                                         "label": "Case number",
                                                         "value": ""
                                                     },
                                                     {
                                                         "label": "Case type",
                                                         "value": ""
                                                     }
                                                 ]
                                             }
                                         ]
                                     }
                                 ]
                             },
                             {
                                 "id": "casefile",
                                 "name": "Case file",
                                 "type": "page",
                                 "sections": [
                                     {
                                         "id": "documents",
                                         "name": "",
                                         "type": "document-panel",
                                         "fields": [
                                             {
                                                 "value": ""
                                             }
                                         ]
                                     }
                                 ]
                             }
                         ]
                     }));
            });
        });
    });

    describe('when all expected case data is returned', () => {

        beforeEach(() => {
            const caseData = [{
                id: 1528476356357908,
                case_data: {
                    subscriptions: {
                    },
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
                    ]
                }
            }];
        });

        it('should populate the summary panel given data is in the response', () => {
            return request.get('/api/cases/1').expect(200).then(response => {
                const jsonRes = JSON.parse(response.text);
                const actualSummarySection = jsonRes.sections.filter(section => section.id === 'summary')
                expect(actualSummarySection).toEqual([
                       {
                           "id": "summary",
                           "name": "Summary",
                           "type": "page",
                           "sections": [
                               {
                                   "name": "Summary",
                                   "type": "summary-panel",
                                   "sections": [
                                       {
                                           "name": "Case Details",
                                           "fields": [
                                               {
                                                   "label": "Parties",
                                                   "value": ""
                                               },
                                               {
                                                   "label": "Case number",
                                                   "value": ""
                                               },
                                               {
                                                   "label": "Case type",
                                                   "value": ""
                                               }
                                           ]
                                       },
                                       {
                                           "name": "Representative",
                                           "fields": [
                                               {
                                                   "label": "Judge",
                                                   "value": "na"
                                               },
                                               {
                                                   "label": "Medical Member",
                                                   "value": "na"
                                               },
                                               {
                                                   "label": "Disability qualified member",
                                                   "value": "na"
                                               }
                                           ]
                                       }
                                   ]
                               }
                           ]
                       }
                   ]
                );
            });
        });
    });
});
