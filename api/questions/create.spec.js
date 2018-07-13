const proxyquire = require('proxyquire');
const supertest = require('supertest');
const express = require('express');
const router = express.Router();

describe('create spec', () => {
    let httpRequest;
    let route;
    let app;
    let request;
    let httpResponse;
    let getHearingHttpResponse;
    let postQuestionsHttpResponse;

    beforeEach(() => {
        httpResponse = (resolve, reject) => {
            resolve({});
        };
        httpRequest = jasmine.createSpy();
        httpRequest.and.callFake((url) => {
            if (url.includes('case_id')) {
                return new Promise(getHearingHttpResponse);
            } else {
                return new Promise(postQuestionsHttpResponse);
            }
        });

        route = proxyquire('./create', {
            '../lib/request': httpRequest
        });
        router.post('/:case_id', route);
        app = express();
        app.use((req, res, next) => {
            req.body = JSON.stringify({subject: 'subject example', question: 'question body'});
            req.auth = {
                token: '1234567',
                userId: '1'
            };
            next();
        });
        app.use('/api/questions', router);

        request = supertest(app);
    });

    describe('when no question data is returned', () => {
        beforeEach(() => {
            getHearingHttpResponse = (resolve, reject) => {
                reject({
                    error: {
                        status: 400,
                        message: 'Case reference is not valid'
                    }
                });
            };
            postQuestionsHttpResponse = (resolve, reject) => {
                reject({
                    error: {
                        status: 400,
                        message: 'Bad request'
                    }
                });
            };
        });
        it('should return an error', () => {
            return request.post('/api/questions/null').expect(400);
        });
    });
    
    // describe('when post is successful', () => {
    //     beforeEach(() => {
    //         getHearingHttpResponse = (resolve, reject) => {
    //             resolve({
    //                 online_hearings: [{
    //                     online_hearing_id: "bf34ebf6-4082-4b7e-9c11-57cffcd8a717",
    //                 case_id: "1531477344211657",
    //                 start_date: "2018-07-13T15:54:07.080+0000",
    //                 panel: [
    //                     {
    //                         name: "5899"
    //                     }
    //                 ],
    //                 state: null
    //             }]
    //             })
    //         };
    //         postQuestionsHttpResponse = (resolve, reject) => {
    //             resolve({
    //                 "question_id": "d94f4764-ebb9-4929-ad07-4edc7eddf4b3"
    //             });
    //         };
    //     });
    //
    //     it('should return question id in the response', () => {
    //         return request.post('/api/questions/1531477344211657')
    //            .expect(201).then(response => {
    //                 const jsonRes = JSON.parse(response.text);
    //                 console.log('************')
    //             console.log(jsonRes)
    //             console.log('************')
    //                 expect(jsonRes.question_id).toEqual('d94f4764-ebb9-4929-ad07-4edc7eddf4b3');
    //             });
    //     });
    // });
});
