import { PdfWrapper } from './pdf-wrapper';
declare global { interface Window { PDFJS: any; } }

describe('PdfWrapper' , () => {
    const pdfWrapper = new PdfWrapper();
    window.PDFJS = { 
        workerSrc: null,
        getDocument(documentId) {} 
    };

    it('should set the workerSrc property with the provided workerSrc', () => {
        const workerSrc = '/assets/pdf-worker.js';
        pdfWrapper.workerSrc(workerSrc);
        expect(window.PDFJS.workerSrc).toBe(workerSrc);
    });

    it('should call getDocument with the provided documentId', () => {
        const documentId = 'documentId';
        spyOn(window.PDFJS, 'getDocument').and.stub();
        pdfWrapper.getDocument(documentId);
        expect(window.PDFJS.getDocument).toHaveBeenCalledWith(documentId);
    });
});
