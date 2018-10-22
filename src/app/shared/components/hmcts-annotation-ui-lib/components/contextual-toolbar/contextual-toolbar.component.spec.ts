import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';

import { ContextualToolbarComponent } from './contextual-toolbar.component';
import { PdfService } from '../../data/pdf.service';
import { AnnotationStoreService } from '../../data/annotation-store.service';

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
  clearAnnotations() {}
}

describe('ContextualToolbarComponent', () => {
  let component: ContextualToolbarComponent;
  let fixture: ComponentFixture<ContextualToolbarComponent>;

  const mockPdfService = new MockPdfService();
  const mockAnnotationStoreService = new MockAnnotationStoreService();
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
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
