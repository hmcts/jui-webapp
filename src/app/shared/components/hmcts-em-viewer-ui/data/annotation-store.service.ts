import {Injectable, OnDestroy} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Observable, Subscription, Subject, BehaviorSubject, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {v4 as uuid} from 'uuid';
import {Annotation, Comment, IAnnotation, IAnnotationSet} from './annotation-set.model';
import {PdfService} from './pdf.service';
import {PdfAdapter} from './pdf-adapter';
import {ApiHttpService} from './api-http.service';
import { PdfAnnotateWrapper } from './js-wrapper/pdf-annotate-wrapper';
import { EmLoggerService } from '../logging/em-logger.service';
import { PdfRenderService } from './pdf-render.service';

@Injectable()
export class AnnotationStoreService implements OnDestroy {

    annotationChangeSubscription: Subscription;
    private commentBtnSubject: Subject<string>;
    private commentFocusSubject: BehaviorSubject<{annotation: Annotation, showButton?: boolean}>;
    private annotationFocusSubject: Subject<Annotation>;
    private contextualToolBarOptions: Subject<{annotation: Annotation, showDelete: boolean}>;

    constructor(private log: EmLoggerService,
                private pdfAdapter: PdfAdapter,
                private apiHttpService: ApiHttpService,
                private pdfService: PdfService,
                private pdfAnnotateWrapper: PdfAnnotateWrapper,
                private pdfRenderService: PdfRenderService) {

        log.setClass('AnnotationStoreService');
        this.commentBtnSubject = new Subject();
        this.commentFocusSubject = new BehaviorSubject(
            {annotation: new Annotation(null, null, null, null, null, null, null, null, null, null, null, null)});

        this.contextualToolBarOptions = new Subject();

        this.annotationFocusSubject = new Subject();

        this.annotationChangeSubscription = this.pdfAdapter.getAnnotationChangeSubject().subscribe((e) => this.handleAnnotationEvent(e));
    }

    getAnnotationFocusSubject(): Subject<Annotation> {
        return this.annotationFocusSubject;
    }

    setAnnotationFocusSubject(annotation: Annotation) {
        this.annotationFocusSubject.next(annotation);
    }

    getCommentFocusSubject(): BehaviorSubject<{annotation: Annotation, showButton?: boolean}> {
        return this.commentFocusSubject;
    }

    setCommentFocusSubject(annotation: Annotation, showButton?: boolean) {
        this.commentFocusSubject.next({annotation, showButton});
    }

    getCommentBtnSubject(): Subject<string> {
        return this.commentBtnSubject;
    }

    setCommentBtnSubject(commentId: string) {
        this.commentBtnSubject.next(commentId);
    }

    setToolBarUpdate(annotation: Annotation, showDelete?: boolean) {
        const contextualOptions = {
            annotation,
            showDelete
        };

        this.contextualToolBarOptions.next(contextualOptions);
    }

    getToolbarUpdate(): Subject<{annotation: Annotation, showDelete: boolean}> {
        return this.contextualToolBarOptions;
    }

    preLoad(annotationData: IAnnotationSet) {
        if (annotationData != null) {
            this.pdfAdapter.setStoreData(annotationData);
            this.pdfAnnotateWrapper.setStoreAdapter(this.pdfAdapter.getStoreAdapter());
            this.pdfService.setHighlightTool();
        } else {
            this.pdfService.setCursorTool();
            this.pdfAnnotateWrapper.setStoreAdapter();
        }
    }

    handleAnnotationEvent(e) {
        switch (e.type) {
            case 'addAnnotation': {
                this.saveAnnotation(e.annotation);
                break;
            }
            case 'addComment': {
                this.saveAnnotation(e.annotation, e.type);
                break;
            }
            case 'editComment': {
                this.saveAnnotation(e.annotation, e.type);
                break;
            }
            case 'deleteComment': {
                this.saveAnnotation(e.annotation);
                break;
            }
            case 'editAnnotation': {
                this.saveAnnotation(e.annotation);
                break;
            }
            case 'deleteAnnotation': {
                this.deleteAnnotation(e.annotation);
                break;
            }
        }
    }

    fetchData(baseUrl, dmDocumentId): Observable<HttpResponse<IAnnotationSet>> {
        return this.apiHttpService.fetch(baseUrl, dmDocumentId).pipe(
            catchError((err) => {
                if (err instanceof HttpErrorResponse) {
                    switch (err.status) {
                        case 400: {
                            this.log.error('Bad request: ' + err.error);
                            return throwError(err.error);
                        }
                        case 404: {
                            const body = {
                                documentId: dmDocumentId,
                                id: uuid()
                            };
                            this.log.info('Creating new annotation set for document id:' + dmDocumentId);
                            return this.apiHttpService.createAnnotationSet(baseUrl, body);
                        }
                        case 500: {
                            this.log.error('Internal server error: ' + err);
                            return throwError('Internal server error: ' + err);
                        }
                    }
                }
            }));
    }

