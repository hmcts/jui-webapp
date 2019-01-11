import {ElementRef, Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import { PdfAnnotateWrapper } from './js-wrapper/pdf-annotate-wrapper';
import { EmLoggerService } from '../logging/em-logger.service';

@Injectable()
export class PdfService {

    private pageNumber: BehaviorSubject<number>;
    
    private annotationWrapper: ElementRef;
    listPages: {page: number; rect: any}[];

    constructor(private log: EmLoggerService,
                private pdfAnnotateWrapper: PdfAnnotateWrapper) {
        log.setClass('PdfService');
    }

    preRun() {
        this.pageNumber = new BehaviorSubject(1);
    }

    getAnnotationWrapper(): ElementRef {
        return this.annotationWrapper;
    }

    setAnnotationWrapper(annotationWrapper: ElementRef) {
        this.annotationWrapper = annotationWrapper;
    }

    getPageNumber(): BehaviorSubject<number> {
        return this.pageNumber;
    }

    setPageNumber(pageNumber: number) {
        this.pageNumber.next(pageNumber);
    }

    setHighlightTool() {
        this.log.info('Highlight cursor is enabled');
        this.pdfAnnotateWrapper.enableRect('highlight');
    }

    setCursorTool() {
        this.pdfAnnotateWrapper.disableRect();
    }
}
