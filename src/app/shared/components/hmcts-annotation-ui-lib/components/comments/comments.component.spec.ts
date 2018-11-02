import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Subject, Observable } from 'rxjs';

import { CommentsComponent } from './comments.component';
import { AnnotationStoreService } from '../../data/annotation-store.service';
import { PdfService } from '../../data/pdf.service';
import { Annotation, Comment } from '../../data/annotation-set.model';

declare global { interface Window { PDFAnnotate: any; } }

class PDFAnnotate {
  UI = document.createElement('div');
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
  getAnnotationsForPage() {
    return new Promise((resolve) => {
      resolve([]);
    });
  }

  getAnnotationById() {
    const annotation = new Annotation('96978485-bb8a-4593-b7cc-3f11dc1d569a',
                    '1058c847-f527-41af-ba7c-40014ad2174b',
                    '124575', new Date(), null, null,
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
  window.PDFAnnotate = new PDFAnnotate();

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
    const mockDocument = fixture.componentRef.injector.get(DOCUMENT);
    spyOn(mockDocument, 'querySelector').and.callFake(function() {
      const dummyElement = document.createElement('div');
      return dummyElement;
    });
    spyOn(mockDocument, 'addEventListener').and.callFake(function() {
    });

    fixture.detectChanges();
  });

  it('should create', () => {
   expect(component).toBeTruthy();
  });

});
