import {ElementRef, Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import { PdfWrapper } from './js-wrapper/pdf-wrapper';
import { PdfAnnotateWrapper } from './js-wrapper/pdf-annotate-wrapper';

@Injectable()
export class PdfService {

    private pdfPages: number;
    private RENDER_OPTIONS: { documentId: string, pdfDocument: any, scale: any, rotate: number };
    private pageNumber: BehaviorSubject<number>;
    private dataLoadedSubject: BehaviorSubject<boolean>;
    private viewerElementRef: ElementRef;
    private annotationWrapper: ElementRef;

    constructor(private pdfWrapper: PdfWrapper,
                private pdfAnnotateWrapper: PdfAnnotateWrapper) {
        this.dataLoadedSubject = new BehaviorSubject(false);
    }

    preRun() {
        this.pdfWrapper.workerSrc('/public/javascripts/pdf.worker.js');
        this.pageNumber = new BehaviorSubject(1);
    }

    getPdfPages(): number {
        return this.pdfPages;
    }

    getAnnotationWrapper(): ElementRef {
        return this.annotationWrapper;
    }

    setAnnotationWrapper(annotationWrapper: ElementRef) {
        this.annotationWrapper = annotationWrapper;
    }

    getViewerElementRef(): ElementRef {
        return this.viewerElementRef;
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
                this.pdfPages = pdf.pdfInfo.numPages;
                pdf.getPage(1).then((pdfPage) => {
                    this.RENDER_OPTIONS.rotate = this.calculateRotation(pdfPage);
                    for (let i = 0; i < this.pdfPages; i++) {
                        const page = this.pdfAnnotateWrapper.createPage(i + 1);
                        viewer.appendChild(page);
                        setTimeout(() => {
                            this.pdfAnnotateWrapper.renderPage(i + 1, this.RENDER_OPTIONS).then(() => {
                                if (i === this.pdfPages - 1) {
                                    this.dataLoadedUpdate(true);
                                }
                            });
                        });
                    }
                });
            }).catch(
            (error) => {
                const errorMessage = new Error('Unable to render your supplied PDF. ' +
                    this.RENDER_OPTIONS.documentId + '. Error is: ' + error);
                console.log(errorMessage);
            }
        );
    }

    calculateRotation(pdfPage): number {
        const rotateVal = pdfPage.rotate + this.RENDER_OPTIONS.rotate;
        if (rotateVal >= 0) {
            return (rotateVal >= 360) ? rotateVal - 360 : rotateVal;
        } else {
            return 360 - Math.abs(rotateVal);
        }
    }

    setHighlightTool() {
        this.pdfAnnotateWrapper.enableRect('highlight');
    }

    setCursorTool() {
        this.pdfAnnotateWrapper.disableRect();
    }
}
