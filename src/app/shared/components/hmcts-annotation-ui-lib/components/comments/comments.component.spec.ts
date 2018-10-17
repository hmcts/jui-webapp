import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject, Observable } from 'rxjs';

import { CommentsComponent } from './comments.component';
import { AnnotationStoreService } from '../../data/annotation-store.service';
import { PdfService } from '../../data/pdf.service';
import { Annotation, Comment } from '../../data/annotation-set.model';
import { Component, Input, Output, EventEmitter, Renderer2, RootRenderer, Type } from '@angular/core';
import { CommentItemComponent } from './comment-item/comment-item.component';
import { CommentFormComponent } from './comment-form/comment-form.component';
import { FormsModule } from '@angular/forms';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-comment-item',
  template: '',
  providers: []
})
class MockCommentItemComponent {
  @Input() annotation;
  @Input() comment;
  @Input() selectedAnnotationId;
  @Output() commentSubmitted: EventEmitter<String> = new EventEmitter<String>();
  @Output() commentSelected: EventEmitter<String> = new EventEmitter<String>();
}

@Component({
  selector: 'app-comment-form',
  template: '',
  providers: []
})
class MockCommentFormComponent {
  @Output() commentSubmitted: EventEmitter<string> = new EventEmitter<string>();
  @Input() selectedAnnotationId;
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
}

class MockAnnotationStoreService {
  getAnnotationsForPage(pageNumber) {
    return new Promise((resolve) => {
      resolve([]);
    });
  }

  getAnnotationById(annotationId) {
    const annotation = new Annotation('96978485-bb8a-4593-b7cc-3f11dc1d569a',
                    '1058c847-f527-41af-ba7c-40014ad2174b',
                    '124575', new Date(), null, null,
                    'caf76a6b-1c40-4291-9402-21f82c1ba476', 1,
                    'FFFF00', [], [], 'highlight');
    return new Promise((resolve) => {
      resolve(annotation);
    });
  }

  getCommentsForAnnotation(annotationId) {
    const comments = [
      new Comment('e337ce78-c4c8-4111-8756-7d44006b4428',
                  '96978485-bb8a-4593-b7cc-3f11dc1d569a',
                  '124575', new Date(), null, null,
                  'Comment text'),
      new Comment('a11c3c66-19e8-4d52-bf7b-9bd7d6348407',
      '96978485-bb8a-4593-b7cc-3f11dc1d569a',
      '124575', new Date(), null, null,
      'Comment text 2')
    ];
    return new Promise((resolve) => {
      resolve(comments);
    });
  }
}

describe('CommentsComponent', () => {
  const mockAnnotationStoreService = new MockAnnotationStoreService();
  const mockPdfService = new MockPdfService();
  // const mockDocument = window.document;
  // let renderer2: Renderer2;

  let component: CommentsComponent;
  let fixture: ComponentFixture<CommentsComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [
        CommentsComponent,
        CommentItemComponent,
        CommentFormComponent
       ],
      providers: [
        // Renderer2,
        // { provide: 'DOCUMENT', useFactory: () => mockDocument },
        { provide: PdfService, useFactory: () => mockPdfService },
        { provide: AnnotationStoreService, useFactory: () => mockAnnotationStoreService }
      ],
      imports: [
        FormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    spyOn(mockPdfService, 'getPageNumber')
      .and.returnValue(Observable.of(1));
    // spyOn(mockDocument, 'querySelector').and.callFake(function() {
    //   return {
    //     value: 'test'
    //   };
    // });

    fixture = TestBed.createComponent(CommentsComponent);
    component = fixture.componentInstance;

    const mockDocument = fixture.componentRef.injector.get(DOCUMENT);
    spyOn(mockDocument, 'querySelector').and.callFake(function() {});
    spyOn(mockDocument, 'addEventListener').and.callFake(function() {
    });
    // renderer2 = fixture.componentRef.injector.get<Renderer2>(Renderer2 as Type<Renderer2>);
    // // and spy on it
    // spyOn(renderer2, 'addClass').and.callFake(function() {
    // });
    // // or replace
    // spyOn(renderer2, 'removeClass').and.callFake(function() {
    // });
    // // etc

    fixture.detectChanges();
  });

  it('should create', () => {
   expect(component).toBeTruthy();
  });
});
