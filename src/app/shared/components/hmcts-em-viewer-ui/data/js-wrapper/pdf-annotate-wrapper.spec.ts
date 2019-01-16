import {PdfWrapper} from './pdf-wrapper';
import {PdfAnnotateWrapper} from './pdf-annotate-wrapper';

declare global { interface Window { PDFAnnotate: any; } }

fdescribe('pdfAnnotateWrapper', () => {
    const pdfAnnotateWrapper = new PdfAnnotateWrapper();
    window.PDFAnnotate = {
        getStoreAdapter() {},
        setStoreAdapter(documentId) {}
    };

    it('should set store adapter', () => {
        const storeAdapter = 'myStoreAdapter';
        spyOn(window.PDFAnnotate, 'setStoreAdapter').and.stub();
        pdfAnnotateWrapper.setStoreAdapter(storeAdapter);
        expect(window.PDFAnnotate.setStoreAdapter).toHaveBeenCalledWith(storeAdapter);
    });
    
});
