import { Component, OnInit, OnDestroy, ViewChildren, QueryList } from '@angular/core';
import {Subscription} from 'rxjs';
import {PdfService} from '../../data/pdf.service';
import {AnnotationStoreService} from '../../data/annotation-store.service';
import { Annotation } from '../../data/annotation-set.model';
import { CommentItemComponent } from './comment-item/comment-item.component';
import { Utils } from '../../data/utils';

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
                private utils: Utils) {
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
            .sort((a, b) => {
                if (this.utils.isSameLine(a.annotationTopPos, b.annotationTopPos)) {
                    return this.utils.sortByLinePosition(a.annotation.rectangles, b.annotation.rectangles); 
                }
                if (a.commentTopPos < b.commentTopPos) { return -1; }
                if (a.commentTopPos > b.commentTopPos) { return 1; }
                return 0;
            });
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
