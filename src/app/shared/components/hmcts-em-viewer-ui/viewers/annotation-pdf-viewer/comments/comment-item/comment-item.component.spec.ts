import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgForm, FormsModule } from '@angular/forms';
import {Subject, of} from 'rxjs';
import { NO_ERRORS_SCHEMA, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { CommentItemComponent } from './comment-item.component';
import { Rectangle, Annotation, Comment } from '../../../../data/annotation-set.model';
import { AnnotationStoreService } from '../../../../data/annotation-store.service';
import { PdfService } from '../../../../data/pdf.service';
import { Utils } from '../../../../data/utils';


class MockAnnotationStoreService {
  comment: Comment;
  commentBtnSubject: Subject<string>;

  constructor() {
    this.commentBtnSubject = new Subject();
    this.commentBtnSubject.next(null);
  }
  editComment(comment) {
    this.comment = comment;
  }
  setAnnotationFocusSubject() {}
  getCommentFocusSubject() {}
  deleteComment() {}
  setCommentBtnSubject() {}
  getCommentBtnSubject(): Subject<string> {
    return this.commentBtnSubject;
  }
}

class MockPdfService {
    getDataLoadedSub() {}
    getRelativePosition() {}
}

class MockUtils {
  sortByX() {}
  sortByY() {}
  getAnnotationLineHeight() {}
}

describe('CommentItemComponent', () => {
  let component: CommentItemComponent;
  let fixture: ComponentFixture<CommentItemComponent>;
  let commentForm: any;

  const comment = new Comment(
    '71d5914c-163c-4e91-9788-101e1fd1c171',
    'f7dd4059-b384-4e57-ac91-aac541b8f8ff',
    '96866', {forename: 'test', surname: 'test', email: 'test@test'},
    new Date(),
    '96866', {forename: 'test', surname: 'test', email: 'test@test'},
    new Date(),
    'A new comment'
    );

  const rectangleBottom = new Rectangle('63225ccd-61fe-4aa7-8c5f-cf9bc31cc424',
    '4bcc2edf-487d-4ee0-a5b0-a3cdfe93bf1a',
    '123141', null, new Date(), null, null, null,
    9.6, 60,
    50, 87);
  const rectangleTop = new Rectangle('de8155b9-5a8e-46f0-b771-d39d3906eeb6',
    '4bcc2edf-487d-4ee0-a5b0-a3cdfe93bf1a',
    '123141', null, new Date(), null, null, null,
    9.6, 50,
    68, 70);
  
  const annotation = new Annotation(
    'ca68f5b0-a9dd-4f8e-95b8-3cad024c54be',
    '563ba4f8-47af-4652-961a-1274059269c6',
    '96866',
    new Date(), {forename: 'test', surname: 'test', email: 'test@test'},
    '96866', {forename: 'test', surname: 'test', email: 'test@test'},
    new Date(),
    '3b82dea5-cb7f-46bc-95f0-198b41a29bde',
    1,
    'FFFF00',
    [comment],
    [rectangleBottom, rectangleTop],
    'highlight'
  );

  const mockPdfService = new MockPdfService();
  const mockAnnotationStoreService = new MockAnnotationStoreService();
  const mockUtils = new MockUtils();
  const mockComment = new Comment(
    'cfe6bdad-8fc5-4240-adfc-d583bdaee47a',
    '22a3bde9-18d6-46b2-982b-36e0a631ea4b',
    '111111', null, new Date(), null, null, null,
    'comment content');

  beforeEach(async(() => {
    commentForm = <NgForm>{
      value: {
          commentId: 'ca68f5b0-a9dd-4f8e-95b8-3cad024c54be',
          annotationId: 'ca68f5b0-a9dd-4f8e-95b8-3cad024c54be',
          content: 'Comment text'
      }
    };
    TestBed.configureTestingModule({
      declarations: [ CommentItemComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: AnnotationStoreService, useFactory: () => mockAnnotationStoreService },
        { provide: PdfService, useFactory: () => mockPdfService },
        { provide: Utils, useFactory: () => mockUtils },
        Renderer2
      ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CommentItemComponent);
    const mockDocument = fixture.componentRef.injector.get(DOCUMENT);
    spyOn(mockDocument, 'querySelectorAll').and
      .returnValue([document.createElement('div')]);
    component = fixture.componentInstance;
    spyOn(mockAnnotationStoreService, 'getCommentFocusSubject').and
      .returnValue(of({annotation: annotation, showButton: false}));
    spyOn(mockPdfService, 'getDataLoadedSub').and
          .returnValue(of(true));

    spyOn(component, 'getRelativePosition').and.returnValue(rectangleTop.y);
    component.comment = comment;
    component.annotation = annotation;

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onInit', () => {
    it('should hideTheButtonsAndUnfocus', () => {
      component.ngOnInit();
      expect(component['focused']).toBeFalsy();
      expect(component['hideButton']).toBeTruthy();
    });

    it('should subscribe to handle comment btn subject', () => {
      spyOn(mockAnnotationStoreService, 'getCommentBtnSubject').and
        .returnValue(of(null));
      component.ngOnInit();
      expect(mockAnnotationStoreService.getCommentBtnSubject).toHaveBeenCalled();
    });

    it('should call handleShowBtn if subject has id of comment item id', () => {
      spyOn(mockAnnotationStoreService, 'getCommentBtnSubject').and
        .returnValue(of(component.comment.id));
      component.ngOnInit();
      expect(component['hideButton']).toBeFalsy();
    });

    it('should call handleShowBtn if subject does not match', () => {
      spyOn(mockAnnotationStoreService, 'getCommentBtnSubject').and
        .returnValue(of('some other id'));
      component.ngOnInit();
      expect(component['hideButton']).toBeTruthy();
    });

    it('should set the annotation height, leftPos and topPos on dataloaded', () => {
      spyOn(mockUtils, 'getAnnotationLineHeight').and.returnValue(rectangleTop.height);
      component.ngOnInit();
      expect(component.annotationTopPos).toBe(rectangleTop.y);
      expect(component.commentTopPos).toBe(component.annotationTopPos);
      expect(component.annotationHeight).toBe(rectangleTop.height);
      expect(component.annotationLeftPos).toBe(rectangleBottom.x);
    });

    it('should emit commentRendered event emitter on dataloaded', (done) => {
      component.commentRendered.subscribe((commentRendered: boolean) => {
        expect(commentRendered).toBeTruthy();
        done();
     });
      component.ngOnInit();
    });
  });

  describe('onDestroy', () => {
    it('should unsubscribe from the commentBtnSub', () => {
      const commentBtnSub = component['commentBtnSub'];
      spyOn(commentBtnSub, 'unsubscribe');
      component.ngOnDestroy();
      expect(commentBtnSub.unsubscribe).toHaveBeenCalled();
    });
  });

  describe('handleShowBtn', () => {
    it('should set hideButton to false', () => {
      component.handleShowBtn();
      expect(component['hideButton']).toBeFalsy();
    });
  });

  describe('handleHideBtn', () => {
    it('should set hideButton to true', () => {
      component.handleHideBtn();
      expect(component['hideButton']).toBeTruthy();
    });
  });

  describe('handleCommentClick', () => {
    it('should update the commentBtn subject with its own comment ID', () => {
      spyOn(mockAnnotationStoreService, 'setCommentBtnSubject');
      spyOn(mockAnnotationStoreService, 'setAnnotationFocusSubject');

      const mockEvent = {
        stopPropagation() {}
      };
      component.handleCommentClick(mockEvent);

      expect(mockAnnotationStoreService.setCommentBtnSubject)
        .toHaveBeenCalledWith(component.comment.id);
    });
  });

  describe('convertFormToComment', () => {
    it('should convert form to comment', async(() => {
      const actual = component.convertFormToComment(commentForm);
      expect(actual instanceof Comment).toBeTruthy();
      expect(actual.id).toEqual(comment.id);
      expect(actual.annotationId).toEqual(comment.annotationId);
      expect(actual.content).toEqual(commentForm.value.content);
    }));
  });

  describe('onSubmit', () => {
    it('should add current date to comment onSubmit', async(() => {
      component.commentItem = commentForm;
      component.onSubmit();
      expect(mockAnnotationStoreService.comment.createdDate).toBeTruthy();
    }));
  });

  describe('onBlur', () => {
    it('should run on blur', async(() => {
      component.onBlur();
    }));
  });

  describe('handleDeleteComment', () => {
    it('should call delete comment when handleDeleteComment is called', async(() => {
      spyOn(mockAnnotationStoreService, 'deleteComment');
      component.handleDeleteComment();
      expect(mockAnnotationStoreService.deleteComment).toHaveBeenCalled();
    }));
  });

  describe('isModified', () => {
    it('should return false if createdDate is null', async(() => {
      mockComment.createdDate = null;
      component.comment = mockComment;
      const modified = component.isModified();
      expect(modified).toBeFalsy();
    }));

    it('should return false if lastModifiedBy is null', async(() => {
      mockComment.createdDate = new Date();
      mockComment.lastModifiedBy = null;
      component.comment = mockComment;
      const modified = component.isModified();
      expect(modified).toBeFalsy();
    }));

    it('should return false if lastModifiedDate and createdDate are the same', async(() => {
      const myDate = new Date();
      mockComment.createdDate = myDate;
      mockComment.lastModifiedDate = myDate;
      mockComment.lastModifiedBy = 'anId';
      component.comment = mockComment;
      const modified = component.isModified();
      expect(modified).toBeFalsy();
    }));

    it('should return true if above do not return false', async(() => {
      mockComment.createdDate =  new Date();
      mockComment.lastModifiedDate =  new Date();
      mockComment.lastModifiedBy = 'anId';
      component.comment = mockComment;
      const modified = component.isModified();
      expect(modified).toBeTruthy();
    }));
  });
});
