import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { AnnotationPdfViewerComponent } from './annotation-pdf-viewer.component';
import { AnnotationSet } from '../../data/annotation-set.model';

import { PdfService } from '../../data/pdf.service';
import { AnnotationStoreService } from '../../data/annotation-store.service';
import { NpaService } from '../../data/npa.service';
import { ApiHttpService } from '../../data/api-http.service';

class MockPdfService {
  pageNumber: Subject<number>;

  preRun() {
    this.pageNumber = new Subject();
    this.pageNumber.next(1);
  }

  setHighlightTool() {}
  setRenderOptions() {}
  setPageNumber(page: number) {}
  render() {}

  getPageNumber() {
    return this.pageNumber;
  }
}

class MockAnnotationStoreService {
  preLoad() {}
  setCommentBtnSubject(commentId: string) {}
}

class MockNpaService {
  outputDmDocumentId: Subject<string>;

  constructor() {
    this.outputDmDocumentId = new Subject<string>();
  }

  setPageNumber(pageNumber: number) {}
}

class MockApiHttpService {
  getBaseUrl() {}
  setBaseUrl(baseUrl) {}
}

class MockCommentComponent {}
class MockToolbarComponent {}

describe('ViewerComponent', () => {
  let component: AnnotationPdfViewerComponent;
  let fixture: ComponentFixture<AnnotationPdfViewerComponent>;

  const mockAnnotationStoreService = new MockAnnotationStoreService();
  const mockPdfService = new MockPdfService();
  const mockNpaService = new MockNpaService();
  const mockApiHttpService = new MockApiHttpService();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnotationPdfViewerComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: PdfService, useFactory: () => mockPdfService },
        { provide: AnnotationStoreService, useFactory: () => mockAnnotationStoreService },
        { provide: NpaService, useFactory: () => mockNpaService },
        { provide: ApiHttpService, useFactory: () => mockApiHttpService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnotationPdfViewerComponent);
    component = fixture.componentInstance;

    component.annotate = true;
    component.dmDocumentId = '116b0b0f-65da-41e3-9852-648fe4c30409';
    component.outputDmDocumentId = '116b0b0f-65da-41e3-9852-648fe4c30409';
    component.url = '';
    component.annotationSet = new AnnotationSet('606fadd5-655b-4675-aa9a-df65f86fb37c',
    '125334', new Date(), null, null, '116b0b0f-65da-41e3-9852-648fe4c30409', []);
    component.baseUrl = 'localhost:3000';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onInit', () => {
    it('should run tasks', async(() => {
      spyOn(mockPdfService, 'preRun');
      spyOn(mockPdfService, 'render');
      spyOn(mockPdfService, 'getPageNumber').and.returnValue(Observable.of(1));

      component.ngOnInit();
      expect(mockPdfService.preRun).toHaveBeenCalledTimes(1);
      expect(mockPdfService.render).toHaveBeenCalledTimes(1);
      expect(component.page).toBe(1);
    }));
  });

  describe('loadAnnotations', () => {
    it('calls annotation services when annotate true', async(() => {
      spyOn(mockAnnotationStoreService, 'preLoad');
      spyOn(mockApiHttpService, 'setBaseUrl');

      component.loadAnnotations(true);
      expect(mockApiHttpService.setBaseUrl).toHaveBeenCalled();
      expect(mockAnnotationStoreService.preLoad).toHaveBeenCalledTimes(1);
    }));

    it('calls preload with null when annotate false', async(() => {
      spyOn(mockAnnotationStoreService, 'preLoad').and.callFake(function() {
        expect(arguments[0]).toBeNull();
      });
      component.loadAnnotations(false);
    }));
  });

  describe('getClickedPage', () => {
    it('should update the commentBtnSubject with null', () => {
      const event = {target: document.createElement('div'), parentNode() {}};
      spyOn(mockAnnotationStoreService, 'setCommentBtnSubject');
      component.getClickedPage(event);

      expect(mockAnnotationStoreService.setCommentBtnSubject).toHaveBeenCalledWith(null);
    });

    it('should get the page number from the DOM and call pdfService', () => {
      const dom = document.createElement('div');
      const parentNode = document.createElement('div');
      parentNode.setAttribute('data-page-number', '1');
      spyOnProperty(dom, 'parentNode', 'get').and.returnValue(parentNode);
      const event = {target: dom};
      spyOn(mockPdfService, 'setPageNumber');

      component.getClickedPage(event);
      expect(mockPdfService.setPageNumber).toHaveBeenCalledWith(1);
    });
  });

});
