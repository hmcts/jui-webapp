// const proxyquire = require('proxyquire').noPreserveCache();
// const supertest = require('supertest');
// const express = require('express');
// const config = require('../../config');
//
// describe('Questions route', () => {
//
//     let route, request, app;
//     let httpRequest, httpResponse;
//
//     beforeEach(() => {
//         httpResponse = (resolve, reject) => {
//             resolve([
//                 {
//                     event_name:'event_name',
//                     user_first_name:'user_first_name',
//                     user_last_name:'user_last_name',
//                     created_date:'created_date'
//                 }
//             ]);
//         };
//         httpRequest = jasmine.createSpy();
//         httpRequest.and.callFake((url, options) => {
//             return new Promise(httpResponse);
//         });
//
//         app = express();
//
//         route = proxyquire('./event.js', {
//             '../lib/request': httpRequest,
//             './options': () => {{}}
//         });
//
//         route(app);
//
//         request = supertest(app);
//     });
//
//     describe('getQuestionsByCase', () => {
//         let getQuestionsByCase;
//
//         beforeEach(() => {
//             getQuestionsByCase = route.getQuestionsByCase;
//         });
//
//         it('should expose getQuestionsByCase function', () => {
//             expect(getQuestionsByCase).toBeTruthy();
//         });
//
//         it('should return a promise of all outstanding requests', () => {
//             expect(getQuestionsByCase().then).toBeTruthy()
//         });
//
//         it('should return all questions requested', (done) => {
//             httpResponse = (resolve, reject) => {
//                 resolve([
//                     {
//                         event_name:'event_name',
//                         user_first_name:'user_first_name',
//                         user_last_name:'user_last_name',
//                         created_date:'created_date'
//                     },
//                     {
//                         event_name:'event_name2',
//                         user_first_name:'user_first_name2',
//                         user_last_name:'user_last_name2',
//                         created_date:'created_date2'
//                     }
//                 ]);
//             };
//
//             getQuestionsByCase().then(events => {
//                 expect(events).toEqual([
//                     {
//                         event_name:'event_name',
//                         user_first_name:'user_first_name',
//                         user_last_name:'user_last_name',
//                         created_date:'created_date'
//                     },
//                     {
//                         event_name:'event_name2',
//                         user_first_name:'user_first_name2',
//                         user_last_name:'user_last_name2',
//                         created_date:'created_date2'
//                     }
//                 ]);
//                 done();
//             });
//         });
//     });
// });
