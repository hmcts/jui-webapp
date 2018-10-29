import { Component, OnInit, AfterViewInit, OnDestroy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import {Subscription} from 'rxjs';
import {PdfService} from '../../data/pdf.service';
import {AnnotationStoreService} from '../../data/annotation-store.service';
import { Annotation } from '../../data/annotation-set.model';

declare const PDFAnnotate: any;

@Component({
    selector: 'app-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.scss'],
    providers: []
})
export class CommentsComponent implements OnInit, AfterViewInit, OnDestroy {

    private dataLoadedSub: Subscription;
    annotations: Annotation[];
    pageNumber: number;
    private pageNumSub: Subscription;

    constructor(private annotationStoreService: AnnotationStoreService,
                private pdfService: PdfService,
                @Inject(DOCUMENT) private document: any) {
    }

    ngOnInit() {
        this.dataLoadedSub = this.pdfService.getDataLoadedSub().subscribe(isDataLoaded => {
            if (isDataLoaded) {
                this.preRun();
            }
        });
    }

    ngAfterViewInit() {
        this.document.querySelector('#viewer').addEventListener('click', this.handleAnnotationBlur.bind(this));
        PDFAnnotate.UI.addEventListener('annotation:click', this.handleAnnotationClick.bind(this));
    }

    ngOnDestroy() {
        if (this.pageNumSub) {
            this.pageNumSub.unsubscribe();
        }
        if (this.dataLoadedSub) {
            this.dataLoadedSub.unsubscribe();
        }
    }

    preRun() {
        this.pageNumSub = this.pdfService.getPageNumber().subscribe(
            pageNumber => {
                this.pageNumber = pageNumber;
                this.showAllComments();
            });
    }

    showAllComments() {
        // todo - refactor this out of component
        this.annotationStoreService.getAnnotationsForPage(this.pageNumber)
            .then((pageData: any) => {
                const annotations = pageData.annotations.slice();
                this.sortByY(annotations);
                this.annotations = annotations;
            });
    }

    sortByY(annotations) {
        annotations.sort(
            function (a, b) {
                const keyA = a.rectangles[0].y,
                    keyB = b.rectangles[0].y;
                if (keyA < keyB) { return -1; }
                if (keyA > keyB) { return 1; }
                return 0;
            });
    }

    handleAnnotationBlur() {
        this.showAllComments();
        this.annotationStoreService.setToolBarUpdate(null, null);
    }

    handleAnnotationClick(event) {
        const annotationId = event.getAttribute('data-pdf-annotate-id');
        this.annotationStoreService.getAnnotationById(annotationId)
            .then((annotation: Annotation) => {
                console.log(annotation);
                this.annotationStoreService.setAnnotationFocusSubject(annotation);
                this.annotationStoreService.setCommentFocusSubject(annotation);
                this.annotationStoreService.setToolBarUpdate(annotation, true);
            });
    }
}
