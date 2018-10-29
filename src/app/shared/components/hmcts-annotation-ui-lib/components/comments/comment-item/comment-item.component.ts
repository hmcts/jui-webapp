import {Component, OnInit, Input, Output, EventEmitter, Renderer2, ElementRef, ViewChild, OnDestroy} from '@angular/core';
import {NgForm} from '@angular/forms';
import { Subscription } from 'rxjs';
import {Comment, Annotation} from '../../../data/annotation-set.model';
import {AnnotationStoreService} from '../../../data/annotation-store.service';

@Component({
    selector: 'app-comment-item',
    templateUrl: './comment-item.component.html',
    styleUrls: ['./comment-item.component.scss']
})
export class CommentItemComponent implements OnInit, OnDestroy {

    commentBtnSub: Subscription;
    hideButton: boolean;

    @Input() comment;
    @Input() selectedAnnotationId;
    @Input() annotation: Annotation;

    @Output() commentSubmitted: EventEmitter<any> = new EventEmitter<any>();
    @Output() commentSelected: EventEmitter<String> = new EventEmitter<String>();

    @ViewChild('commentTextField') commentTextField: ElementRef;
    @ViewChild('annotationIdField') annotationIdField: ElementRef;
    @ViewChild('commentItem') commentItem: NgForm;

    focused: boolean;

    model = new Comment(null, null, null, null, null, null, null);

    constructor(private annotationStoreService: AnnotationStoreService,
                private renderer: Renderer2) {
    }

    ngOnInit() {
        this.hideButton = true;
        this.focused = false;

        this.commentBtnSub = this.annotationStoreService.getCommentBtnSubject().subscribe((commentId) => {
            if (commentId === this.comment.id) {
              this.handleShowBtn();
            } else {
              this.handleHideBtn();
            }
          });
    }

    onSubmit() {
        const comment = this.convertFormToComment(this.commentItem);
        comment.lastModifiedDate = new Date();

        this.annotationStoreService.editComment(comment);
        this.commentSubmitted.emit(this.annotation);
    }

    ngOnDestroy() {
        if (this.commentBtnSub) {
            this.commentBtnSub.unsubscribe();
        }
     }

    onFocus() {
        this.focused = true;
    }

    onBlur() {
        setTimeout(() => {
            this.removeCommentSelectedStyle();
            this.focused = false;
            this.handleHideBtn();
        }, 200);
    }

    convertFormToComment(commentForm: NgForm) {
        return new Comment(
            commentForm.value.commentId,
            commentForm.value.annotationId,
            null,
            null,
            null,
            null,
            commentForm.value.content
        );
    }

    handleDeleteComment(event, commentId) {
        this.annotationStoreService.deleteComment(commentId);
    }

    handleCommentClick(event) {
        this.annotationStoreService.setCommentBtnSubject(this.comment.id);
        this.removeCommentSelectedStyle();
        this.renderer.addClass(this.commentTextField.nativeElement, 'comment-selected');
        this.commentSelected.emit(this.comment.annotationId);
    }

    handleShowBtn() {
        this.hideButton = false;
      }

    handleHideBtn() {
        this.hideButton = true;
    }

    removeCommentSelectedStyle() {
        const listItems = Array.from(document.querySelectorAll('#comment-wrapper .comment-list-item textarea'));
        listItems.forEach(item => {
            this.renderer.removeClass(item, 'comment-selected');
        });
    }
}
