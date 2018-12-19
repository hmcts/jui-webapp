import { Component, OnInit, OnDestroy, ViewChildren, QueryList } from '@angular/core';
import {Subscription} from 'rxjs';
import { CommentItemComponent } from './comment-item/comment-item.component';
import { Annotation } from '../../../data/annotation-set.model';
import { AnnotationStoreService } from '../../../data/annotation-store.service';
import { PdfService } from '../../../data/pdf.service';
import { Utils } from '../../../data/utils';
import { EmLoggerService } from '../../../logging/em-logger.service';

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
    @ViewChildren('commentItem') commentItems: QueryList<CommentItemComponent>;

    constructor(private annotationStoreService: AnnotationStoreService,
                private pdfService: PdfService,
                private utils: Utils,
                private log: EmLoggerService) {
        this.log.setClass('CommentsComponent');
    }

    ngOnInit() {
        this.dataLoadedSub = this.pdfService.getDataLoadedSub()
            .subscribe(isDataLoaded => {
                if (isDataLoaded) {
                    this.showAllComments();
                    this.preRun();
                }
        });
    }

    redrawCommentItemComponents() {
        setTimeout(() => {
            let previousCommentItem: CommentItemComponent;
            this.sortCommentItemComponents().forEach((commentItem: CommentItemComponent) => {
                    previousCommentItem = this.isOverlapping(commentItem, previousCommentItem);
                });
        });
    }

    sortCommentItemComponents() {
        return this.commentItems.map((commentItem: CommentItemComponent) => commentItem)
            .sort((a: CommentItemComponent, b: CommentItemComponent) => {
                return this.processSort(a, b);
            });
    }

    processSort(a: CommentItemComponent, b: CommentItemComponent): number {
        if (this.isAnnotationOnSameLine(a, b)) {
            if (a.annotationLeftPos < b.annotationLeftPos) { return -1; }
            if (a.annotationLeftPos >= b.annotationLeftPos) { return 1; }
        }
        if (a.annotationTopPos < b.annotationTopPos) { return -1; }
        if (a.annotationTopPos >= b.annotationTopPos) { return 1; }

        return 0;
    }

    isAnnotationOnSameLine(a: CommentItemComponent, b: CommentItemComponent): boolean {
        const delta = (a.annotationHeight >= b.annotationHeight) ? a.annotationHeight : b.annotationHeight;
        if (this.utils.difference(a.annotationTopPos, b.annotationTopPos) > delta) {
            return false;
        }
        return true;
    }

    isOverlapping(commentItem: CommentItemComponent, previousCommentItem: CommentItemComponent): CommentItemComponent {
        commentItem.commentTopPos = commentItem.annotationTopPos;
        if (previousCommentItem) {
            const endOfPreviousCommentItem = (previousCommentItem.commentTopPos + previousCommentItem.commentHeight);
            if (commentItem.commentTopPos <= endOfPreviousCommentItem) {
                commentItem.commentTopPos = endOfPreviousCommentItem;
            }
        }
        return commentItem;
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
        for (let i = 0; i < this.pdfService.getPdfPages() + 1; i++) {
            this.annotationStoreService.getAnnotationsForPage(i)
                .then((pageData: any) => {
                    this.annotations = this.annotations.concat(pageData.annotations.slice());
                });
        }
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
