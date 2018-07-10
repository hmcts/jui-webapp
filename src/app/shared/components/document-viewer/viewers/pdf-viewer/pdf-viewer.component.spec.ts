import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PdfViewerComponent} from './pdf-viewer.component';

import {PdfViewerModule} from 'ng2-pdf-viewer';

describe('PdfViewerComponent', () => {
  let component: PdfViewerComponent;
  let fixture: ComponentFixture<PdfViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PdfViewerModule],
      declarations: [ PdfViewerComponent ],
      providers: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfViewerComponent);
    component = fixture.componentInstance;
    component.url = 'http://test.pdf';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
