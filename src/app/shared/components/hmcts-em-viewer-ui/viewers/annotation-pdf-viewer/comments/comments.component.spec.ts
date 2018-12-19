import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, QueryList } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';

import { CommentsComponent } from './comments.component';
import { CommentItemComponent } from './comment-item/comment-item.component';
import { Annotation, Comment } from '../../../data/annotation-set.model';
import { Utils } from '../../../data/utils';
import { PdfService } from '../../../data/pdf.service';
import { AnnotationStoreService } from '../../../data/annotation-store.service';
import { EmLoggerService } from '../../../logging/em-logger.service';

class MockUtils {
  sortByLinePosition() {}
  difference() {}
}

class MockPdfService {
  pageNumber;

  constructor() {
    this.pageNumber = new Subject();
    this.pageNumber.next(1);
  }

  getPdfPages() {}
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

class MockCommentItemComponent extends CommentItemComponent {
  
  constructor() {
    const log = new EmLoggerService();
    super(null, null, null, null, null, log);
  }
}

describe('CommentsComponent', () => {
  const mockUtils = new MockUtils();
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
        EmLoggerService,
        { provide: Utils, useFactory: () => mockUtils },
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
    component.commentItems = new QueryList();
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
    it('should run preRun if isDataLoaded and call showAllComments', () => {
      spyOn(component, 'showAllComments');
      spyOn(component, 'preRun');
      component.ngOnInit();

      expect(component.showAllComments).toHaveBeenCalled();
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

  describe('sortCommentItemComponents', () => {
    it('should sort comments by their top position', () => {
      spyOn(mockUtils, 'sortByLinePosition').and.stub();
      component.commentItems = new QueryList();
      const sortedMap = component.sortCommentItemComponents();
      expect(sortedMap).not.toBeNull();
    });
  });

  describe('processSort', () => {
    const aCommentItemComponent = new MockCommentItemComponent();
    aCommentItemComponent.annotationHeight = 10;
    aCommentItemComponent.annotationTopPos = 100;
    aCommentItemComponent.annotationLeftPos = 20;

    const bCommentItemComponent = new MockCommentItemComponent();
    bCommentItemComponent.annotationHeight = 9;
    bCommentItemComponent.annotationTopPos = 90;
    bCommentItemComponent.annotationLeftPos = 40;

    it('should return the lowest annotationTop first', () => {
      spyOn(component, 'isAnnotationOnSameLine').and.returnValue(false);
      const result = component.processSort(aCommentItemComponent, bCommentItemComponent);
      expect(result).toBe(1);
    });

    it('should return the highest annotationTop last', () => {
      spyOn(component, 'isAnnotationOnSameLine').and.returnValue(false);
      const result = component.processSort(bCommentItemComponent, aCommentItemComponent);
      expect(result).toBe(-1);
    });

    it('should return the left annotation if on the same line', () => {
      spyOn(component, 'isAnnotationOnSameLine').and.returnValue(true);
      const result = component.processSort(aCommentItemComponent, bCommentItemComponent);
      expect(result).toBe(-1);
    });
  });

  describe('isAnnotationOnSameLine', () => {

    const aCommentItemComponent = new MockCommentItemComponent();
    aCommentItemComponent.annotationHeight = 10;

    const bCommentItemComponent = new MockCommentItemComponent();
    bCommentItemComponent.annotationHeight = 9;

    it('should return true if annotation topPos difference is lesser than height', () => {
      spyOn(mockUtils, 'difference').and.returnValue(5);
      const isSameLine = component.isAnnotationOnSameLine(aCommentItemComponent, bCommentItemComponent);
      expect(isSameLine).toBeTruthy();
    });

    it('should return false if annotation topPos difference is greater than height', () => {
      spyOn(mockUtils, 'difference').and.returnValue(15);
      const isSameLine = component.isAnnotationOnSameLine(aCommentItemComponent, bCommentItemComponent);
      expect(isSameLine).toBeFalsy();
    });
  });

  describe('isOverlapping', () => {
    it('should return the current comment', () => {
      const commentItemComponent = new MockCommentItemComponent();
      const returnedComment = component.isOverlapping(commentItemComponent, null);
      expect(returnedComment).toBe(commentItemComponent);
    });

    it('should calculate previous comment height if overlapping', () => {
      const previousCommentItemComponent = new MockCommentItemComponent();
      previousCommentItemComponent.commentTopPos = 10;
      previousCommentItemComponent.annotationTopPos = 10;
      previousCommentItemComponent.commentHeight = 10;

      const commentItemComponent = new MockCommentItemComponent();
      commentItemComponent.commentTopPos = 10;
      commentItemComponent.annotationTopPos = 10;

      const returnedComment = component.isOverlapping(commentItemComponent, previousCommentItemComponent);
      expect(returnedComment.commentTopPos).toBe(previousCommentItemComponent.commentTopPos + previousCommentItemComponent.commentHeight);
    });
  });

  describe('preRun', () => {
    it('should subscribe to pageNumSub', () => {
      component.preRun();

      expect(component['pageNumber']).toBe(1);
    });
  });

  describe('handleAnnotationBlur', () => {
    it('should call setToolBarUpdate to null', () => {
      spyOn(component, 'showAllComments');

      component.handleAnnotationBlur();
      expect(component.showAllComments).toHaveBeenCalled();
    });
  });

  describe('handleAnnotationClick', () => {
    it('should get the clicked annotation and call subjects with annotation', () => {
      spyOn(mockAnnotationStoreService, 'setAnnotationFocusSubject');
      spyOn(mockAnnotationStoreService, 'setCommentFocusSubject');
      spyOn(mockAnnotationStoreService, 'setToolBarUpdate');

      spyOn(mockAnnotationStoreService, 'getAnnotationById')
        .and.returnValue(Promise.resolve(new Annotation()));

      const target = document.createElement('div');
      component.handleAnnotationClick(target);
    });
  });
});
