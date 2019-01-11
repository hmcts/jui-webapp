import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import { Subject, of } from 'rxjs';
import { ContextualToolbarComponent } from './contextual-toolbar.component';
import { Annotation, Comment } from '../../../data/annotation-set.model';
import { PdfService } from '../../../data/pdf.service';
import { AnnotationStoreService } from '../../../data/annotation-store.service';
import { EmLoggerService } from '../../../logging/em-logger.service';
import { PdfRenderService } from '../../../data/pdf-render.service';

class MockPdfService {
  annotationSub: Subject<string>;

  constructor() {
    this.annotationSub = new Subject();
    this.annotationSub.next(null);
  }

  setAnnotationClicked(annotationId) {
    this.annotationSub.next(annotationId);
  }

  getAnnotationWrapper() {}
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

class MockViewerComponent {
  nativeElement: { querySelector() };
}

class MockPdfRenderService {
  getViewerElementRef() {}
}

describe('ContextualToolbarComponent', () => {
  let component: ContextualToolbarComponent;
  let fixture: ComponentFixture<ContextualToolbarComponent>;

  const mockPdfRenderService = new MockPdfRenderService();
  const mockViewerComponent = new MockViewerComponent();
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
    [
      new Comment('e337ce78-c4c8-4111-8756-7d44006b4428',
          '96978485-bb8a-4593-b7cc-3f11dc1d569a',
          '124575', null, new Date(), null, null, null,
          'Comment text')
    ],
    [],
    'highlight'
  );

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContextualToolbarComponent ],
      providers: [
        EmLoggerService,
        {provide: PdfService, useFactory: () => mockPdfService},
        {provide: PdfRenderService, useFactory: () => mockPdfRenderService},
        {provide: AnnotationStoreService, useFactory: () => mockAnnotationStoreService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContextualToolbarComponent);

    const mockBoundingRect = {
      x: 1,
      y: 2
    };

    const mockNativeElement = { querySelector() {}, getBoundingClientRect() {} };
    spyOn(mockNativeElement, 'getBoundingClientRect').and.returnValue({getBoundingClientRect() {return mockBoundingRect; }});
    spyOn(mockNativeElement, 'querySelector').and.returnValue({getBoundingClientRect() {return mockBoundingRect; }});
    mockViewerComponent.nativeElement = mockNativeElement;
    spyOn(mockPdfRenderService, 'getViewerElementRef').and.returnValue(mockViewerComponent);
    spyOn(mockPdfService, 'getAnnotationWrapper').and.returnValue(mockViewerComponent);

    spyOn(mockAnnotationStoreService, 'getToolbarUpdate').and
      .returnValue(of({annotation: null}));
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('showToolbar', () => {
    it('should set showtoolbar to false', () => {
      component.hideToolBar();
      expect(component.isShowToolbar).toBe(false);
    });
  });

  describe('showToolbar', () => {
    it('should set showtoolbar to true', () => {
      component.showToolBar(dummyAnnotation, false);
      expect(component.isShowToolbar).toBeTruthy();
    });

    it('should set showDelete to false if no option is provided', () => {
      component.showToolBar(dummyAnnotation);
      expect(component.showDelete).toBeFalsy();
    });

    it('should set the component annotationId', () => {
      component.showToolBar(dummyAnnotation);
      expect(component.annotation).toBe(dummyAnnotation);
    });
  });

  describe('hideToolbar', () => {
    it('should set the isShowToolbar variable to false', () => {
      component.hideToolBar();
      expect(component.isShowToolbar).toBeFalsy();
      expect(component.showDelete).toBeDefined();
    });
  });

  describe('handleCommentBtnClick', () => {
    it('should call mockAnnotationStoreService and hide the toolbar', fakeAsync(() => {
        dummyAnnotation.comments = [];
      component.annotation = dummyAnnotation;
      spyOn(mockAnnotationStoreService, 'setCommentFocusSubject');
      spyOn(mockAnnotationStoreService, 'addComment');

        component.handleCommentBtnClick();
        tick(500);
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(mockAnnotationStoreService.setCommentFocusSubject).toHaveBeenCalled();
            expect(mockAnnotationStoreService.addComment).toHaveBeenCalled();
        });
    }));
  });

  describe('handleHighlightBtnClick', () => {
    it('should call pdfservice with null value and hide the toolbar', () => {
      spyOn(mockPdfService, 'setAnnotationClicked').and.callFake((arg) => {
        expect(arg).toBeNull();
      });

      component.handleHighlightBtnClick();
      expect(component.isShowToolbar).toBeFalsy();
    });
  });

  describe('handleDeleteBtnClick', () => {
    it('should call annotationStoreService and hide the toolbar', () => {
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

  describe('getRelativePosition', () => {
    it('should return an object with left and top fields', () => {
      const toolpos = component.getRelativePosition('2ff3514f-1b0d-499a-991a-fb17881ead7c');
      expect(toolpos).toBeTruthy();
    });
  });
});
