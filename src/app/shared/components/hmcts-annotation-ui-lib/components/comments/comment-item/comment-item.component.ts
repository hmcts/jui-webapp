import {Component, OnInit, Input, Output, EventEmitter, ViewChild, OnDestroy, ChangeDetectorRef, ElementRef} from '@angular/core';
import {NgForm} from '@angular/forms';
import { Subscription } from 'rxjs';
import {Comment, Annotation} from '../../../data/annotation-set.model';
import {AnnotationStoreService} from '../../../data/annotation-store.service';
import {PdfService} from '../../../data/pdf.service';

@Component({
    selector: 'app-comment-item',
    templateUrl: './comment-item.component.html',
    styleUrls: ['./comment-item.component.scss']
})
export class CommentItemComponent implements OnInit, OnDestroy {

    private commentBtnSub: Subscription;
    private commentFocusSub: Subscription;
    private dataLoadedSub: Subscription;
    hideButton: boolean;
    focused: boolean;

    @Input() comment: Comment;
    @Input() annotation: Annotation;

    @Output() commentSubmitted: EventEmitter<any> = new EventEmitter<any>();
    @Output() commentRendered: EventEmitter<any> = new EventEmitter<any>();
    @ViewChild('commentArea') commentArea: ElementRef;
    @ViewChild('commentItem') commentItem: NgForm;


    model = new Comment(null, null, null, null, null, null, null, null, null);
    commentTopPos: number;
    commentZIndex: number;

    constructor(private annotationStoreService: AnnotationStoreService,
                private pdfService: PdfService,
                private ref: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.hideButton = true;
        this.focused = false;

        this.commentFocusSub = this.annotationStoreService.getCommentFocusSubject()
            .subscribe((options) => {
                if (options.annotation.id === this.comment.annotationId) {
                    this.commentZIndex = 1;
                    this.focused = true;
                    if (options.showButton) {
                        this.handleShowBtn();
                        this.commentArea.nativeElement.focus();
                    }
                    this.ref.detectChanges();
                } else {
                    this.onBlur();
                }
        });

        this.commentBtnSub = this.annotationStoreService.getCommentBtnSubject()
            .subscribe((commentId) => {
                if (commentId === this.comment.id) {
                this.handleShowBtn();
                } else {
                this.handleHideBtn();
                }
          });

        this.dataLoadedSub = this.pdfService.getDataLoadedSub()
            .subscribe( (dataLoaded: boolean) => {
                if (dataLoaded) {
                    this.commentTopPos = this.getRelativePosition(this.comment.annotationId);
                    this.commentRendered.emit(true);
                }
            });
    }

    ngOnDestroy() {
        if (this.commentFocusSub) {
            this.commentFocusSub.unsubscribe();
        }
        if (this.commentBtnSub) {
            this.commentBtnSub.unsubscribe();
        }
        if (this.dataLoadedSub) {
            this.dataLoadedSub.unsubscribe();
        }
    }

    onSubmit() {
        const comment = this.convertFormToComment(this.commentItem);
        this.annotationStoreService.editComment(comment);
        this.commentSubmitted.emit(this.annotation);
        this.handleHideBtn();
    }

    isModified(): boolean {
        if (this.comment.createdDate === null) {
            return false;
        } else if (this.comment.lastModifiedBy === null) {
            return false;
        } else if (this.comment.createdDate === this.comment.lastModifiedDate) {
            return false;
        } else {
            return true;
        }
    }

    onBlur() {
        // this.handleHideBtn();
        if (!this.ref['destroyed']) {
            this.ref.detectChanges();
        }
        this.commentZIndex = 0;
    }

    convertFormToComment(commentForm: NgForm): Comment {
        return new Comment(
            this.comment.id,
            this.comment.annotationId,
            null,
            null,
            new Date(),
            null,
            null,
            null,
            commentForm.value.content
        );
    }

    handleDeleteComment() {
        this.annotationStoreService.deleteComment(this.comment.id);
    }

    handleCommentClick(event: any) {
        event.stopPropagation();
        this.annotationStoreService.setCommentBtnSubject(this.comment.id);
        this.annotationStoreService.setAnnotationFocusSubject(this.annotation);
        this.commentZIndex = 1;
    }

    handleShowBtn() {
        this.focused = true;
        this.hideButton = false;
    }

    handleHideBtn() {
        if (!this.commentItem.value.content) {
            this.annotationStoreService.deleteComment(this.comment.id);
        }
        this.focused = false;
        this.hideButton = true;
    }

    getRelativePosition(annotationId: string): number {
        const svgSelector = this.pdfService.getViewerElementRef().nativeElement
                                .querySelector(`g[data-pdf-annotate-id="${annotationId}"]`);
        if (svgSelector === null) {
            return null;
        } else {
            const highlightRect = <DOMRect>svgSelector.getBoundingClientRect();
            const wrapperRect = <DOMRect> this.pdfService.getAnnotationWrapper().nativeElement.getBoundingClientRect();

            const topPosition = (highlightRect.y - wrapperRect.top);
            return topPosition;
        }
    }
}
