import {Component, ViewChild, Input, OnChanges, Output, EventEmitter, Renderer2, ElementRef} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Comment} from '../../../data/annotation-set.model';
import {AnnotationStoreService} from '../../../data/annotation-store.service';

@Component({
    selector: 'app-comment-form',
    templateUrl: './comment-form.component.html',
    styleUrls: ['../comments.component.scss']
})
export class CommentFormComponent implements OnChanges {

    @ViewChild('commentForm') commentForm: NgForm;
    @Input() selectedAnnotationId;
    @Output() commentSubmitted: EventEmitter<string> = new EventEmitter<string>();

    model = new Comment(null, null, null, null, null, null, null);

    constructor(private annotationStoreService: AnnotationStoreService,
                private renderer2: Renderer2) {
    }

    setFocus() {
        const commentTextBox = this.renderer2.selectRootElement('#commentContent');
        commentTextBox.focus();
    }

    ngOnChanges() {
        this.model = new Comment(
            null,
            this.selectedAnnotationId,
            null,
            null,
            null,
            new Date(),
            this.commentForm.value.comment);
    }

    onSubmit() {
        this.annotationStoreService.addComment(this.model);

        this.commentSubmitted.emit(this.model.annotationId);
        this.commentForm.reset();
        this.model = new Comment(
            null, null, null, null, null, null, null);
        this.selectedAnnotationId = null;
    }

    get diagnostic() {
        return JSON.stringify(this.model);
    }
}
