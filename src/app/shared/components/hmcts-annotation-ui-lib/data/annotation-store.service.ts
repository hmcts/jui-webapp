import {Injectable, OnDestroy} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Observable, Subscription, Subject, BehaviorSubject} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {v4 as uuid} from 'uuid';
import {Annotation, Comment, IAnnotation, IAnnotationSet} from './annotation-set.model';
import {PdfService} from './pdf.service';
import {PdfAdapter} from './pdf-adapter';
import {ApiHttpService} from './api-http.service';

declare const PDFAnnotate: any;

@Injectable()
export class AnnotationStoreService implements OnDestroy {

    annotationChangeSubscription: Subscription;
    private commentBtnSubject: Subject<string>;
    private commentFocusSubject: BehaviorSubject<{annotation: Annotation, showButton?: boolean}>;
    private annotationFocusSubject: Subject<Annotation>;
    private contextualToolBarOptions: Subject<{annotation: Annotation, showDelete: boolean}>;

    constructor(private pdfAdapter: PdfAdapter,
                private apiHttpService: ApiHttpService,
                private pdfService: PdfService) {

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
            PDFAnnotate.setStoreAdapter(this.pdfAdapter.getStoreAdapter());
        } else {
            PDFAnnotate.setStoreAdapter(new PDFAnnotate.LocalStoreAdapter());
        }
    }

    handleAnnotationEvent(e) {
        switch (e.type) {
            case 'addAnnotation': {
                this.saveAnnotation(e.annotation, true);
                break;
            }
            case 'addComment': {
                this.saveAnnotation(e.annotation);
                break;
            }
            case 'editComment': {
                this.saveAnnotation(e.annotation);
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
                            return Observable.throw(err.error);
                        }
                        case 404: {
                            const body = {
                                documentId: dmDocumentId,
                                id: uuid()
                            };
                            return this.apiHttpService.createAnnotationSet(baseUrl, body);
                        }
                        case 500: {
                            return Observable.throw(new Error('Internal server error: ' + err));
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
                response => console.log(response),
                error => console.log(error)
            );
        });

        toRemoveAnnotations.forEach((annotation: Annotation) => {
            this.apiHttpService.deleteAnnotation(annotation).subscribe(
                response => console.log(response),
                error => console.log(error)
            );
        });

        loadedData.annotations.splice(0, loadedData.annotations.length);
        loadedData.annotations.concat(toKeepAnnotations);
        this.pdfAdapter.annotationSet = loadedData;
    }

    saveAnnotation(annotation: Annotation, displayToolbar?: boolean) {
        this.apiHttpService.saveAnnotation(annotation).subscribe(
            response => {
                console.log(response);
                // if (displayToolbar) {
                //     this.setToolBarUpdate(annotation);
                // }
            },
            error => console.log(error)
        );
    }

    deleteAnnotation(annotation) {
        this.apiHttpService.deleteAnnotation(annotation).subscribe(
            response => {
                console.log(response);
            },
            error => console.log(error)
        );
    }

    clearAnnotations() {
        if (confirm('Are you sure you want to clear annotations?')) {
            this.pdfAdapter.annotations = [];
            this.pdfService.render();
            this.saveData();
        }
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
        PDFAnnotate.getStoreAdapter()
            .getAnnotation(this.pdfService.getRenderOptions().documentId, annotationId)
            .then(callback);
    }

    getComments(annotationId: string, callback) {
        PDFAnnotate.getStoreAdapter()
            .getComments(this.pdfService.getRenderOptions().documentId, annotationId)
            .then(callback);
    }

    addComment(comment: Comment) {
        PDFAnnotate.getStoreAdapter()
            .addComment(this.pdfService.getRenderOptions().documentId, comment.annotationId, comment.content)
            .then();
    }

    getAnnotations(pageNumber: number, callback) {
        PDFAnnotate.getStoreAdapter()
            .getAnnotations(this.pdfService.getRenderOptions().documentId, pageNumber)
            .then(callback);
    }

    deleteComment(commentId: string) {
        PDFAnnotate.getStoreAdapter()
            .deleteComment(this.pdfService.getRenderOptions().documentId, commentId)
            .then();
    }

    deleteAnnotationById(annotationId: string) {
        PDFAnnotate.getStoreAdapter()
        .deleteAnnotation(this.pdfService.getRenderOptions().documentId, annotationId)
        .then(() => {
            this.pdfService.render();
        });
    }

    ngOnDestroy() {
        if (this.annotationChangeSubscription) {
            this.annotationChangeSubscription.unsubscribe();
        }
    }
}
