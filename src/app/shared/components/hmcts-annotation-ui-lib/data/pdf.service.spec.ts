import { TestBed, inject } from '@angular/core/testing';
import { PdfService } from './pdf.service';

declare global { interface Window { PDFAnnotate: any; } }
declare global { interface Window { PDFJS: any; } }

class PDFAnnotate {
  UI = {
    renderPage(pageNumber) {},
    enableRect(tool) {},
    disableEdit() {}
  };
}

class PDFJS {
  workerSrc;
  getDocument(documentId) {}
}

describe('PdfService', () => {
  window.PDFAnnotate = new PDFAnnotate();
  window.PDFJS = new PDFJS();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PdfService]
    });
  });

  it('should be created', inject([PdfService], (service: PdfService) => {
    expect(service).toBeTruthy();
  }));

  describe('preRun', () => {
    it('should define pdf variables', inject([PdfService], (service: PdfService) => {
      service.preRun();
      expect(service.UI).toBeTruthy();
      expect(service.getPageNumber()).toBeTruthy();
    }));
  });

  describe('render', () => {
    it('render should set workerSrc', inject([PdfService], (service: PdfService) => {
      spyOn(window.PDFJS, 'getDocument').and.returnValue(
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
      service.render(null);

      expect(window.PDFJS.workerSrc).toBeTruthy();
    }));

    it('calls renderPage method', inject([PdfService], (service: PdfService) => {
      spyOn(window.PDFAnnotate.UI, 'renderPage');
      service.renderPage(1);
      expect(window.PDFAnnotate.UI.renderPage).toHaveBeenCalled();
    }));
  });

  describe('setHighlightTool', () => {
    it('invokes PDFAnnotate methods when setHighlightTool called',  inject([PdfService], (service: PdfService) => {
      spyOn(window.PDFAnnotate.UI, 'enableRect');
      spyOn(window.PDFAnnotate.UI, 'disableEdit');

      service.setRenderOptions({
        documentId: 'documentId',
        pdfDocument: null,
        scale: 1.33,
        rotate: 0
      });
      service.setHighlightTool();

      expect(window.PDFAnnotate.UI.enableRect).toHaveBeenCalled();
      expect(window.PDFAnnotate.UI.disableEdit).toHaveBeenCalled();
    }));
  });

});
