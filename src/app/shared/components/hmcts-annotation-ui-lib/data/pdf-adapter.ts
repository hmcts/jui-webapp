import {v4 as uuid} from 'uuid';
import {Annotation, AnnotationSet, Comment, Rectangle} from './annotation-set.model';
import {Utils} from './utils';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

declare const PDFAnnotate: any;

@Injectable()
export class PdfAdapter {
    annotationSet: AnnotationSet;
    annotations: Annotation[];
    commentData: Comment[];
    annotationSetId: string;
    annotationChangeSubject: Subject<{ type: String, annotation: Annotation }>;

    constructor(private utils: Utils) {
        this.annotationChangeSubject = new Subject<{ type: String, annotation: Annotation }>();
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
                annotation.id = uuid();
                annotation.page = pageNumber;
                annotation.annotationSetId = this.annotationSetId;

                const rectangles = [];
                this.utils.generateRectanglePerLine(annotation.rectangles, rectangles);

                rectangles.forEach(
                    (rectangle: Rectangle) => {
                        rectangle.id = uuid();
                    });

                annotation.rectangles = rectangles;

                const annotations = this._getAnnotations(documentId);
                annotations.push(annotation);
                this.annotationChangeSubject.next({'type': 'addAnnotation', 'annotation': annotation});
                resolve(annotation);
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
                // let comment: Comment;
                const comment = new Comment(
                    uuid(),
                    annotationId,
                    null,
                    new Date(),
                    null,
                    null,
                    content
                );
                this.updateComments(documentId, comment);
                const annotation: Annotation = this.findById(this.annotations, annotationId);
                annotation.comments.push(comment);
                this.annotationChangeSubject.next({'type': 'addComment', 'annotation': annotation});
                resolve(comment);
            });
        };

        const deleteComment = (documentId, commentId) => {
            return new Promise((resolve, reject) => {
                const comment = this.findById(this.commentData, commentId);
                this.remove(this.commentData, commentId);
                const annotation: Annotation = this.findById(this.annotations, comment.annotationId);
                this.remove(annotation.comments, commentId);
                this.annotationChangeSubject.next({'type': 'deleteComment', 'annotation': annotation});
                resolve(this.annotations);
            });
        };

        // Unused
        const editAnnotation = (documentId, pageNumber, annotation) => {
            return new Promise(function (resolve, reject) {
                this.annotationChangeSubject.next({'type': 'editAnnotation', 'annotation': annotation});
                resolve(this.data.comments);
            });
        };

        return new PDFAnnotate.StoreAdapter({
            getAnnotations,
            getComments,
            getAnnotation,
            addAnnotation,
            editAnnotation,
            deleteAnnotation,
            addComment,
            deleteComment
        });
    }

    findById(array, id) {
        return array.find(e => e.id === id);
    }

    remove(array, id) {
        return array.splice(array.findIndex(e => e.id === id), 1);
    }
}
