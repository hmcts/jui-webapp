import { Injectable, ElementRef } from '@angular/core';
import { RenderOptions } from './js-wrapper/renderOptions.model';
import { PdfWrapper } from './js-wrapper/pdf-wrapper';
import { PdfAnnotateWrapper } from './js-wrapper/pdf-annotate-wrapper';
import { BehaviorSubject, Subject } from 'rxjs';
import { EmLoggerService } from '../logging/em-logger.service';
import { RotationModel } from '../model/rotation-factory.model';

@Injectable()
export class PdfRenderService {

    private viewerElementRef: ElementRef;
    private RENDER_OPTIONS: RenderOptions;
    private pdfPages: number;
    private dataLoadedSubject: BehaviorSubject<boolean>;

    listPagesSubject: Subject<RotationModel[]>;
    listPages: RotationModel[] = [];

    constructor(private pdfWrapper: PdfWrapper,
                private log: EmLoggerService,
                private pdfAnnotateWrapper: PdfAnnotateWrapper) {
        this.log.setClass('PdfRenderService');
        this.dataLoadedSubject = new BehaviorSubject(false);
        this.listPagesSubject = new Subject();
    }

    getDataLoadedSub(): BehaviorSubject<boolean> {
        return this.dataLoadedSubject;
    }

    dataLoadedUpdate(isLoaded: boolean) {
        this.dataLoadedSubject.next(isLoaded);
    }

    getRenderOptions() {
        return Object.assign({}, this.RENDER_OPTIONS);
    }

    setRenderOptions(RENDER_OPTIONS: RenderOptions): any {
        this.RENDER_OPTIONS = RENDER_OPTIONS;
    }

    getViewerElementRef(): ElementRef {
        return this.viewerElementRef;
    }

    getPdfPages(): number {
        return this.pdfPages;
    }
    
    render(viewerElementRef?: ElementRef) {
        if (viewerElementRef != null) {
            this.viewerElementRef = viewerElementRef;
        }

        this.pdfWrapper.workerSrc('/public/javascripts/pdf.worker.js');
        
        const renderOptions = this.getRenderOptions();
        this.pdfWrapper.getDocument(renderOptions.documentId)
            .then(pdf => {
                renderOptions.pdfDocument = pdf;
                const viewer = this.viewerElementRef.nativeElement;
                viewer.innerHTML = '';
                this.pdfPages = pdf.pdfInfo.numPages;

                for (let i = 1; i < this.pdfPages + 1; i++) {
                    const pageDom = this.pdfAnnotateWrapper.createPage(i);
                    // Create a copy of the render options for each page.
                    const pageOptions = Object.assign({}, renderOptions);
                    viewer.appendChild(pageDom);
                    this.addDomPage(pageDom, i);
                    pdf.getPage(i).then((pdfPage) => {
                        // Get current page rotation from page rotation objects
                        pageOptions.rotate = this.getPageRotation(renderOptions, pageOptions, pdfPage);
                        setTimeout(() => {
                            this.pdfAnnotateWrapper.renderPage(i, pageOptions).then(() => {
                                if (i === this.pdfPages - 1) {
                                    this.setRenderOptions(renderOptions);
                                    this.dataLoadedUpdate(true);
                                    this.listPagesSubject.next(this.listPages);
                                }
                            });
                        });
                    });
                }
            }).catch(
            (error) => {
                const errorMessage = new Error('Unable to render your supplied PDF. ' +
                renderOptions.documentId + '. Error is: ' + error);
                this.log.error('Encountered error while rendering the PDF:' + errorMessage);
            });
    }

    addDomPage(pageDom: any, pageNumber: number) {
        const pagedetails = new RotationModel(pageNumber, pageDom);
        const index = this.listPages.findIndex(pageElement => pageElement.pageNumber === pageNumber);
        if (index > 0) {
            this.listPages[index] = pagedetails;
        } else {
            this.listPages.push(pagedetails);
        }
    }

    getPageRotation(renderOptions: RenderOptions, pageOptions: RenderOptions, pdfPage: any): number {
        let rotation = pageOptions.rotationPages
            .filter(rotateObj => rotateObj.page === pdfPage.pageNumber)
            .map(rotateObj => rotateObj.rotate)[0];
        if (!rotation) {
            renderOptions.rotationPages.push({page: pdfPage.pageNumber, rotate: pdfPage.rotate});
            rotation = pdfPage.rotate;
        }
        return rotation;
    }
}
