import { v4 as uuid } from 'uuid';
import { AnnotationSet, Annotation, Comment, Rectangle } from './annotation-set.model';
import { Utils } from './utils';
import { Injectable } from '@angular/core';

declare const PDFAnnotate: any;

@Injectable()
export class PdfAdapter {
    annotationSet: AnnotationSet;
    annotations: Annotation[];
    commentData: Comment[];
    annotationSetId: string;

    constructor(private utils: Utils) {
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
                .filter(storeComment => storeComment.id == comment.id)
                .map(storeComment => storeComment.content = comment.content);
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
            return new Promise(function(resolve, reject) {
                resolve(this.data.comments);
            });
        };

        const addAnnotation = (documentId, pageNumber, annotation) => {
            return new Promise((resolve, reject) => {
                annotation.id = uuid();
                annotation.page = pageNumber;
                annotation.annotationSetId = this.annotationSetId;

                let rectangles = [];
                this.utils.generateRectanglePerLine(annotation.rectangles, rectangles);

                rectangles.forEach(
                    (rectangle: Rectangle) => {
                      rectangle.id = uuid();
                    });

                annotation.rectangles = rectangles;
                
                let annotations = this._getAnnotations(documentId);
                annotations.push(annotation);
      
                resolve(annotation);
            });
        };

        const deleteAnnotation = (documentId, annotationId) => {
            return new Promise((resolve, reject) => {
                this.annotations = this.remove(this.annotations, annotationId);
                resolve(this.annotations);
            });
        };

        const addComment = (documentId, annotationId, content) => {
            return new Promise((resolve, reject) => {
                // let comment: Comment;
                let comment = {
                    id: uuid(),
                    annotationId: annotationId,
                    content: content,
                    createdDate: new Date(),
                    createdBy: null,
                  };

                this.updateComments(documentId, comment);
                resolve(comment); 
            });
        };

        const deleteComment = (documentId, commentId) => {
            return new Promise((resolve, reject) => {
                this.commentData = this.remove(this.commentData, commentId);
                resolve(this.annotations);
            });
        };

        // Unused
        const editAnnotation = (documentId, pageNumber, annotation) => {
            return new Promise(function(resolve, reject) {
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
        })
    }

    remove(array, element) {
        return array.filter(e => e.id !== element);
    }
}