import {v4 as uuid} from 'uuid';
import {Injectable, Inject} from '@angular/core';
import {Subject} from 'rxjs';
import {Annotation, AnnotationSet, Comment, Rectangle} from './annotation-set.model';
import {Utils} from './utils';
import { WINDOW } from '@ng-toolkit/universal';
import { EmLoggerService } from '../logging/em-logger.service';

@Injectable()
export class PdfAdapter {
    annotationSet: AnnotationSet;
    annotations: Annotation[];
    private commentData: Comment[];
    annotationSetId: string;
    private annotationChangeSubject: Subject<{ type: String, annotation: Annotation }>;

    constructor(private log: EmLoggerService,
                private utils: Utils,
                @Inject(WINDOW) private window: Window) {
        this.annotationChangeSubject = new Subject<{ type: String, annotation: Annotation }>();
        log.setClass('PdfAdapter');
    }

    getAnnotationChangeSubject(): Subject<{ type: String, annotation: Annotation }> {
        return this.annotationChangeSubject;
    }

    setStoreData(annotationSet: AnnotationSet) {
        this.annotationSet = annotationSet;
        this.annotations = annotationSet.annotations;
        this.commentData = [];
        this.annotations.forEach((annotation: Annotation) => {
            annotation.comments.forEach((comment: Comment) => {
                this.commentData.push(comment);
            });
        });
        this.annotationSetId = annotationSet.id;
    }

    editComment(comment: Comment) {
        this.annotations.forEach((annotation: Annotation) => {
            annotation.comments
                .filter(storeComment => storeComment.id === comment.id)
                .map(storeComment => {
                    storeComment.content = comment.content;
                    this.annotationChangeSubject.next({'type': 'editComment', 'annotation': annotation});
                });
        });
    }

    updateComments(documentId, comment) {
        this.commentData.push(comment);
    }

    _getAnnotations(documentId) {
        return this.annotations || [];
    }

    _getComments(documentId) {
        return this.commentData || [];
    }

    clearSelection() {
        const sel = this.window.getSelection();
        if (sel) {
            if (sel.removeAllRanges) {
                sel.removeAllRanges();
            } else if (sel.empty) {
                sel.empty();
            }
        }
    }

    isDraftComment(comment: Comment): boolean {
        return (comment.content === null || comment.content === '');
    }

    getStoreAdapter() {
        const getAnnotations = (documentId, pageNumber) => {
            return new Promise((resolve, reject) => {
                const annotations = this._getAnnotations(documentId).filter(function (i) {
                    return i.page === pageNumber;
                });
                resolve({
                    documentId: documentId,
                    pageNumber: pageNumber,
                    annotations: annotations
                });
            });
        };

        const getComments = (documentId, annotationId) => {
            return new Promise((resolve, reject) => {
                resolve(this._getComments(documentId).filter(function (i) {
                    return i.annotationId === annotationId;
                }));
            });
        };

        const getAnnotation = (documentId, annotationId) => {
            return new Promise((resolve, reject) => {
                const annotation = this._getAnnotations(documentId).find(function (i) {
                    return i.id === annotationId;
                });
                resolve(annotation);
            });
        };

        const addAnnotation = (documentId, pageNumber, annotation) => {
            return new Promise((resolve, reject) => {

                this.clearSelection();
                const persistAnnotation = new Annotation();
                persistAnnotation.id = uuid();
                persistAnnotation.page = pageNumber;
                persistAnnotation.color = annotation.color;
                persistAnnotation.type = annotation.type;
                persistAnnotation.comments = [];
                persistAnnotation.annotationSetId = this.annotationSetId;

                const rectangles = [];
                this.utils.generateRectanglePerLine(annotation.rectangles, rectangles);

                rectangles.forEach(
                    (rectangle: Rectangle) => {
                        rectangle.id = uuid();
                    });

                persistAnnotation.rectangles = rectangles;

                const annotations = this._getAnnotations(documentId);
                annotations.push(persistAnnotation);
                this.annotationChangeSubject.next({'type': 'addAnnotation', 'annotation': persistAnnotation});
                resolve(persistAnnotation);
            });
        };

        const deleteAnnotation = (documentId, annotationId) => {
            return new Promise((resolve, reject) => {
                const annotation = this.findById(this.annotations, annotationId);
                this.remove(this.annotations, annotationId);
                this.annotationChangeSubject.next({'type': 'deleteAnnotation', 'annotation': annotation});
                resolve(this.annotations);
            });
        };

        const addComment = (documentId, annotationId, content) => {
            return new Promise((resolve, reject) => {
                const comment = new Comment(
                    uuid(),
                    annotationId,
                    null,
                    null,
                    new Date(),
                    null,
                    null,
                    null,
                    content
                );
                this.updateComments(documentId, comment);
                const annotation: Annotation = this.findById(this.annotations, annotationId);
                annotation.comments.push(comment);

                if (this.isDraftComment(comment)) {
                    resolve(comment);
                } else {
                    this.annotationChangeSubject.next({'type': 'addComment', 'annotation': annotation});
                    resolve(comment);
                }
            });
        };

        const deleteComment = (documentId, commentId) => {
            return new Promise((resolve, reject) => {
                const comment = this.findById(this.commentData, commentId);
                const annotation: Annotation = this.findById(this.annotations, comment.annotationId);
                this.remove(this.commentData, commentId);
                this.remove(annotation.comments, commentId);

                if (this.isDraftComment(comment)) {
                    resolve(comment);
                } else {
                    this.annotationChangeSubject.next({'type': 'deleteComment', 'annotation': annotation});
                    resolve(this.annotations);
                }
            });
        };

        // Unused
        const editAnnotation = (documentId, pageNumber, annotation) => {
            return new Promise((resolve, reject) => {
                this.annotationChangeSubject.next({'type': 'editAnnotation', 'annotation': annotation});
                resolve(this.commentData);
            });
        };

        return {
            getAnnotations,
            getComments,
            getAnnotation,
            addAnnotation,
            editAnnotation,
            deleteAnnotation,
            addComment,
            deleteComment
        };
    }

    findById(array, id) {
        return array.find(e => e.id === id);
    }

    remove(array, id) {
        return array.splice(array.findIndex(e => e.id === id), 1);
    }
}
