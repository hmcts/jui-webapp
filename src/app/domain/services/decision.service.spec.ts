import { TestBed, inject } from '@angular/core/testing';

import { DecisionService } from './decision.service';
import {
    HttpClientTestingModule,
    HttpTestingController
} from '@angular/common/http/testing';
import { ConfigService } from '../../config.service';
import { RouterTestingModule } from '@angular/router/testing';
import { DomainModule } from '../domain.module';
import { SharedModule } from '../../shared/shared.module';
import { BrowserTransferStateModule } from '@angular/platform-browser';

// const configMock = {
//     config: {
//         api_base_url: ''
//     }
// };
//
// const decisionService: DecisionService;
// const httpMock: HttpTestingController;

// describe('DecisionService', () => {

//     let url;
//     const mockCaseId = "123";

//     beforeEach(() => {
//         TestBed.configureTestingModule({
//             imports: [
//                 DomainModule,
//                 SharedModule,
//                 BrowserTransferStateModule,
//                 HttpClientTestingModule,
//                 RouterTestingModule
//             ],
//             providers: [
//                 DecisionService,
//                 {
//                     provide: ConfigService,
//                     useValue: configMock
//                 }
//             ]
//         });

//         decisionService = TestBed.get(DecisionService);
//         httpMock = TestBed.get(HttpTestingController);
//         url = decisionService.generateDecisionUrl(mockCaseId);
//     });

//     it('should be created', () => {
//         expect(decisionService)
//             .toBeTruthy();
//     });

//     it('should contain case id', () => {
//         expect(decisionService.generateDecisionUrl(mockCaseId)).toContain(mockCaseId);

//     });

//     it('should fetch decisions via http GET', () => {
//         const mockDummyData = [{ id: 1 }, { id: 2 }];
//         //const mockCaseId='123';
//         const url = decisionService.generateDecisionUrl(mockCaseId);

//         decisionService.fetch(mockCaseId).subscribe(data => {
//             expect(data.length).toBe(2);
//             expect(data).toEqual(mockDummyData);
//         });

//         const mockReq = httpMock.expectOne(url);
//         expect(mockReq.request.method).toBe('GET');
//         expect(mockReq.request.responseType).toEqual('json');
//         mockReq.flush(mockDummyData);
//         httpMock.verify();

//     });

//     it('should submit draft decision via http POST', () => {

//         const mockDummyData = [{ id: 1 }, { id: 2 }];
//         const mockAward = "award data";
//         const mockText = "text data";

//         decisionService.submitDecisionDraft(mockCaseId, mockAward, mockText).subscribe(data => {
//             expect(data.length).toBe(2);

//         });

//         const mockReq = httpMock.expectOne(url);
//         expect(mockReq.request.method).toBe('POST');
//         expect(mockReq.request.responseType).toEqual('json');
//         expect(mockReq.request.body.decision_text).toBe(mockText);
//         expect(mockReq.request.body.decision_award).toBe(mockAward);
//         expect(mockReq.request.url).toBe(url);

//         mockReq.flush(mockDummyData);
//         httpMock.verify();

//     })

//     it('should update draft decision via http PUT', () => {

//         const mockDummyData = [{ id: 1 }, { id: 2 }];
//         const mockAward = "award data";
//         const mockText = "text data";

//         decisionService.updateDecisionDraft(mockCaseId, mockAward, mockText).subscribe(data => {
//              expect(data).toBe(mockDummyData);

//         })

//         const mockReq = httpMock.expectOne(url);
//         expect(mockReq.request.method).toBe('PUT');
//         expect(mockReq.request.responseType).toEqual('json');

//         mockReq.flush(mockDummyData);
//         httpMock.verify();

//     })

//     it('should issue decision via http PUT', () => {

//         const mockDummyData = [{ id: 1 }, { id: 2 }];
//         const mockAward = "award data";
//         const mockText = "text data";

//         decisionService.updateDecisionDraft(mockCaseId, mockAward, mockText).subscribe(data => {
//              expect(data).toBe(mockDummyData);

//         })

//         const mockReq = httpMock.expectOne(url);
//         expect(mockReq.request.method).toBe('PUT');
//         expect(mockReq.request.responseType).toEqual('json');

//         mockReq.flush(mockDummyData);
//         httpMock.verify();

//     })

// });
