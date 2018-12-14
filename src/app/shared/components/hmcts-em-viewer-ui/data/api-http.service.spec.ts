import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, inject, async } from '@angular/core/testing';
import { ApiHttpService } from './api-http.service';
import { AnnotationSet, Annotation } from './annotation-set.model';
import { DocumentTask } from './document-task.model';
import { TransferState } from '@angular/platform-browser';
import { PLATFORM_ID } from '@angular/core';
import { EmLoggerService } from '../logging/em-logger.service';

class MockTransferState {
    hasKey() {}
    remove() {}
    set() {}
}

describe('ApiHttpService', () => {
    const mockTransferState = new MockTransferState();
    let httpMock: HttpTestingController;
    let apiHttpService: ApiHttpService;
    const baseUrl = 'http://localhost';
    const dmDocumentId = 'ad88d12c-8526-49b6-ae5e-3f7ea5d08168';
    const dummyAnnotationSet = new AnnotationSet(
        '', '', null,
        null,
        null, null,
        null,
        dmDocumentId,
        null
    );

    const dummyAnnotation = new Annotation(
        'f6225689-29ab-4e0d-9bea-8519a06d16f9',
        'ae2133a4-8dc5-430b-bb20-5290bd801f94',
        '123141',
        new Date(), null,
        '123141', null,
        new Date(),
        dmDocumentId,
        1,
        'FFFF00',
        [],
        [],
        'highlight'
    );

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                EmLoggerService,
                ApiHttpService,
                { provide: TransferState, useFactory: () => mockTransferState},
                { provide: PLATFORM_ID, useValue: 'browser' },
            ],
            imports: [
                HttpClientTestingModule
            ]
        });

      apiHttpService = TestBed.get(ApiHttpService);
      httpMock = TestBed.get(HttpTestingController);
      });


    it('should be created', inject([ApiHttpService], (service: ApiHttpService) => {
        expect(service).toBeTruthy();
    }));

    it('should set base URL', () => {
        const url = 'testUrl';
        apiHttpService.setBaseUrl(url);
        expect(apiHttpService.getBaseUrl()).toBe(url);
    });

    describe('createAnnotationSet', () => {
        it('should return IAnnotationSet response', () => {
            const requestBody = {
                documentId: dmDocumentId,
                id: '6d1f5e09-98ad-4891-aecc-936282b06148'
            };
            apiHttpService.createAnnotationSet(baseUrl, requestBody).subscribe((response) => {
                expect(response.body).toEqual(jasmine.any(AnnotationSet));
            });

            const req = httpMock.expectOne(`${baseUrl}/em-anno/annotation-sets`);
            expect(req.request.method).toBe('POST');
            expect(req.request.body.documentId).toBe(dmDocumentId);
            expect(req.request.body.id).toBeTruthy();
            req.flush(dummyAnnotationSet);
        });
    });

    describe('fetch', () => {
        it('should return IAnnotationSet response', () => {
            apiHttpService.fetch(baseUrl, dmDocumentId).subscribe((response) => {
                expect(response.body).toEqual(jasmine.any(AnnotationSet));
                expect(response.body.documentId).toBe(dmDocumentId);
            });

            const req = httpMock.expectOne(`${baseUrl}/em-anno/annotation-sets/${dmDocumentId}`);
            expect(req.request.method).toBe('GET');
            req.flush(dummyAnnotationSet);
        });
    });

    // describe('documentTask', () => {
    //     it('should return IDocumentTask response', () => {
    //         const outputDocumentId = 'd29e4aca-7b4c-43e9-a594-0b3b50dc216e';
    //         const dummyDocumentTask = new DocumentTask(
    //             100, dmDocumentId, outputDocumentId, 'DONE',
    //             null, '2018-10-17 13:26:04.891', '123141',
    //             '123141', '2018-10-17 13:26:05.767');

    //         apiHttpService.setBaseUrl(baseUrl);
    //         apiHttpService.documentTask(dmDocumentId, outputDocumentId).subscribe((response) => {
    //             expect(response.body).toEqual(jasmine.any(DocumentTask));
    //         });

    //         const req = httpMock.expectOne(`${baseUrl}/em-npa/document-tasks`);
    //         expect(req.request.method).toBe('POST');
    //         expect(req.request.body.inputDocumentId).toBe(dmDocumentId);
    //         expect(req.request.body.outputDocumentId).toBe(outputDocumentId);
    //         req.flush(dummyDocumentTask);
    //     });
    // });

    describe('delete annotation', () => {
        it('should return IAnnotation response', async(() => {


            apiHttpService.setBaseUrl(baseUrl);

            apiHttpService.deleteAnnotation(dummyAnnotation).subscribe((response) => {
                expect(response.body).toEqual(jasmine.any(Annotation));
            });

            const req = httpMock.expectOne(`${baseUrl}/em-anno/annotations/${dummyAnnotation.id}`);
            expect(req.request.method).toBe('DELETE');
            req.flush(dummyAnnotation);
        }));
    });

    describe('save annotation', () => {
        it('should return IAnnotation response', async(() => {
            apiHttpService.setBaseUrl(baseUrl);

            apiHttpService.saveAnnotation(dummyAnnotation).subscribe((response) => {
                expect(response.body).toEqual(jasmine.any(Annotation));
            });

            const req = httpMock.expectOne(`${baseUrl}/em-anno/annotations`);
            expect(req.request.method).toBe('POST');
            req.flush(dummyAnnotation);
        }));
    });

    afterEach(() => {
     //   httpMock.verify();
    });
});
