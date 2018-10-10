import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnotationPdfViewerComponent } from './annotation-pdf-viewer.component';

describe('ViewerComponent', () => {
  let component: AnnotationPdfViewerComponent;
  let fixture: ComponentFixture<AnnotationPdfViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnotationPdfViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnotationPdfViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
