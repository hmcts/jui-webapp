import {Component, OnInit, ViewChild, ElementRef, Inject, Input, ChangeDetectorRef, Renderer2, OnDestroy} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {PdfService} from '../../data/pdf.service';
import { Subscription } from 'rxjs';
import {AnnotationStoreService} from '../../data/annotation-store.service';
import {IAnnotationSet, Annotation} from '../../data/annotation-set.model';
import {NpaService} from '../../data/npa.service';
import {ApiHttpService} from '../../data/api-http.service';
import { Utils } from '../../data/utils';

@Component({
    selector: 'app-annotation-pdf-viewer',
    templateUrl: './annotation-pdf-viewer.component.html',
    styleUrls: ['./annotation-pdf-viewer.component.scss'],
    providers: []
})
export class AnnotationPdfViewerComponent implements OnInit, OnDestroy {

    @Input() annotate: boolean;
    @Input() dmDocumentId: string;
    @Input() outputDmDocumentId: string;
    @Input() url: string;
    @Input() annotationSet: IAnnotationSet;
    @Input() baseUrl: string;

    private renderedPages: {};
    private page: number;
    private focusedAnnotationSubscription: Subscription;
    private pageNumberSubscription: Subscription;

    @ViewChild('contentWrapper') contentWrapper: ElementRef;
    @ViewChild('viewer') viewerElementRef: ElementRef;

    constructor(private pdfService: PdfService,
                private npaService: NpaService,
                private apiHttpService: ApiHttpService,
                private annotationStoreService: AnnotationStoreService,
                private utils: Utils,
                private ref: ChangeDetectorRef,
                private render: Renderer2,
                @Inject(DOCUMENT) private document: any) {
    }

    ngOnInit() {
        this.loadAnnotations(this.annotate);
        this.pdfService.preRun();
        this.pdfService.setRenderOptions({
            documentId: this.url,
            pdfDocument: null,
            scale: parseFloat('1.33'),
            rotate: parseInt(localStorage.getItem(this.url + '/rotate'), 10) || 0
        });

        this.renderedPages = {};
        this.pdfService.render(this.viewerElementRef);
        this.pdfService.setHighlightTool();
        this.pageNumberSubscription = this.pdfService.getPageNumber()
            .subscribe(page => this.page = page);
        this.focusedAnnotationSubscription = this.annotationStoreService.getAnnotationFocusSubject()
            .subscribe(focusedAnnotation => this.focusHighlightStyle(focusedAnnotation));
    }

    ngOnDestroy() {
        if (this.pageNumberSubscription) {
            this.pageNumberSubscription.unsubscribe();
        }
        if (this.focusedAnnotationSubscription) {
            this.focusedAnnotationSubscription.unsubscribe();
        }
    }

    loadAnnotations(annotate: boolean) {
        if (annotate) {
            this.apiHttpService.setBaseUrl(this.baseUrl);
            this.annotationStoreService.preLoad(this.annotationSet);
            this.npaService.outputDmDocumentId.next(this.outputDmDocumentId);
        } else {
            this.annotationStoreService.preLoad(null);
        }
    }

    focusHighlightStyle(focusedAnnotation: Annotation) {
        Array.from(this.document.querySelector(`#pageContainer${this.page} .annotationLayer`).childNodes)
            .forEach((annotationDom: HTMLInputElement) => {
                if (annotationDom.dataset.pdfAnnotateId === focusedAnnotation.id) {
                    this.render.addClass(annotationDom, 'comment-selected');
                } else {
                    this.render.removeClass(annotationDom, 'comment-selected');
                }
            });
        if (!this.ref['destroyed']) {
            this.ref.detectChanges();
        }
    }

    handleClick(event: any) {
        if (!this.utils.clickIsHighlight(event)) {
            this.unfocusAnnotation();
        }
        this.pdfService.setPageNumber(this.utils.getClickedPage(event));
    }

    unfocusAnnotation() {
        this.annotationStoreService.setAnnotationFocusSubject(
            new Annotation());
        this.annotationStoreService.setCommentBtnSubject(null);
        this.annotationStoreService.setCommentFocusSubject(
            new Annotation(), null);
    }

    handlePdfScroll(event) {
        const element = event.srcElement as HTMLInputElement;
        const visiblePageNum = Math.round(element.scrollTop / 1056) + 1; // Hardcoded page height as 1056

        const visiblePage = this.document.querySelector('.page[data-page-number="' + visiblePageNum + '"][data-loaded="false"]');
        this.annotationStoreService.setToolBarUpdate(null);

        if (visiblePage && !this.renderedPages[visiblePageNum]) {
            // Prevent invoking UI.renderPage on the same page more than once.
            this.renderedPages[visiblePageNum] = true;
            setTimeout(() => this.pdfService.renderPage(visiblePageNum), 100);
        }
        if (this.page !== visiblePageNum) {
            this.page = visiblePageNum;
            if (!isNaN(visiblePageNum)) {
                this.pdfService.setPageNumber(visiblePageNum);
            }
        }
    }
}