    saveData() {
        let loadedData: IAnnotationSet;
        let toKeepAnnotations: IAnnotation[];
        let toRemoveAnnotations: IAnnotation[];

        loadedData = this.pdfAdapter.annotationSet;

        toKeepAnnotations = this.pdfAdapter.annotations;

        toRemoveAnnotations = this.pdfAdapter.annotationSet.annotations
            .filter((annotation: IAnnotation) => !this.pdfAdapter.annotations.map(a => a.id).includes(annotation.id));

        toKeepAnnotations.forEach((annotation: Annotation) => {
            this.apiHttpService.saveAnnotation(annotation).subscribe(
                response => this.log.info('Successfully saved annotation:' + response),
                error => this.log.error('There has been a problem saving the annotation:' + annotation.id + '-' + error)
            );
        });

        toRemoveAnnotations.forEach((annotation: Annotation) => {
            this.apiHttpService.deleteAnnotation(annotation).subscribe(
                response => this.log.info('Successfully deleted annotation:' + response),
                error => this.log.error('There has been a problem deleting annotation:' + annotation.id + '-' + error)
            );
        });

        loadedData.annotations.splice(0, loadedData.annotations.length);
        loadedData.annotations.concat(toKeepAnnotations);
        this.pdfAdapter.annotationSet = loadedData;
    }

    saveAnnotation(annotation: Annotation, type?: string) {
        this.apiHttpService.saveAnnotation(annotation).subscribe(
            response => {
                if (type === 'addComment' || type === 'editComment') {
                    this.pdfAdapter.annotationSet.annotations[this.pdfAdapter.annotationSet.annotations
                        .findIndex(x => x.id === annotation.id)] = response.body;
                }
                this.log.info('Successfully saved annotation:' + response);
            },
            error => this.log.error('There has been a problem saving the annotation:' + annotation.id + '-' + error)
        );
    }

    deleteAnnotation(annotation) {
        this.apiHttpService.deleteAnnotation(annotation).subscribe(
            response => {
                this.log.info('Successfully deleted annotation:' + annotation.id + '-' + response);
            },
            error => this.log.error('There has been a problem deleting annotation:' + annotation.id + '-' + error)
        );
    }

    editComment(comment: Comment) {
        this.pdfAdapter.editComment(comment);
    }

    getAnnotationById(annotationId: string): Promise<Annotation> {
        return new Promise<Annotation>((resolve) => {
            this.getAnnotation(
                annotationId,
                annotation => {
                    resolve(annotation);
                });
        });
    }

    getAnnotationsForPage(pageNumber): Promise<Annotation[]> {
        return new Promise<Annotation[]>((resolve) => {
            this.getAnnotations(
                pageNumber,
                pageData => {
                    resolve(pageData);
                });
        });
    }

    getCommentsForAnnotation(annotationId): Promise<Comment[]> {
        return new Promise<Comment[]>((resolve) => {
            this.getComments(
                annotationId,
                comments => {
                    resolve(comments);
                });
        });
    }

    getAnnotation(annotationId: string, callback) {
        this.pdfAnnotateWrapper.getStoreAdapter()
            .getAnnotation(this.pdfRenderService.getRenderOptions().documentId, annotationId)
            .then(callback);
    }

    getComments(annotationId: string, callback) {
        this.pdfAnnotateWrapper.getStoreAdapter()
            .getComments(this.pdfRenderService.getRenderOptions().documentId, annotationId)
            .then(callback);
    }

    addComment(comment: Comment) {
        this.pdfAnnotateWrapper.getStoreAdapter()
            .addComment(this.pdfRenderService.getRenderOptions().documentId, comment.annotationId, comment.content)
            .then();
    }

    getAnnotations(pageNumber: number, callback) {
        this.pdfAnnotateWrapper.getStoreAdapter()
            .getAnnotations(this.pdfRenderService.getRenderOptions().documentId, pageNumber)
            .then(callback);
    }

    deleteComment(commentId: string) {
        this.pdfAnnotateWrapper.getStoreAdapter()
            .deleteComment(this.pdfRenderService.getRenderOptions().documentId, commentId)
            .then();
    }

    deleteAnnotationById(annotationId: string) {
        this.pdfAnnotateWrapper.getStoreAdapter()
        .deleteAnnotation(this.pdfRenderService.getRenderOptions().documentId, annotationId)
        .then(() => {
            this.pdfRenderService.render();
        });
    }

    ngOnDestroy() {
        if (this.annotationChangeSubscription) {
            this.annotationChangeSubscription.unsubscribe();
        }
    }
}
