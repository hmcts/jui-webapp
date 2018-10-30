import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgForm, FormsModule } from '@angular/forms';
import { Subject, of } from 'rxjs';

import { CommentItemComponent } from './comment-item.component';
import { AnnotationStoreService } from '../../../data/annotation-store.service';
import { Comment, Annotation } from '../../../data/annotation-set.model';
import { NO_ERRORS_SCHEMA, Renderer2, Type } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

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

describe('CommentItemComponent', () => {
  let component: CommentItemComponent;
  let fixture: ComponentFixture<CommentItemComponent>;
  let commentForm: any;
  let renderer2: Renderer2;

  const comment = new Comment(
    '71d5914c-163c-4e91-9788-101e1fd1c171',
    'f7dd4059-b384-4e57-ac91-aac541b8f8ff',
    '96866', {forename: 'test', surname: 'test', email: 'test@test'},
    new Date(),
    '96866', {forename: 'test', surname: 'test', email: 'test@test'},
    new Date(),
    'A new comment'
    );

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
    [],
    'highlight'
  );

  const mockAnnotationStoreService = new MockAnnotationStoreService();

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
        Renderer2
      ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CommentItemComponent);
    renderer2 = fixture.componentRef.injector.get<Renderer2>(Renderer2 as Type<Renderer2>);
    const mockDocument = fixture.componentRef.injector.get(DOCUMENT);
    spyOn(mockDocument, 'querySelectorAll').and
      .returnValue([document.createElement('div')]);
    component = fixture.componentInstance;
    spyOn(mockAnnotationStoreService, 'getCommentFocusSubject').and
      .returnValue(of({annotation: annotation, showButton: false}));

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
      component.handleCommentClick();
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
    it('should unfocus the component when onBlur is called', async(() => {
      component.onBlur();
      expect(component['focused']).toBeFalsy();
      expect(component['hideButton']).toBeTruthy();
    }));
  });

  describe('handleDeleteComment', () => {
    it('should call delete comment when handleDeleteComment is called', async(() => {
      spyOn(mockAnnotationStoreService, 'deleteComment');
      component.handleDeleteComment();
      expect(mockAnnotationStoreService.deleteComment).toHaveBeenCalled();
    }));
  });
});
