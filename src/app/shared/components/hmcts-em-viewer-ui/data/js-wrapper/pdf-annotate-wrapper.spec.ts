import {PdfAnnotateWrapper} from './pdf-annotate-wrapper';
import { RenderOptions } from './renderOptions.model';

declare global { interface Window { PDFAnnotate: any; } }

describe('pdfAnnotateWrapper', () => {
    const pdfAnnotateWrapper = new PdfAnnotateWrapper();

    const mockUI = {
        createPage(pageNumber) {},
        renderPage(pageNumber, RENDER_OPTIONS) {},
        enableRect(type) {},
        disableRect() {},
        getUi() {}
    };
    window.PDFAnnotate = {
        UI: mockUI,
        getStoreAdapter() {},
        setStoreAdapter(documentId) {},
        LocalStoreAdapter() {}
    };

    it('should set store adapter', () => {
        const storeAdapter = 'myStoreAdapter';
        spyOn(window.PDFAnnotate, 'setStoreAdapter').and.stub();
        pdfAnnotateWrapper.setStoreAdapter(storeAdapter);
        expect(window.PDFAnnotate.setStoreAdapter).toHaveBeenCalledWith(storeAdapter);
    });

    it('should set store adapter with no store adapter passed', () => {
        spyOn(window.PDFAnnotate, 'setStoreAdapter').and.stub();
        pdfAnnotateWrapper.setStoreAdapter(null);
        expect(window.PDFAnnotate.setStoreAdapter).toHaveBeenCalled();
    });

    it('should call createPage with the provided page number', () => {
        const pageNumber = 1;
        spyOn(window.PDFAnnotate.UI, 'createPage').and.stub();
        pdfAnnotateWrapper.createPage(pageNumber);
        expect(window.PDFAnnotate.UI.createPage).toHaveBeenCalledWith(pageNumber);
    });

    it('should call renderPage with the provided page number and render options', () => {
        const pageNumber = 1;
        const renderOptions = new RenderOptions('documentId', null, 1, 0, []);
        spyOn(window.PDFAnnotate.UI, 'renderPage').and.stub();
        pdfAnnotateWrapper.renderPage(pageNumber, renderOptions);
        expect(window.PDFAnnotate.UI.renderPage).toHaveBeenCalledWith(pageNumber, renderOptions);
    });

    it('should call enableRect with the provided type', () => {
        const type = 'rect';
        spyOn(window.PDFAnnotate.UI, 'enableRect').and.stub();
        pdfAnnotateWrapper.enableRect(type);
        expect(window.PDFAnnotate.UI.enableRect).toHaveBeenCalledWith(type);
    });

    it('should call disableRect', () => {
        spyOn(window.PDFAnnotate.UI, 'disableRect').and.stub();
        pdfAnnotateWrapper.disableRect();
        expect(window.PDFAnnotate.UI.disableRect).toHaveBeenCalled();
    });

    it('should return UI object', () => {
        const returnedUi = pdfAnnotateWrapper.getUi();
        expect(returnedUi).toBe(mockUI);
    });

    it('should return store adapter', function () {
        spyOn(window.PDFAnnotate, 'getStoreAdapter').and.stub();
        pdfAnnotateWrapper.getStoreAdapter();
        expect(window.PDFAnnotate.getStoreAdapter).toHaveBeenCalled();
    });
});
