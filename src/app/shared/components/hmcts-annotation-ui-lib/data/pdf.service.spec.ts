import { TestBed, inject } from '@angular/core/testing';
import { PdfService } from './pdf.service';
import { BehaviorSubject } from 'rxjs';
import { PdfAnnotateWrapper } from './js-wrapper/pdf-annotate-wrapper';
import { PdfWrapper } from './js-wrapper/pdf-wrapper';
import { ElementRef } from '@angular/core';

class MockPdfAnnotateWrapper {
    renderPage(pageNumber) {}
    enableRect(tool) {}
    disableRect() {}
    createPage() {}
}

class MockPdfWrapper {
  workerSrc() {}
  getDocument(documentId) {}
}

describe('PdfService', () => {
  const mockPdfAnnotateWrapper = new MockPdfAnnotateWrapper();
  const mockPdfWrapper = new MockPdfWrapper();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PdfService,
        { provide: PdfAnnotateWrapper, useFactory: () => mockPdfAnnotateWrapper },
        { provide: PdfWrapper, useFactory: () => mockPdfWrapper }
      ]
    });
  });

  describe('constructor', () => {
    it('should be created', inject([PdfService], (service: PdfService) => {
      expect(service).toBeTruthy();
    }));
  });

  describe('preRun', () => {
    it('should define pdf variables', inject([PdfService], (service: PdfService) => {
      spyOn(mockPdfWrapper, 'workerSrc').and.stub();

      service.preRun();

      expect(service.getPageNumber()).toBeTruthy();
      expect(mockPdfWrapper.workerSrc).toHaveBeenCalled();
    }));
  });

  describe('render', () => {
    it('render should set workerSrc', inject([PdfService], (service: PdfService) => {
      spyOn(mockPdfWrapper, 'getDocument').and.returnValue(
          new Promise((resolve) => {
            resolve({pdfInfo: { numPages: 65}});
          }
        ));
      service.setRenderOptions({
          documentId: 'documentId',
          pdfDocument: null,
          scale: 1.33,
          rotate: 0
        });
      const nativeElement = document.createElement('div');
      spyOn(nativeElement, 'appendChild').and.callFake(() => {

      const viewerElementRef = new ElementRef(nativeElement);
      spyOn(mockPdfAnnotateWrapper, 'createPage').and.stub();

      service['viewerElementRef'] = viewerElementRef;
      service.render(viewerElementRef);
      expect(mockPdfAnnotateWrapper.createPage).toHaveBeenCalled();
    });
  }));
});

  describe('setPageNumber', () => {
    it('should set the pageNumber value', inject([PdfService], (service: PdfService) => {
      service['pageNumber'] = new BehaviorSubject(1);
      service.getPageNumber().subscribe(pageNumber => {
        expect(pageNumber).toBe(1);
      });
      service.setPageNumber(1);
    }));
  });

  describe('getRenderOptions', () => {
    it('should return RENDER_OPTIONS', inject([PdfService], (service: PdfService) => {
      const mockRenderOptions = {documentId: 'id', pdfDocument: null, scale: 1, rotate: 0};
      service.setRenderOptions(mockRenderOptions);
      expect(service.getRenderOptions().documentId).toBe(mockRenderOptions.documentId);
    }));
  });

  describe('setHighlightTool', () => {
    it('invokes PDFAnnotate methods when setHighlightTool called',  inject([PdfService], (service: PdfService) => {
      spyOn(mockPdfAnnotateWrapper, 'enableRect').and.stub();

      service.setHighlightTool();

      expect(mockPdfAnnotateWrapper.enableRect).toHaveBeenCalled();
    }));
  });

  describe('setCursorTool', () => {
    it('invokes PDFAnnotate methods when setHighlightTool called',  inject([PdfService], (service: PdfService) => {
      spyOn(mockPdfAnnotateWrapper, 'disableRect').and.stub();

      service.setCursorTool();

      expect(mockPdfAnnotateWrapper.disableRect).toHaveBeenCalled();
    }));
  });
});
