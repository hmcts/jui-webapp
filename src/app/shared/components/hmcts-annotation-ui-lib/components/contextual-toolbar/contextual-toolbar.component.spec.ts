import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';
import { Subject, of } from 'rxjs';

import { ContextualToolbarComponent } from './contextual-toolbar.component';
import { PdfService } from '../../data/pdf.service';
import { AnnotationStoreService } from '../../data/annotation-store.service';
import { Annotation } from '../../data/annotation-set.model';

class MockPdfService {
  annotationSub: Subject<string>;

  constructor() {
    this.annotationSub = new Subject();
    this.annotationSub.next(null);
  }

  setAnnotationClicked(annotationId) {
    this.annotationSub.next(annotationId);
  }
}

class MockAnnotationStoreService {
  contextualOptions: Subject<{annotation: Annotation, showDelete?: boolean}>;

  constructor() {
    this.contextualOptions = new Subject();
    this.contextualOptions.next(null);
  }
  setCommentFocusSubject() {}
  setAnnotationFocusSubject() {}
  addComment() {}
  getToolbarUpdate() {}
  clearAnnotations() {}
  deleteAnnotationById() {}
  getAnnotationSaved(): Subject<{annotation: Annotation, showDelete?: boolean}> {
    return this.contextualOptions;
  }
}

describe('ContextualToolbarComponent', () => {
  let component: ContextualToolbarComponent;
  let fixture: ComponentFixture<ContextualToolbarComponent>;

  const mockPdfService = new MockPdfService();
  const mockAnnotationStoreService = new MockAnnotationStoreService();
  const dummyAnnotation = new Annotation(
    '2ff3514f-1b0d-499a-991a-fb17881ead7c',
    'dc38dea3-ff0f-461a-a01d-3a72281f3b76',
    '96866',
    new Date(), null,
    '96866',
    null,
    new Date(),
    'bcc9ab5e-11e8-4fd4-8b38-d69de71fb437',
    1,
    'FFFF00',
    [],
    [],
    'highlight'
  );

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContextualToolbarComponent ],
      providers: [
        {provide: PdfService, useFactory: () => mockPdfService},
        {provide: AnnotationStoreService, useFactory: () => mockAnnotationStoreService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContextualToolbarComponent);

    const mockDocument = fixture.componentRef.injector.get(DOCUMENT);
    spyOn(mockDocument, 'querySelector').and.returnValue(
      document.createElement('div')
    );

    spyOn(mockAnnotationStoreService, 'getToolbarUpdate').and
      .returnValue(of({annotation: null}));
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('showToolbar', () => {
    xit('should set showtoolbar to false', () => {
      component.hideToolBar();
      expect(component.isShowToolbar).toBe(false);
    });
  });

  describe('showToolbar', () => {
    xit('should set showtoolbar to true', () => {
      component.showToolBar(dummyAnnotation, false);
      expect(component.isShowToolbar).toBeTruthy();
    });

    xit('should set showDelete to false if no option is provided', () => {
      component.showToolBar(dummyAnnotation);
      expect(component.showDelete).toBeFalsy();
    });

    xit('should set the component annotationId', () => {
      component.showToolBar(dummyAnnotation);
      expect(component.annotation).toBe(dummyAnnotation);
    });
  });

  describe('hideToolbar', () => {
    xit('should set the isShowToolbar variable to false', () => {
      component.hideToolBar();
      expect(component.isShowToolbar).toBeFalsy();
      expect(component.showDelete).toBeDefined();
    });
  });

  describe('handleCommentBtnClick', () => {
    it('should call mockAnnotationStoreService and hide the toolbar', () => {
      component.annotation = dummyAnnotation;
      spyOn(mockAnnotationStoreService, 'setCommentFocusSubject');
      spyOn(mockAnnotationStoreService, 'addComment');
    });
  
    xit('should call pdfservice and hide the toolbar', () => {
      spyOn(mockPdfService, 'setAnnotationClicked');
      component.handleCommentBtnClick();

      expect(mockAnnotationStoreService.addComment).toHaveBeenCalled();
      expect(mockAnnotationStoreService.setCommentFocusSubject).toHaveBeenCalled();
      expect(component.isShowToolbar).toBeFalsy();
    });
  });

  describe('handleHighlightBtnClick', () => {
    xit('should call pdfservice with null value and hide the toolbar', () => {
      spyOn(mockPdfService, 'setAnnotationClicked').and.callFake((arg) => {
        expect(arg).toBeNull();
      });

      component.handleHighlightBtnClick();
      expect(component.isShowToolbar).toBeFalsy();
    });
  });

  describe('handleDeleteBtnClick', () => {
    xit('should call annotationStoreService and hide the toolbar', () => {
      spyOn(mockAnnotationStoreService, 'deleteAnnotationById').and.callFake((arg) => {
        expect(arg).toBe('2ff3514f-1b0d-499a-991a-fb17881ead7c');
      });

      spyOn(mockAnnotationStoreService, 'setAnnotationFocusSubject').and.stub();
      component.annotation = new Annotation('2ff3514f-1b0d-499a-991a-fb17881ead7c',
              null, null, null, null, null, null, null, null, null, null, null);
      component.handleDeleteBtnClick();

      expect(mockAnnotationStoreService.setAnnotationFocusSubject).toHaveBeenCalled();
      expect(mockAnnotationStoreService.deleteAnnotationById).toHaveBeenCalled();
      expect(component.isShowToolbar).toBeFalsy();
    });
  });

  describe('handleClearClick', () => {
    xit('should call pdfservice with null value and hide the toolbar', () => {
      spyOn(mockAnnotationStoreService, 'clearAnnotations').and.returnValue(null);

      component.handleClearAnnotations();
      expect(mockAnnotationStoreService.clearAnnotations).toHaveBeenCalled();
    });
  });

  describe('getRelativePosition', () => {
    xit('should return an object with left and top fields', () => {
      const toolpos = component.getRelativePosition('2ff3514f-1b0d-499a-991a-fb17881ead7c');
      expect(toolpos).toBeTruthy();
    });
  });
});
