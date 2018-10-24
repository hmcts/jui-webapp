import { TestBed, inject, async } from '@angular/core/testing';
import { Subject, Observable, Subscription, of } from 'rxjs';

import { AnnotationStoreService } from './annotation-store.service';
import { ApiHttpService } from './api-http.service';
import { PdfAdapter } from './pdf-adapter';
import { PdfService } from './pdf.service';
import { Annotation, AnnotationSet, Comment } from './annotation-set.model';

declare global { interface Window { PDFAnnotate: any; } }

class MockPDFAnnotate {
  setStoreAdapater(storeAdapter: any) {}
}

class MockPdfAdapter {
  annotationSet: AnnotationSet;
  annotations: [Annotation];

  private annotationChangeSubject: Subject<{ type: String, annotation: Annotation }>;

  constructor() {
    this.annotationChangeSubject = new Subject<{ type: String, annotation: Annotation }>();
  }

  getAnnotationChangeSubject() {
    return this.annotationChangeSubject;
  }

  setStoreData(annotationData) {}
  getStoreAdapter(callback) {}
  editComment() {}
}

class MockApiHttpService {
  saveAnnotation() {}
  deleteAnnotation() {}
}

class MockApiService {
}

describe('AnnotationStoreService', () => {
  const mockPDFAnnotate = new MockPDFAnnotate();
  window.PDFAnnotate = mockPDFAnnotate;

  const mockApiHttpService = new MockApiHttpService();
  const mockPdfAdapter = new MockPdfAdapter();
  const mockApiService = new MockApiService();

  const dmDocumentId = 'ad88d12c-8526-49b6-ae5e-3f7ea5d08168';
  const dummyAnnotationSet = new AnnotationSet(
    '3351ebe9-a671-45c0-a36e-d348c40afb20',
    '123141', new Date(),
    '123141', new Date(), dmDocumentId,
    []
  );
  const annotations = [new Annotation(
    'a9a04b1b-8a19-41f4-8a04-b55915fc4635',
    dummyAnnotationSet.id,
    '123141',
    new Date(),
    '123141',
    new Date(),
    dmDocumentId,
    1,
    'COLOR',
    [],
    [],
    'highlight'
    )];

  const dummyComment = new Comment(
    '84a2ae2b-4177-4e9d-bd70-2696c71a0820',
    annotations[0].id,
    '123141',
    new Date(),
    '123141',
    new Date(),
    'comment string'
  );

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AnnotationStoreService,
        { provide: ApiHttpService, useFactory: () => mockApiHttpService },
        { provide: PdfAdapter, useFactory: () => mockPdfAdapter},
        { provide: PdfService, useFactory: () => mockApiService},
        ]
    });

    spyOn(mockPdfAdapter, 'getAnnotationChangeSubject').and.returnValue(of({type: null, annotation: null}));
  });

  describe('constructor', () => {
    it('should be created', inject([AnnotationStoreService], (service: AnnotationStoreService) => {
      expect(service).toBeTruthy();
    }));

    it('should initialise commentBtnSubject', inject([AnnotationStoreService], (service: AnnotationStoreService) => {
      expect(service.commentBtnSubject).toBeDefined();
    }));

    it('should initialise contextualToolBarOptions', inject([AnnotationStoreService], (service: AnnotationStoreService) => {
      expect(service.getToolbarUpdate()).toBeDefined();
    }));

    it('should subscribe to pdfAdapater annotationChangeSub',  inject([AnnotationStoreService], (service: AnnotationStoreService) => {
       expect(mockPdfAdapter.getAnnotationChangeSubject).toHaveBeenCalled();
    }));
  });

  describe('onDestroy', () => {
    it('should unsubscribe from the annotationChangeSubscription', inject([AnnotationStoreService], (service: AnnotationStoreService) => {
      const annotationChangeSubscription = service['annotationChangeSubscription'];
      spyOn(annotationChangeSubscription, 'unsubscribe');
      service.ngOnDestroy();
      expect(annotationChangeSubscription.unsubscribe).toHaveBeenCalled();
    }));
  });

  describe('setCommentBtnSubject', () => {
    it('should set the commentBtnSubject', inject([AnnotationStoreService], (service: AnnotationStoreService) => {
      const commentId = '99750ac4-10c9-401e-b127-c043bf4e80fc';
      service.getCommentBtnSubject().subscribe((subId) => {
        expect(subId).toBe(commentId);
      });

      service.setCommentBtnSubject(commentId);
    }));
  });

  describe('preLoad with annotation data', () => {

    // it('should set pdfStoreAdapter with data', inject([AnnotationStoreService], (service: AnnotationStoreService)  => {
    //   spyOn(pdfAdapaterSpy, 'setStoreData');

    //   spyOn(mockPDFAnnotate, 'setStoreAdapater').and.returnValue(
    //     new Promise((resolve) => {
    //       resolve({pdfInfo: { numPages: 65}});
    //     }
    //   ));
    //   service.preLoad(dummyAnnotationSet);
    //   expect(pdfAdapaterSpy.setStoreData).toHaveBeenCalled();
    // }));
  });

  describe('handleAnnotationEvent', () => {
    it('should call saveAnnotation for addAnnotation event', async(inject([AnnotationStoreService], (service: AnnotationStoreService) => {
      spyOn(mockApiHttpService, 'saveAnnotation').and.returnValue(Observable.of({response: 'ok', error: 'not ok'}));

      service.handleAnnotationEvent({type: 'addAnnotation', annotation: null});
      expect(mockApiHttpService.saveAnnotation).toHaveBeenCalled();
    })));
  });

  // describe('saveData', () => {

  //   spyOnProperty(mockPdfAdapter, 'annotationSet', 'get').and.returnValue(
  //     dummyAnnotationSet);
  //   spyOnProperty(mockPdfAdapter, 'annotations', 'get').and.returnValue(
  //       annotations);
  // });

  describe('saveAnnotation', () => {
    it('should call httpservice to save annotation', inject([AnnotationStoreService], (service: AnnotationStoreService) => {
      spyOn(mockApiHttpService, 'saveAnnotation').and.returnValue(of('ok'));

      service.saveAnnotation(annotations[0]);
      expect(mockApiHttpService.saveAnnotation).toHaveBeenCalledWith(annotations[0]);
    }));
  });

  describe('deleteAnnotation', () => {
    it('should call httpservice to delete annotation', inject([AnnotationStoreService], (service: AnnotationStoreService) => {
      spyOn(mockApiHttpService, 'deleteAnnotation').and.returnValue(of('ok'));

      service.deleteAnnotation(annotations[0]);
      expect(mockApiHttpService.deleteAnnotation).toHaveBeenCalledWith(annotations[0]);
    }));
  });

  describe('editComment', () => {
    it('should call pdfAdapater to edit comment', inject([AnnotationStoreService], (service: AnnotationStoreService) => {
      spyOn(mockPdfAdapter, 'editComment');

      service.editComment(dummyComment);
      expect(mockPdfAdapter.editComment).toHaveBeenCalledWith(dummyComment);
    }));
  });
});
