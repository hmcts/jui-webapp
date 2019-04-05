import {TestBed, inject} from '@angular/core/testing';
import {CaseService} from './case.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ConfigService} from '../../config.service';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserTransferStateModule, makeStateKey, TransferState} from '@angular/platform-browser';
import {SharedModule} from '../../shared/shared.module';
import {DomainModule} from '../domain.module';

const configMock = {
    config: {
        api_base_url: ''
    }
};

let caseService: CaseService;
let httpMock: HttpTestingController;
let errResponse: any;

describe('CaseService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                DomainModule,
                SharedModule,
                BrowserTransferStateModule,
                HttpClientTestingModule,
                RouterTestingModule
            ],
            providers: [
                CaseService,
                {
                    provide: ConfigService,
                    useValue: configMock
                }
            ]
        });

        caseService = TestBed.get(CaseService);
        httpMock = TestBed.get(HttpTestingController);
    });

    it('should be created', inject([CaseService], (service: CaseService) => {
        expect(service).toBeTruthy();
    }));

    it('should fetch', () => {
        const mockCaseData = [{is: 1}, {id: 2}];
        const mockJudistdiction = 'DIVORCE';
        const mockCaseId = '123';
        const mockCaseType = 'DIVORCE';
        const url = `/api/case/${mockJudistdiction}/${mockCaseType}/${mockCaseId}`;

        caseService.fetch(mockCaseId, mockJudistdiction, mockCaseType).subscribe(data => {
            expect(data).toEqual(mockCaseData);
        });
        const mockReq = httpMock.expectOne(url);
        expect(mockReq.request.method).toBe('GET');
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush(mockCaseData);
        httpMock.verify();
    });


    it('should fetch data from cache if cache is exist', () => {
        const mockUrl = 'testUrl';
        caseService.checkCache(mockUrl).subscribe( data => {
            expect(data).toBe(mockUrl);
        });
    });

    it('should search', () => {
        const mockCaseData = [{is: 1}, {id: 2}];
        const url = `/api/cases`;
        caseService.getCases().subscribe(data => {
            expect(data).toEqual(mockCaseData);
        });
        const mockReq = httpMock.expectOne(url);
        expect(mockReq.request.method).toBe('GET');
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush(mockCaseData);
        httpMock.verify();
    });

    it('should throw the error if there is an api connections errors in search', () => {
        const mockCaseData = [{is: 1}, {id: 2}];
        const url = `/api/cases`;
        const mockErrorResponse = { status: 400, statusText: 'Bad Request' };
        caseService.getCases().subscribe(data => {
            expect(data).toEqual(mockCaseData);
        }, err => errResponse = err);
        const mockReq = httpMock.expectOne(url);
        expect(mockReq.request.method).toBe('GET');
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush(mockCaseData, mockErrorResponse);
        httpMock.verify();
    });

    it('should get new case', () => {
        const mockCaseData = [{is: 1}, {id: 2}];
        const url = `/api/cases/assign/new`;
        caseService.getNewCase().subscribe(data => {
            expect(data).toEqual(mockCaseData);
        });
        const mockReq = httpMock.expectOne(url);
        expect(mockReq.request.method).toBe('POST');
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush(mockCaseData);
        httpMock.verify();
    });

    it('should throw the error if there is an api connections errors in get new case', () => {
        const mockCaseData = [{is: 1}, {id: 2}];
        const url = `/api/cases/assign/new`;
        const mockErrorResponse = { status: 400, statusText: 'Bad Request' };
        caseService.getNewCase().subscribe(data => {}, err => errResponse = err);
        const mockReq = httpMock.expectOne(url);
        mockReq.flush(mockCaseData, mockErrorResponse);
        expect(errResponse.status).toBe(400);
        httpMock.verify();
    });
});
