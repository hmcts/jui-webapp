import { TestBed, inject } from '@angular/core/testing';
import { PdfService } from './pdf.service';
import { Subject, BehaviorSubject } from 'rxjs';

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
  const mockAnnotationId = 'myId';
  window.PDFAnnotate = new PDFAnnotate();
  window.PDFJS = new PDFJS();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PdfService]
    });
  });

  describe('constructor', () => {
    it('should be created', inject([PdfService], (service: PdfService) => {
      expect(service).toBeTruthy();
    }));
  });

  describe('dataLoadedUpdate', () => {
    it('should be update the subject', inject([PdfService], (service: PdfService) => {
      service.getDataLoadedSub().subscribe((done) => {
        expect(done).toBeTruthy();
      });
      service.dataLoadedUpdate(true);
    }));
  });

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

  describe('setPageNumber', () => {
    it('should set the pageNumber value', inject([PdfService], (service: PdfService) => {
      service['pageNumber'] = new BehaviorSubject(1);
      service.getPageNumber().subscribe(pageNumber => {
        expect(pageNumber).toBe(1);
      });
      service.setPageNumber(1);
    }));
  });

  describe('getAnnotationClicked', () => {
    it('should set the annotationSub value', inject([PdfService], (service: PdfService) => {
      service['annotationSub'] = new Subject();
      service.getAnnotationClicked().subscribe(annotationId => {
        expect(annotationId).toBe(mockAnnotationId);
      });
      service.setAnnotationClicked(mockAnnotationId);
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
