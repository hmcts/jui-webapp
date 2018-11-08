import { Component, OnInit, AfterViewInit, OnDestroy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {Subscription} from 'rxjs';
import {PdfService} from '../../data/pdf.service';
import {AnnotationStoreService} from '../../data/annotation-store.service';
import { Annotation } from '../../data/annotation-set.model';

@Component({
    selector: 'app-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.scss'],
    providers: []
})
export class CommentsComponent implements OnInit, OnDestroy {

    private dataLoadedSub: Subscription;
    annotations: Annotation[];
    pageNumber: number;
    private pageNumSub: Subscription;

    constructor(private annotationStoreService: AnnotationStoreService,
                private pdfService: PdfService) {
    }

    ngOnInit() {
        this.dataLoadedSub = this.pdfService.getDataLoadedSub().subscribe(isDataLoaded => {
            if (isDataLoaded) {
                this.showAllComments();
                this.preRun();
            }
        });
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
            });
    }

    showAllComments() {
        // todo - refactor this out of component
        this.annotations = [];
        for (let i = 0; i < this.pdfService.pdfPages + 1; i++) {
            this.annotationStoreService.getAnnotationsForPage(i)
                .then((pageData: any) => {
                    this.annotations = this.annotations.concat(pageData.annotations.slice());
                });
        }
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
    }

    handleAnnotationClick(event) {
        const annotationId = event.getAttribute('data-pdf-annotate-id');
        this.annotationStoreService.getAnnotationById(annotationId)
            .then((annotation: Annotation) => {
                this.annotationStoreService.setAnnotationFocusSubject(annotation);
                this.annotationStoreService.setCommentFocusSubject(annotation);
                this.annotationStoreService.setToolBarUpdate(annotation, true);
            });
    }
}
