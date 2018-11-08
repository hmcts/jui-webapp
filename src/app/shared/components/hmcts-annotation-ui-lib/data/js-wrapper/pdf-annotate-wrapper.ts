declare const PDFAnnotate: any;

export class PdfAnnotateWrapper {

    createPage(pageNumber): any {
        return PDFAnnotate.UI.createPage(pageNumber);
    }

    renderPage(pageNumber, RENDER_OPTIONS): Promise<any> {
        return PDFAnnotate.UI.renderPage(pageNumber, RENDER_OPTIONS);
    }

    enableRect(type) {
        PDFAnnotate.UI.enableRect(type);
    }

    disableRect() {
        PDFAnnotate.UI.disableRect();
    }

    setStoreAdapter(storeAdapter?: any) {
        if (storeAdapter) {
            PDFAnnotate.setStoreAdapter(storeAdapter);
        } else {
            PDFAnnotate.setStoreAdapter(new PDFAnnotate.LocalStoreAdapter());
        }
    }

    getStoreAdapter(): any {
        return PDFAnnotate.getStoreAdapter();
    }

    getUi() {
        return PDFAnnotate.UI;
    }
}
