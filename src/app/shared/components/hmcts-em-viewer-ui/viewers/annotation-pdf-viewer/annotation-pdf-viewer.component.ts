import {Component, OnInit, ViewChild, ElementRef, Input, ChangeDetectorRef, Renderer2, OnDestroy, AfterViewInit} from '@angular/core';
import {PdfService} from '../../data/pdf.service';
import { Subscription } from 'rxjs';
import {AnnotationStoreService} from '../../data/annotation-store.service';
import {IAnnotationSet, Annotation} from '../../data/annotation-set.model';
import {NpaService} from '../../data/npa.service';
import {ApiHttpService} from '../../data/api-http.service';
import { Utils } from '../../data/utils';
import { PdfAnnotateWrapper } from '../../data/js-wrapper/pdf-annotate-wrapper';
import { CommentsComponent } from './comments/comments.component';
import { ContextualToolbarComponent } from './contextual-toolbar/contextual-toolbar.component';


@Component({
    selector: 'app-annotation-pdf-viewer',
    templateUrl: './annotation-pdf-viewer.component.html',
    styleUrls: ['./annotation-pdf-viewer.component.scss'],
    providers: []
})
export class AnnotationPdfViewerComponent implements OnInit, AfterViewInit, OnDestroy {

    @Input() annotate: boolean;
    @Input() dmDocumentId: string;
    @Input() outputDmDocumentId: string;
    @Input() url: string;
    @Input() annotationSet: IAnnotationSet;
    @Input() baseUrl: string;

    private page: number;
    private focusedAnnotationSubscription: Subscription;
    private pageNumberSubscription: Subscription;

    @ViewChild('contentWrapper') contentWrapper: ElementRef;
    @ViewChild('viewer') viewerElementRef: ElementRef;
    @ViewChild('annotationWrapper') annotationWrapper: ElementRef;
    @ViewChild('commentsComponent') commentsComponent: CommentsComponent;
    @ViewChild('contextualToolbar') contextualToolbar: ContextualToolbarComponent;

    constructor(private pdfService: PdfService,
                private npaService: NpaService,
                private apiHttpService: ApiHttpService,
                private annotationStoreService: AnnotationStoreService,
                private utils: Utils,
                private ref: ChangeDetectorRef,
                private renderer: Renderer2,
                private pdfAnnotateWrapper: PdfAnnotateWrapper) {
    }

    ngOnInit() {
        this.loadAnnotations(this.annotate);
        this.pdfService.preRun();
        this.pdfService.setRenderOptions({
            documentId: this.url,
            pdfDocument: null,
            scale: parseFloat('1.33'),
            rotate: 0,
            rotationPages: []
        });

        this.pdfService.render(this.viewerElementRef);
        this.pdfService.setAnnotationWrapper(this.annotationWrapper);
        this.pageNumberSubscription = this.pdfService.getPageNumber()
            .subscribe(page => this.page = page);
        this.focusedAnnotationSubscription = this.annotationStoreService.getAnnotationFocusSubject()
            .subscribe(focusedAnnotation => this.focusHighlightStyle(focusedAnnotation));
    }

    ngAfterViewInit() {
        this.pdfAnnotateWrapper.getUi().addEventListener('annotation:click', this.handleAnnotationClick.bind(this));
    }

    ngOnDestroy() {
        if (this.pageNumberSubscription) {
            this.pageNumberSubscription.unsubscribe();
        }
        if (this.focusedAnnotationSubscription) {
            this.focusedAnnotationSubscription.unsubscribe();
        }
    }

    onRotateClockwise() {
        const RENDER_OPTIONS = this.pdfService.getRenderOptions();
        RENDER_OPTIONS.rotate = RENDER_OPTIONS.rotate + 90;
        this.pdfService.setRenderOptions(RENDER_OPTIONS);
        this.pdfService.render();
    }
    
     onRotateAntiClockwise() {
        const RENDER_OPTIONS = this.pdfService.getRenderOptions();
        RENDER_OPTIONS.rotate = RENDER_OPTIONS.rotate - 90;
        this.pdfService.setRenderOptions(RENDER_OPTIONS);
        this.pdfService.render();
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

    handleClick(event: any, isPage?: boolean) {
        if (this.annotate) {
            if (!this.utils.clickIsHighlight(event)) {
                this.unfocusAnnotation();
                this.annotationStoreService.setToolBarUpdate(null, null);
            }
            this.commentsComponent.handleAnnotationBlur();

            if (isPage) {
                this.pdfService.setPageNumber(this.utils.getClickedPage(event));
            }
        }
    }

    unfocusAnnotation() {
        this.annotationStoreService.setAnnotationFocusSubject(
            new Annotation());
        this.annotationStoreService.setCommentBtnSubject(null);
        this.annotationStoreService.setCommentFocusSubject(
            new Annotation(), null);
    }

    handleAnnotationClick(event) {
        if (!this.contextualToolbar.isShowToolbar) {
            const annotationId = event.getAttribute('data-pdf-annotate-id');
            this.annotationStoreService.getAnnotationById(annotationId)
                .then((annotation: Annotation) => {
                    this.annotationStoreService.setAnnotationFocusSubject(annotation);
                    this.annotationStoreService.setCommentFocusSubject(annotation);
                    this.annotationStoreService.setToolBarUpdate(annotation, true);
                });
        }
    }

    focusHighlightStyle(focusedAnnotation: Annotation) {
        Array.from(this.viewerElementRef.nativeElement.querySelector(`#pageContainer${this.page} .annotationLayer`).childNodes)
            .forEach((annotationDom: HTMLInputElement) => {
                if (annotationDom.dataset.pdfAnnotateId === focusedAnnotation.id) {
                    this.renderer.addClass(annotationDom, 'comment-selected');
                } else {
                    this.renderer.removeClass(annotationDom, 'comment-selected');
                }
            });
        if (!this.ref['destroyed']) {
            this.ref.detectChanges();
        }
    }

}
