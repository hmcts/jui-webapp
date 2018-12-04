import { TestBed, inject } from '@angular/core/testing';
import { PdfService } from './pdf.service';
import { BehaviorSubject } from 'rxjs';
import { PdfAnnotateWrapper } from './js-wrapper/pdf-annotate-wrapper';
import { PdfWrapper } from './js-wrapper/pdf-wrapper';
import { ElementRef } from '@angular/core';
import { PdfPage } from './js-wrapper/pdf-page';

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

  describe('calculateRotation', () => {
    let renderOptions = {documentId: null, pdfDocument: null, scale: 1.33, rotate: 180};

    it('should return the sum value of current rotation and new rotation', inject([PdfService], (service: PdfService) => {
      service.setRenderOptions(renderOptions);
      const rotationAdd = 90;
      const rotation = service.calculateRotation(new PdfPage(rotationAdd));
      expect(rotation).toBe(renderOptions.rotate + rotationAdd);
    }));

    it('should return 360 degrees as 0', inject([PdfService], (service: PdfService) => {
      service.setRenderOptions(renderOptions);
      const rotationAdd = 180;
      const rotation = service.calculateRotation(new PdfPage(rotationAdd));
      expect(rotation).toBe(0);
    }));

    it('should return new rotation in 360 degrees', inject([PdfService], (service: PdfService) => {
      service.setRenderOptions(renderOptions);
      const rotationAdd = 270;
      const rotation = service.calculateRotation(new PdfPage(rotationAdd));
      expect(rotation).toBe(90);
    }));

    it('should return rotation in 360 degrees if negative', inject([PdfService], (service: PdfService) => {
      renderOptions = {documentId: null, pdfDocument: null, scale: 1.33, rotate: -90};

      service.setRenderOptions(renderOptions);
      const rotationSubstract = -90;
      const rotation = service.calculateRotation(new PdfPage(rotationSubstract));
      expect(rotation).toBe(180);
    }));
  });

  describe('getPdfPages', () => {
    it('should set the pageNumber value', inject([PdfService], (service: PdfService) => {
      service['pdfPages'] = 10;
      const pdfPages = service.getPdfPages();
      expect(pdfPages).toBe(10);
    }));
  });

  describe('getDataLoadedSub', () => {
    it('should return dataLoadedSubject', inject([PdfService], (service: PdfService) => {
      service['dataLoadedSubject'] = new BehaviorSubject(true);
      service.getDataLoadedSub().subscribe(result => {
        expect(result).toBeTruthy();
      });
    }));
  });

  describe('dataLoadedUpdate', () => {
    it('should set dataLoadedUpdate to true', inject([PdfService], (service: PdfService) => {
      service.dataLoadedUpdate(true);
      service['dataLoadedSubject'].subscribe(result => {
        expect(result).toBeTruthy();
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
