import { TestBed, inject } from '@angular/core/testing';
import { PdfService } from './pdf.service';
import { BehaviorSubject } from 'rxjs';
import { PdfAnnotateWrapper } from './js-wrapper/pdf-annotate-wrapper';
import { PdfWrapper } from './js-wrapper/pdf-wrapper';
import { ElementRef } from '@angular/core';
import { EmLoggerService } from '../logging/em-logger.service';

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
        EmLoggerService,
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
      service.preRun();
      expect(service.getPageNumber()).toBeTruthy();
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
