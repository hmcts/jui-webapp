import { PdfRenderService } from './pdf-render.service';
import { ElementRef } from '@angular/core';
import { TestBed, inject } from '@angular/core/testing';
import { RenderOptions } from './js-wrapper/renderOptions.model';
import { EmLoggerService } from '../logging/em-logger.service';
import { PdfWrapper } from './js-wrapper/pdf-wrapper';
import { PdfAnnotateWrapper } from './js-wrapper/pdf-annotate-wrapper';
import { BehaviorSubject } from 'rxjs';

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
          PdfRenderService,
          { provide: PdfAnnotateWrapper, useFactory: () => mockPdfAnnotateWrapper },
          { provide: PdfWrapper, useFactory: () => mockPdfWrapper }
        ]
      });
    });
  
    describe('constructor', () => {
      it('should be created', inject([PdfRenderService], (service: PdfRenderService) => {
        expect(service).toBeTruthy();
      }));
    });


  describe('render', () => {
    it('should call underlying pdfjs library and create pdf annotate library page.', inject([PdfRenderService], (service: PdfRenderService) => {
      spyOn(mockPdfWrapper, 'getDocument').and.returnValue(
          new Promise((resolve) => {
            resolve({pdfInfo: { numPages: 65}});
          }
        ));
      service.setRenderOptions(new RenderOptions(
          'documentId',
          null,
          1.33,
          0,
          []
        ));
      const nativeElement = document.createElement('div');
      spyOn(nativeElement, 'appendChild').and.callFake(() => {
        spyOn(mockPdfAnnotateWrapper, 'createPage').and.stub();

        service['viewerElementRef'] = viewerElementRef;
        
        expect(mockPdfWrapper.getDocument).toHaveBeenCalled();
      });

      service['pdfPages'] = 1;
      const viewerElementRef = new ElementRef(nativeElement);
      service.render(viewerElementRef);
    }));
  });

  describe('getDataLoadedSub', () => {
    it('should return dataLoadedSubject', inject([PdfRenderService], (service: PdfRenderService) => {
      service['dataLoadedSubject'] = new BehaviorSubject(true);
      service.getDataLoadedSub().subscribe(result => {
        expect(result).toBeTruthy();
      });
    }));
  });

  describe('dataLoadedUpdate', () => {
    it('should set dataLoadedUpdate to true', inject([PdfRenderService], (service: PdfRenderService) => {
      service.dataLoadedUpdate(true);
      service['dataLoadedSubject'].subscribe(result => {
        expect(result).toBeTruthy();
      });
    }));
  });

  describe('getRenderOptions', () => {
    it('should return RENDER_OPTIONS', inject([PdfRenderService], (service: PdfRenderService) => {
      const mockRenderOptions = new RenderOptions('id', null, 1, 0, []);
      service.setRenderOptions(mockRenderOptions);
      expect(service.getRenderOptions().documentId).toBe(mockRenderOptions.documentId);
    }));
  });

  describe('getPdfPages', () => {
    it('should set the pageNumber value', inject([PdfRenderService], (service: PdfRenderService) => {
      service['pdfPages'] = 10;
      const pdfPages = service.getPdfPages();
      expect(pdfPages).toBe(10);
    }));
  });


  describe('getPageRotation', () => {
    it('should return a rotation value for a given page', inject([PdfRenderService], (service: PdfRenderService) => {
      const mockRenderOptions = new RenderOptions('id', null, 1, 0, [{page: 1, rotate: 90}]);
      const mockPageOptions = new RenderOptions('id', null, 1, 0, [{page: 1, rotate: 180}]);
      const rotation = service.getPageRotation(mockRenderOptions, mockPageOptions, {pageNumber: 1});
      expect(rotation).toBe(180);
    }));

    it('should return a default rotation value for a given page when none was set before', inject([PdfRenderService], (service: PdfRenderService) => {
      const mockRenderOptions = new RenderOptions('id', null, 1, 0, [{page: 1, rotate: 90}]);
      const mockPageOptions = new RenderOptions('id', null, 1, 0, []);
      const rotation = service.getPageRotation(mockRenderOptions, mockPageOptions, {pageNumber: 1, rotate: 180});
      expect(rotation).toBe(180);
    }));
  });
});
