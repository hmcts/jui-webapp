import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';

import { CommentsComponent } from './comments.component';
import { AnnotationStoreService } from '../../data/annotation-store.service';
import { PdfService } from '../../data/pdf.service';
import { Annotation, Comment, Rectangle } from '../../data/annotation-set.model';

declare global { interface Window { PDFAnnotate: any; } }

class PDFAnnotate {
  UI;
}

class MockPdfService {
  pageNumber;

  constructor() {
    this.pageNumber = new Subject();
    this.pageNumber.next(1);
  }

  getPageNumber() {
    return this.pageNumber;
  }
  getDataLoadedSub() {}
}

class MockAnnotationStoreService {
  getAnnotationsForPage() {
    return new Promise((resolve) => {
      resolve([]);
    });
  }
  setAnnotationFocusSubject() {}
  setCommentFocusSubject() {}
  setToolBarUpdate() {}

  getAnnotationById() {
    const annotation = new Annotation('96978485-bb8a-4593-b7cc-3f11dc1d569a',
                    '1058c847-f527-41af-ba7c-40014ad2174b',
                    '124575', new Date(), null, null, null, null,
                    'caf76a6b-1c40-4291-9402-21f82c1ba476', 1,
                    'FFFF00', [], [], 'highlight');
    return new Promise((resolve) => {
      resolve(annotation);
    });
  }

  getCommentsForAnnotation() {
    const comments = [
      new Comment('e337ce78-c4c8-4111-8756-7d44006b4428',
                  '96978485-bb8a-4593-b7cc-3f11dc1d569a',
                  '124575', null, new Date(), null, null, null,
                  'Comment text'),
      new Comment('a11c3c66-19e8-4d52-bf7b-9bd7d6348407',
      '96978485-bb8a-4593-b7cc-3f11dc1d569a',
      '124575', null, new Date(), null, null, null,
      'Comment text 2')
    ];
    return new Promise((resolve) => {
      resolve(comments);
    });
  }
}

describe('CommentsComponent', () => {
  const mockPDFAnnotate = new PDFAnnotate();
  window.PDFAnnotate = mockPDFAnnotate;

  const mockAnnotationStoreService = new MockAnnotationStoreService();
  const mockPdfService = new MockPdfService();
  let component: CommentsComponent;
  let fixture: ComponentFixture<CommentsComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [
        CommentsComponent
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: PdfService, useFactory: () => mockPdfService },
        { provide: AnnotationStoreService, useFactory: () => mockAnnotationStoreService }
      ],
      imports: [
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    spyOn(mockPdfService, 'getPageNumber')
      .and.returnValue(Observable.of(1));

    fixture = TestBed.createComponent(CommentsComponent);
    component = fixture.componentInstance;

    spyOn(component, 'ngAfterViewInit').and.stub();
    spyOn(mockPdfService, 'getDataLoadedSub').and.returnValue(of(true));
    spyOn(mockAnnotationStoreService, 'getAnnotationsForPage').and
    .callFake(() => {
        return new Promise((resolve) => {
          resolve({ annotations: [new Annotation()] });
        });
      });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should run preRun if isDataLoaded', () => {
      spyOn(component, 'preRun');

      component.ngOnInit();

      expect(component.preRun).toHaveBeenCalled();
    });
  });

  describe('ngOnDestroy', () => {
    it('should unsubscribe from pageNumSub', () => {
      spyOn(component['pageNumSub'], 'unsubscribe');
      component.ngOnDestroy();
      expect(component['pageNumSub'].unsubscribe).toHaveBeenCalled();
    });

    it('should unsubscribe from dataLoadedSub', () => {
      spyOn(component['dataLoadedSub'], 'unsubscribe');
      component.ngOnDestroy();
      expect(component['dataLoadedSub'].unsubscribe).toHaveBeenCalled();
    });
  });

  describe('preRun', () => {
    it('should subscribe to pageNumSub', () => {
      spyOn(component, 'showAllComments');

      component.preRun();

      expect(component['pageNumber']).toBe(1);
      expect(component.showAllComments).toHaveBeenCalled();
    });
  });

  describe('sortByY', () => {
    it('should sort annotations by their Y prop', () => {
      const anno1 = new Annotation(null, null, null, null, null, null, null, null, null, null, null, null,
        [new Rectangle(null, null, null, null, null, null, null, null, null, null, 10)]);
      const anno2 = new Annotation(null, null, null, null, null, null, null, null, null, null, null, null,
          [new Rectangle(null, null, null, null, null, null, null, null, null, null, 20)]);
      const anno3 = new Annotation(null, null, null, null, null, null, null, null, null, null, null, null,
        [new Rectangle(null, null, null, null, null, null, null, null, null, null, 30)]);

      const unsortAnno = [anno2, anno3, anno1];
      component.sortByY(unsortAnno);
      expect(unsortAnno[0].rectangles[0].y).toBe(anno1.rectangles[0].y);
      expect(unsortAnno[1].rectangles[0].y).toBe(anno2.rectangles[0].y);
      expect(unsortAnno[2].rectangles[0].y).toBe(anno3.rectangles[0].y);
    });
  });

  describe('handleAnnotationBlur', () => {
    it('should call setToolBarUpdate to null', () => {
      spyOn(mockAnnotationStoreService, 'setToolBarUpdate');
      spyOn(component, 'showAllComments');

      component.handleAnnotationBlur();

      expect(mockAnnotationStoreService.setToolBarUpdate).toHaveBeenCalled();
      expect(component.showAllComments).toHaveBeenCalled();
    });
  });

});
