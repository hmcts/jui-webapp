import { TestBed, inject } from '@angular/core/testing';
import { QuestionService } from './question.service';
import {HttpClientModule} from '@angular/common/http';
import {BrowserTransferStateModule, TransferState} from '@angular/platform-browser';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {configMock, MockConfigService, MockTransferStateService} from './mock/config.env.mock';
import {ConfigService} from '../../config.service';


describe('QuestionService', () => {
    let httpMock: HttpTestingController;
    let questionService: QuestionService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule,
                BrowserTransferStateModule,
                HttpClientTestingModule,
                RouterTestingModule
            ],
            providers: [
                QuestionService,
                {
                    provide: ConfigService,
                    useValue: configMock
                },
                { provide: TransferState, useClass : MockTransferStateService},
                // { provide: ConfigService, useClass : MockConfigService},
            ]
        });
        httpMock = TestBed.get(HttpTestingController);
        questionService  = TestBed.get(QuestionService);
    });

    it('should be created', inject([QuestionService], (service: QuestionService) => {
        expect(service).toBeTruthy();
    }));

    it('should all methods be valid', inject([QuestionService], (
        service: QuestionService, state: MockTransferStateService
    ) => {
        const item = '1';
        const caseId = '';
        const questionId = '';
        const question = '';
        const roundId = '';
        expect(service.fetch(caseId, questionId)).toBeTruthy();
        expect(service.fetchAll(item)).toBeTruthy();
        expect(service.create(caseId, question)).toBeTruthy();
    expect(service.update(caseId, questionId, question)).toBeTruthy();
    expect(service.remove(caseId, questionId)).toBeTruthy();
    expect(service.sendQuestions(caseId, roundId)).toBeTruthy();
    expect(service.fetchRound(caseId, roundId)).toBeTruthy();
}));

it('should method contain create var', inject([QuestionService], () => {

    const mockDummyData = [{ id: 1 }, { id: 2 }];
    const caseId = '123';
    const body = '123';

    questionService.create(caseId, body).subscribe(data => {
        expect(data).toEqual(mockDummyData);
    });

    const mockReq = httpMock.expectOne(`${configMock.config.api_base_url}/api/caseQ/${caseId}/questions`);
    expect(mockReq.request.method).toBe('POST');
    expect(mockReq.request.responseType).toEqual('json');
    expect(mockReq.request.body).toBe(body);
    expect(mockReq.request.url).toBe( `/api/caseQ/${caseId}/questions`);


    mockReq.flush(mockDummyData);
    httpMock.verify();

}));

});
