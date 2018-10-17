import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentFormComponent } from './comment-form.component';
import { AnnotationStoreService } from '../../../data/annotation-store.service';
import { FormsModule } from '@angular/forms';
import { Comment } from '../../../data/annotation-set.model';
import { DebugElement } from '@angular/core';

class MockAnnotationStoreService {
  addComment(model: Comment) {
  }
}

describe('CommentFormComponent', () => {

  let component: CommentFormComponent;
  let fixture: ComponentFixture<CommentFormComponent>;
  let element: DebugElement;

  const mockAnnotationStoreService = new MockAnnotationStoreService();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentFormComponent ],
      providers: [
        { provide: AnnotationStoreService, useFactory: () => mockAnnotationStoreService }
      ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentFormComponent);
    component = fixture.componentInstance;
    component.selectedAnnotationId = 'ca68f5b0-a9dd-4f8e-95b8-3cad024c54be';
    fixture.detectChanges();
    element = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the submit button disabled', async(() => {

    // component.selectedAnnotationId = null;
    // fixture.detectChanges();
    // const button = element.query(By.css('btn'));

    // console.log(button);
    // console.log(button.attributes);
    // expect(button).toBeTruthy();
    // expect(button.nativeElement.attributes('hidden')).toEqual(true);
  }));

  it('should update the form onChanges', () => {
    component.selectedAnnotationId = 'df47ebe9-b5cb-4fcd-b79f-a33afd9f4a00';
    component.commentForm.value.comment = 'Comment text';
    component.ngOnChanges();

    expect(component.commentForm.value.comment)
      .toBe('Comment text');
    expect(component.model).toBeTruthy();
    expect(component.model.lastModifiedDate.getDate())
      .toBe(new Date().getDate());
  });

  it('should call annotation store service and clear form onSubmit', () => {
    spyOn(mockAnnotationStoreService, 'addComment');
    component.onSubmit();
    expect(mockAnnotationStoreService.addComment).toHaveBeenCalled();
    expect(component.selectedAnnotationId).toBeNull();
    expect(component.model.content).toBeNull();
  });
});
