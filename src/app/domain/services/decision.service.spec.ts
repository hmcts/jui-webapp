import { TestBed, inject } from '@angular/core/testing';
import { DecisionService } from './decision.service';
import {
    HttpClientTestingModule,
    HttpTestingController
} from '@angular/common/http/testing';
import { ConfigService } from '../../config.service';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserTransferStateModule } from '@angular/platform-browser';
import {configMock, MockTransferStateService} from './mock/config.env.mock';
import {HttpClientModule} from '@angular/common/http';
import {QuestionService} from './question.service';

describe('DecisionService', () => {
    let decisionService: DecisionService;
    let httpMock: HttpTestingController;
    let url: string;
    const mockCaseId = '123';
    const mockDummyData = [{ id: 1 }, { id: 2 }];

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                BrowserTransferStateModule,
                HttpClientTestingModule,
                RouterTestingModule,
            ],
            providers: [
                DecisionService,
                {
                    provide: ConfigService,
                    useValue: configMock
                }
            ]
        });

        decisionService = TestBed.get(DecisionService);
        httpMock = TestBed.get(HttpTestingController);
        // jurId: string, caseId: string, pageId: string
        url = decisionService.generateDecisionUrl(mockCaseId, 'something', 'something' , 'something' );
    });

    it('should be created', () => {
        expect(decisionService)
            .toBeTruthy();
    });

    it('should contain case id', () => {
        expect(decisionService.generateDecisionUrl(mockCaseId, 'something', 'something', 'something')).toContain(mockCaseId);
    });

    it('should fetch decisions via http GET', () => {
        //const mockCaseId='123';
        const urls = decisionService.generateDecisionUrl(mockCaseId, 'something', 'something', 'something');
        decisionService.fetch(mockCaseId, 'something', 'something', 'something').subscribe(data => {
            expect(data.length).toBe(2);
            expect(data).toEqual(mockDummyData);
        });
        const mockReq = httpMock.expectOne(urls);
        expect(mockReq.request.method).toBe('GET');
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush(mockDummyData);
        httpMock.verify();

    });

    it('should all methods be valid', inject([DecisionService], (
        service: DecisionService
    ) => {
        const caseId =  '1';
        const pageId = '1';
        const body = {
            decision_text: 'text data',
            decision_award: 'award data'
        };
        const jurId = '1';
        const caseType = 'something';
        // TODO to mock correctly this property to terst valid also
        const caseData = {
            sections: {
                id : 'casefile',
                sections: ''
            }
        };

        expect(service.generateDecisionUrl( jurId, caseId, pageId, caseType)).toBeTruthy()
        expect(service.fetch(jurId, caseId, pageId, caseType)).toBeTruthy();
        expect(service.submitDecisionDraft(jurId, caseId, pageId, caseType, body)).toBeTruthy();
        // expect(service.issueDecision('')).toBeUndefined();
        expect(service.findConsentOrderDocumentUrl(caseData)).toBeNull();
    }));

    it('should all methods be trully',     () => {
        const caseId =  '1';
        const pageId = '1';
        const postBody = {
            decision_text: 'text data',
            decision_award: 'award data'
        };

        const jurId = '1';
        const caseType = 'something';


       // jurId: string, caseId: string, pageId: string, caseType: string, body: any
        decisionService.submitDecisionDraft(jurId, caseId, pageId, caseType, postBody).subscribe(data => {
            expect(data.length).toBe(2);
            expect(data).toEqual(mockDummyData);
        });

        // jurId: string, caseId: string, pageId: string, caseType: string
        const urls = decisionService.generateDecisionUrl(jurId, caseId, pageId, caseType);
        const req = httpMock.expectOne('' + `${urls}`);
        expect(req.request.method).toBe('POST');
        expect(req.request.responseType).toEqual('json');
        expect(req.request.body.decision_award).toBe(postBody.decision_award);
        expect(req.request.body.decision_text).toBe(postBody.decision_text);
        expect(req.request.url).toBe( '/api/decisions/state/1/something/1/1');
        expect(decisionService.generateDecisionUrl(jurId, caseId, pageId, caseType)).toContain(jurId);
        req.flush(mockDummyData);
        httpMock.verify();

    });


});
