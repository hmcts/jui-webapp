
export class RenderOptions { 
    documentId: string;
    pdfDocument: any;
    scale: any;
    rotate: number;
    rotationPages: {page: number, rotate: number}[];

    constructor(
        documentId: string,
        pdfDocument: any,
        scale: any,
        rotate: number,
        rotationPages: {page: number, rotate: number}[]) {
            this.documentId = documentId;
            this.pdfDocument = pdfDocument;
            this.scale = scale;
            this.rotate = rotate;
            this.rotationPages = rotationPages;
        }
}
