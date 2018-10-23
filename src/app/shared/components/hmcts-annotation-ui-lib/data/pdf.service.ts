import {ElementRef, Injectable} from '@angular/core';
import {Subject} from 'rxjs';

declare const PDFJS: any;
declare const PDFAnnotate: any;

@Injectable()
export class PdfService {

    PAGE_HEIGHT;
    UI;
    comments;
    private RENDER_OPTIONS: { documentId: string, pdfDocument: any, scale: any, rotate: number };
    private pageNumber: Subject<number>;
    private annotationSub: Subject<string>;
    pdfPages: number;
    viewerElementRef: ElementRef;

    constructor() {
    }

    preRun() {
        this.PAGE_HEIGHT = void 0;
        this.UI = PDFAnnotate.UI;

        this.pageNumber = new Subject();
        this.pageNumber.next(1);

        this.annotationSub = new Subject();
        this.annotationSub.next(null);
    }

    getPageNumber(): Subject<number> {
        return this.pageNumber;
    }

    setPageNumber(pageNumber: number) {
        this.pageNumber.next(pageNumber);
    }

    getAnnotationClicked(): Subject<string> {
        return this.annotationSub;
    }

    setAnnotationClicked(annotationId: string) {
        this.annotationSub.next(annotationId);
    }

    getRenderOptions() {
        return Object.assign({}, this.RENDER_OPTIONS);
    }

    setRenderOptions(RENDER_OPTIONS: { documentId: string; pdfDocument: null; scale: number; rotate: number; }): any {
        this.RENDER_OPTIONS = RENDER_OPTIONS;
    }

    render(viewerElementRef?: ElementRef) {
        if (viewerElementRef != null) {
            this.viewerElementRef = viewerElementRef;
        }
        PDFJS.workerSrc = '/public/javascripts/pdf.worker.js';
        PDFJS.getDocument(this.RENDER_OPTIONS.documentId)
            .then(pdf => {
                this.RENDER_OPTIONS.pdfDocument = pdf;

                const viewer = this.viewerElementRef.nativeElement;
                viewer.innerHTML = '';
                const NUM_PAGES = pdf.pdfInfo.numPages;
                for (let i = 0; i < NUM_PAGES; i++) {
                    const page = this.UI.createPage(i + 1);
                    viewer.appendChild(page);
                    this.UI.renderPage(i + 1, this.RENDER_OPTIONS);
                }
                this.pdfPages = NUM_PAGES;

                // this.UI.renderPage(1, this.RENDER_OPTIONS)
                //   .then(_ref => {
                //     const _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
                //     const _ref2 = _slicedToArray(_ref, 2);
                //
                //     const pdfPage = _ref2[0];
                //     const annotations = _ref2[1];
                //     this.PAGE_HEIGHT = pdfPage.getViewport(this.RENDER_OPTIONS.scale, this.RENDER_OPTIONS.rotate);
                // });
            }).catch(
            (error) => {
                const errorMessage = new Error('Unable to render your supplied PDF. ' +
                    this.RENDER_OPTIONS.documentId + '. Error is: ' + error);
                console.log(errorMessage);
            }
        );
    }

    renderPage(visiblePageNum: number) {
        PDFAnnotate.UI.renderPage(visiblePageNum, this.RENDER_OPTIONS);
    }

    setHighlightTool() {
        localStorage.setItem(this.RENDER_OPTIONS.documentId + '/tooltype', 'highlight');
        PDFAnnotate.UI.enableRect('highlight');
        PDFAnnotate.UI.disableEdit();
    }

    setCursorTool() {
        PDFAnnotate.UI.disableRect();
        PDFAnnotate.UI.enableEdit();
        localStorage.setItem(this.RENDER_OPTIONS.documentId + '/tooltype', 'cursor');
    }

    setScale(scale) {
        scale = parseFloat(scale);
        if (this.RENDER_OPTIONS.scale !== scale) {
            this.RENDER_OPTIONS.scale = scale;
            localStorage.setItem(this.RENDER_OPTIONS.documentId + '/scale', this.RENDER_OPTIONS.scale);
            this.render();
        }
    }
}
