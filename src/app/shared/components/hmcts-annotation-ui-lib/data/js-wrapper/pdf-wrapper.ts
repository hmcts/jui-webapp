declare const PDFJS: any;

export class PdfWrapper {

    workerSrc(workerSrc) {
        PDFJS.workerSrc = workerSrc;
    }

    getDocument(documentId): Promise<any> {
        return PDFJS.getDocument(documentId);
    }
}
