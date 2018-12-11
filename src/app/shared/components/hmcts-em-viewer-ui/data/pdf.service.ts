import {ElementRef, Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import { PdfWrapper } from './js-wrapper/pdf-wrapper';
import { PdfAnnotateWrapper } from './js-wrapper/pdf-annotate-wrapper';
import { RenderOptions } from './js-wrapper/renderOptions.model';
import { RotationFactoryService } from '../viewers/rotation-factory.service';

@Injectable()
export class PdfService {

    private pdfPages: number;
    private RENDER_OPTIONS: RenderOptions;
    private pageNumber: BehaviorSubject<number>;
    private dataLoadedSubject: BehaviorSubject<boolean>;
    private viewerElementRef: ElementRef;
    private annotationWrapper: ElementRef;

    constructor(private pdfWrapper: PdfWrapper,
                private pdfAnnotateWrapper: PdfAnnotateWrapper,
                private rotationFactoryService: RotationFactoryService) {
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

    setRenderOptions(RENDER_OPTIONS: RenderOptions): any {
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

                for (let i = 1; i < this.pdfPages + 1; i++) {
                    const page = this.pdfAnnotateWrapper.createPage(i);
                    
                    // Create a copy of the render options for each page.
                    const pageOptions = Object.assign({}, this.RENDER_OPTIONS);
                    viewer.appendChild(page);
                    pdf.getPage(i).then((pdfPage) => {
                        // Get current page rotation from page rotation objects
                        pageOptions.rotate = this.getPageRotation(pageOptions, pdfPage);
                        setTimeout(() => {
                            this.pdfAnnotateWrapper.renderPage(i, pageOptions).then(() => {
                                if (i === this.pdfPages - 1) {
                                    this.dataLoadedUpdate(true);
                                }
                            });
                        });
                    });

                    const rect = page.getBoundingClientRect();

                    this.rotationFactoryService.addToDom(i, rect);
                    
                }
            }).catch(
            (error) => {
                const errorMessage = new Error('Unable to render your supplied PDF. ' +
                    this.RENDER_OPTIONS.documentId + '. Error is: ' + error);
                console.log(errorMessage);
            }
        );
    }

    getPageRotation(pageOptions: RenderOptions, pdfPage: any): number {
        let rotation = pageOptions.rotationPages
            .filter(rotateObj => rotateObj.page === pdfPage.pageNumber)
            .map(rotateObj => rotateObj.rotate)[0];
        if (!rotation) {
            this.RENDER_OPTIONS.rotationPages.push({page: pdfPage.pageNumber, rotate: pdfPage.rotate});
            rotation = pdfPage.rotate;
        }
        return rotation;
    }

    setHighlightTool() {
        this.pdfAnnotateWrapper.enableRect('highlight');
    }

    setCursorTool() {
        this.pdfAnnotateWrapper.disableRect();
    }
}
