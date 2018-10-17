import {Component, OnInit, Renderer2, ChangeDetectorRef, AfterViewInit, OnDestroy, Inject} from '@angular/core';
import {Subscription} from 'rxjs';
import {PdfService} from '../../data/pdf.service';
import {AnnotationStoreService} from '../../data/annotation-store.service';
import { DOCUMENT } from '@angular/platform-browser';

declare const PDFAnnotate: any;

@Component({
    selector: 'app-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.scss'],
    providers: []
})
export class CommentsComponent implements OnInit, AfterViewInit, OnDestroy {

    selectedAnnotationId: string;
    annotations;
    pageNumber: number;
    subscription: Subscription;

    constructor(private annotationStoreService: AnnotationStoreService,
                private pdfService: PdfService,
                private render: Renderer2,
                private ref: ChangeDetectorRef,
                @Inject(DOCUMENT) private document: any) {
    }

    ngOnInit() {
        this.pageNumber = 1;
        this.showAllComments();

        this.subscription = this.pdfService.getPageNumber().subscribe(
            pageNumber => {
                this.pageNumber = pageNumber;
                this.showAllComments();
            });
    }

    ngAfterViewInit() {
        this.document.querySelector('#viewer').addEventListener('click', this.handleAnnotationBlur.bind(this));
        PDFAnnotate.UI.addEventListener('annotation:click', this.handleAnnotationClick.bind(this));
    }

    ngOnDestroy() {
        this.ref.detach();
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    showAllComments() {

        // todo - refactor this out of component
        this.annotationStoreService.getAnnotationsForPage(this.pageNumber).then(
            (pageData: any) => {

                const annotations = pageData.annotations.slice();
                this.sortByY(annotations);

                annotations.forEach(annotation => {
                    this.getAnnotationComments(annotation);
                });
                this.annotations = annotations;
            });
    }

    sortByY(annotations) {
        annotations.sort(
            function (a, b) {
                const keyA = a.rectangles[0].y,
                    keyB = b.rectangles[0].y;
                if (keyA < keyB) return -1;
                if (keyA > keyB) return 1;
                return 0;
            });
    }

    getAnnotationCommentsById(annotationId) {
        // Refactor this out of component
        this.annotationStoreService.getAnnotationById(annotationId).then(
            annotation => {
                this.annotations = this.getAnnotationComments(annotation);
            });
    }

    getAnnotationComments(annotation) {
        // Refactor this out of component
        annotation.comments = [];
        this.annotationStoreService.getCommentsForAnnotation(annotation.id).then(
            comments => {
                annotation.comments = comments;
            });
    }

    handleAnnotationBlur() {
        this.selectedAnnotationId = null;
        this.showAllComments();
        this.addHighlightedCommentStyle(null);
    }

    supportsComments(target) {
        const type = target.getAttribute('data-pdf-annotate-type');
        return ['point', 'highlight'].indexOf(type) > -1;
    }

    handleAnnotationClick(event) {
        if (this.supportsComments(event)) {
            this.selectedAnnotationId = event.getAttribute('data-pdf-annotate-id');
            this.addHighlightedCommentStyle(this.selectedAnnotationId);
            if (!this.ref['destroyed']) {
                this.ref.detectChanges();
            }
        }
    }

    addHighlightedCommentStyle(linkedAnnotationId) {
        const annotations = Array.from(this.document.querySelector(`#pageContainer${this.pageNumber} .annotationLayer`).childNodes);

        annotations.forEach(annotation => {
            this.render.removeClass(annotation, 'comment-selected');
            const annotationId = (<HTMLInputElement>annotation).dataset.pdfAnnotateId;
            if (annotationId === linkedAnnotationId) {
                this.render.addClass(annotation, 'comment-selected');
            }
        });
    }
}
