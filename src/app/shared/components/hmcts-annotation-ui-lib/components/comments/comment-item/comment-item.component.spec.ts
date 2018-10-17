import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgForm, FormsModule } from '@angular/forms';

import { CommentItemComponent } from './comment-item.component';
import { AnnotationStoreService } from '../../../data/annotation-store.service';
import { Comment } from '../../../data/annotation-set.model';

class MockAnnotationStoreService {
  comment;

  editComment(comment) {
    this.comment = comment;
  }

  deleteComment(commentId) {
  }
}

describe('CommentItemComponent', () => {
  let component: CommentItemComponent;
  let fixture: ComponentFixture<CommentItemComponent>;
  let commentForm: any;

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
      providers: [
        { provide: AnnotationStoreService, useFactory: () => mockAnnotationStoreService }
      ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CommentItemComponent);
    component = fixture.componentInstance;
    component.comment = 'any';
    component.selectedAnnotationId = 'ca68f5b0-a9dd-4f8e-95b8-3cad024c54be';
    component.annotation = {
      id: 'ca68f5b0-a9dd-4f8e-95b8-3cad024c54be'
    };
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.focused).toBeFalsy();
  });

  it('should convert form to comment', async(() => {
    const actual = component.convertFormToComment(commentForm);
    expect(actual instanceof Comment).toBeTruthy();
    expect(actual.id).toEqual(commentForm.value.commentId);
    expect(actual.annotationId).toEqual(commentForm.value.annotationId);
    expect(actual.content).toEqual(commentForm.value.content);
  }));

  it('should add current date to comment onSubmit', async(() => {
    component.commentItem = commentForm;
    component.onSubmit();
    const expectedDate = new Date();
    expect(mockAnnotationStoreService.comment.lastModifiedDate).toBeTruthy();
    expect(mockAnnotationStoreService.comment.lastModifiedDate.getDate())
      .toBe(expectedDate.getDate());
  }));

  it('should focus the component when onFocus is called', async(() => {
    component.onFocus();
    expect(component.focused).toBeTruthy();
  }));

  it('should unfocus the component when onBlur is called', async(() => {
    component.onBlur();
    expect(component.focused).toBeFalsy();
  }));

  it('should call delete comment when handleDeleteComment is called', async(() => {
    spyOn(mockAnnotationStoreService, 'deleteComment');
    component.handleDeleteComment(null, '4c2a1799-d67c-45be-ba10-8ad801a9ef4f');
    expect(mockAnnotationStoreService.deleteComment).toHaveBeenCalled();
  }));
});
