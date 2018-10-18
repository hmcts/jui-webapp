import { TestBed, inject, async } from '@angular/core/testing';
import { Subject, Observable } from 'rxjs';

import { AnnotationStoreService } from './annotation-store.service';
import { ApiHttpService } from './api-http.service';
import { PdfAdapter } from './pdf-adapter';
import { PdfService } from './pdf.service';
import { Annotation, AnnotationSet } from './annotation-set.model';

declare global { interface Window { PDFAnnotate: any; } }

class MockPDFAnnotate {
  setStoreAdapater() {}
}

class MockPdfAdapter {
  annotationChangeSubject: Subject<{ type: String, annotation: Annotation }>;

  constructor() {
    this.annotationChangeSubject = new Subject<{ type: String, annotation: Annotation }>();
  }

  setStoreData(annotationData) {}
  getStoreAdapter(callback) {}
}

class MockApiHttpService {
  saveAnnotation() {}
}

class MockApiService {
}

fdescribe('AnnotationStoreService', () => {
  window.PDFAnnotate = new MockPDFAnnotate();

  const mockApiHttpService = new MockApiHttpService();
  const mockPdfAdapter = new MockPdfAdapter();
  const mockApiService = new MockApiService();

  let pdfAdapaterSpy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AnnotationStoreService,
        { provide: ApiHttpService, useFactory: () => mockApiHttpService },
        { provide: PdfAdapter, useFactory: () => mockPdfAdapter},
        { provide: PdfService, useFactory: () => mockApiService},
        ]
    });

    pdfAdapaterSpy = TestBed.get(PdfAdapter);
    pdfAdapaterSpy.annotationChangeSubject.next({type: 'addAnnotation', annotation: null });
  });

  it('should be created', inject([AnnotationStoreService], (service: AnnotationStoreService) => {
    expect(service).toBeTruthy();
  }));

  // describe('preLoad with annotation data', () => {
  //   const dmDocumentId = 'ad88d12c-8526-49b6-ae5e-3f7ea5d08168';
  //   const dummyAnnotationSet = new AnnotationSet(
  //     '3351ebe9-a671-45c0-a36e-d348c40afb20',
  //     '123141', new Date(),
  //     '123141', new Date(), dmDocumentId,
  //     []
  // );
    // it('should set pdfStoreAdapter with data', inject([AnnotationStoreService], (service: AnnotationStoreService)  => {
    //   spyOn(pdfAdapaterSpy, 'setStoreData');

    //   // spyOn(window.PDFAnnotate, 'setStoreAdapater').and.callFake(function() {});
    //   spyOn(window.PDFAnnotate, 'setStoreAdapater').and.returnValue(
    //     new Promise((resolve) => {
    //       resolve({pdfInfo: { numPages: 65}});
    //     }
    //   ));
    //   service.preLoad(dummyAnnotationSet);
    //   expect(pdfAdapaterSpy.setStoreData).toHaveBeenCalled();
    // }));
  // });

  // describe('handleAnnotationEvent', () => {
  //   it('should call saveAnnotation for addAnnotation event', async(inject([AnnotationStoreService], (service: AnnotationStoreService) => {
  //     spyOn(mockApiHttpService, 'saveAnnotation').and.returnValue(Observable.of({response: 'ok', error: 'not ok'}));

  //     service.handleAnnotationEvent({type: 'addAnnotation', annotation: null});
  //     expect(mockApiHttpService.saveAnnotation).toHaveBeenCalled();
  //   })));
  // });


});
