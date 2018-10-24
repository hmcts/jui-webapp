import {ElementRef, Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import { PdfWrapper } from './js-wrapper/pdf-wrapper';
import { PdfAnnotateWrapper } from './js-wrapper/pdf-annotate-wrapper';

@Injectable()
export class PdfService {
    UI: any;
    pdfPages: number;
    private RENDER_OPTIONS: { documentId: string, pdfDocument: any, scale: any, rotate: number };
    private pageNumber: BehaviorSubject<number>;
    private dataLoadedSubject: BehaviorSubject<boolean>;

    viewerElementRef: ElementRef;

    constructor(private pdfWrapper: PdfWrapper,
                private pdfAnnotateWrapper: PdfAnnotateWrapper) {
        this.dataLoadedSubject = new BehaviorSubject(false);
    }

    preRun() {
        this.pdfWrapper.workerSrc('/public/javascripts/pdf.worker.js');
        this.pageNumber = new BehaviorSubject(1);
    }

    getDataLoadedSub(): BehaviorSubject<boolean> {
        return this.dataLoadedSubject;
    }

    dataLoadedUpdate(isLoaded: boolean) {
        this.dataLoadedSubject.next(isLoaded);
    }

    getPageNumber(): BehaviorSubject<number> {
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

        this.pdfWrapper.getDocument(this.RENDER_OPTIONS.documentId)
            .then(pdf => {
                this.RENDER_OPTIONS.pdfDocument = pdf;
                const viewer = this.viewerElementRef.nativeElement;
                viewer.innerHTML = '';
                const NUM_PAGES = pdf.pdfInfo.numPages;
                for (let i = 0; i < NUM_PAGES; i++) {
                    const page = this.pdfAnnotateWrapper.createPage(i + 1);
                    viewer.appendChild(page);
                    setTimeout(() => {
                        this.pdfAnnotateWrapper.renderPage(i + 1, this.RENDER_OPTIONS).then(() => {
                            if (i === NUM_PAGES - 1) {
                                this.dataLoadedUpdate(true);
                            }
                        });
                    });
                }
                this.pdfPages = NUM_PAGES;
            }).catch(
            (error) => {
                const errorMessage = new Error('Unable to render your supplied PDF. ' +
                    this.RENDER_OPTIONS.documentId + '. Error is: ' + error);
                console.log(errorMessage);
            }
        );
    }

    setHighlightTool() {
        this.pdfAnnotateWrapper.enableRect('highlight');
    }

    setCursorTool() {
        this.pdfAnnotateWrapper.disableRect();
    }
}
