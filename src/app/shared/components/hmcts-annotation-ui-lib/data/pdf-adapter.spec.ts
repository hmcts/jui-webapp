import { TestBed, inject } from '@angular/core/testing';
import { Utils } from './utils';
import { PdfAdapter } from './pdf-adapter';
import { AnnotationSet, Annotation, Comment, Rectangle } from './annotation-set.model';
import { WINDOW } from '@ng-toolkit/universal';

class MockUtils {
    generateRectanglePerLine() {}
}

class MockWindow {
    getSelection() {
        return null;
    }
}

describe('PdfAdapter', () => {
    const mockUtils = new MockUtils();
    const mockRectangle = new Rectangle('63225ccd-61fe-4aa7-8c5f-cf9bc31cc424',
        '4bcc2edf-487d-4ee0-a5b0-a3cdfe93bf1a',
        '123141', null, new Date(), null, null, null,
        9.6, 60,
        50, 87);
    const mockComment = new Comment(
        'cfe6bdad-8fc5-4240-adfc-d583bdaee47a',
        '22a3bde9-18d6-46b2-982b-36e0a631ea4b',
        '111111', null, new Date(), null, null, null,
        'comment content');
    const mockAnnotation = new Annotation(
        '22a3bde9-18d6-46b2-982b-36e0a631ea4b',
        '9ad31e66-ec05-476d-9a38-09973d51c0c3',
        '111111', new Date(), null,
        '111111', null, new Date(), 'docId',
        1, 'red', [mockComment], [mockRectangle], 'highlight'
    );
    const mockAnnotationSet = new AnnotationSet(
        '9ad31e66-ec05-476d-9a38-09973d51c0c3',
        '111111',
        null,
        new Date(),
        '111111', null,
        new Date(),
        '',
        [mockAnnotation]
    );
    const mockWindow = new MockWindow();

    beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
              PdfAdapter,
              { provide: WINDOW, useFactory: () => mockWindow},
              { provide: Utils, useFactory: () => mockUtils}
            ]
        });
      });

    describe('constructor', () => {
        it('should be created', inject([PdfAdapter], (service: PdfAdapter) => {
            expect(service).toBeTruthy();
        }));

        it('should instantiate annotationChangeSubject', inject([PdfAdapter], (service: PdfAdapter) => {
            expect(service['annotationChangeSubject']).toBeTruthy();
        }));
    });

    describe('setStoreData', () => {
        it('should set annotationSet', inject([PdfAdapter], (service: PdfAdapter) => {
            service.setStoreData(mockAnnotationSet);
        }));

        it('should set commentData to a list of annotation comments', inject([PdfAdapter], (service: PdfAdapter) => {
            service.setStoreData(mockAnnotationSet);
            expect(service['commentData'].length).toBe(1);
        }));

        it('should set the annotationSetId', inject([PdfAdapter], (service: PdfAdapter) => {
            service.setStoreData(mockAnnotationSet);
            expect(service['annotationSetId']).toBe(mockAnnotationSet.id);
        }));
    });

    describe('editComment', () => {
        it('should emit an annotationChangeSubject value,', inject([PdfAdapter], (service: PdfAdapter) => {
            service['annotations'] = [mockAnnotation];
            service['annotationChangeSubject'].subscribe((changeSubject) => {
                expect(changeSubject.type).toBe('editComment');
                expect(changeSubject.annotation).toBe(mockAnnotation);
            });
            service.editComment(mockComment);
        }));

        it('should only update the same comment', inject([PdfAdapter], (service: PdfAdapter) => {
            const mockComment2 = new Comment(
                '3d7eee63-0439-40b9-b166-5f771d44ea32',
                '22a3bde9-18d6-46b2-982b-36e0a631ea4b',
                '111111', null, new Date(), null, null, null,
                'comment content');
            mockAnnotation.comments.push(mockComment2);
            service['annotations'] = [mockAnnotation];
            service['annotationChangeSubject'].subscribe((changeSubject) => {
                expect().nothing();
            });
            service.editComment(mockComment2);
        }));
    });

    describe('updateComments', () => {
        it('should add the comment to commentData', inject([PdfAdapter], (service: PdfAdapter) => {
            const mockComment2 = new Comment(
                '3d7eee63-0439-40b9-b166-5f771d44ea32',
                '22a3bde9-18d6-46b2-982b-36e0a631ea4b',
                '111111', null, new Date(), null, null, null,
                'comment content');
            service.setStoreData(mockAnnotationSet);
            service.updateComments('docId', mockComment2);
            expect(service['commentData']).toContain(mockComment2);
        }));
    });

    describe('_getAnnotations', () => {
        it('should return a list of annotations', inject([PdfAdapter], (service: PdfAdapter) => {
            service['annotations'] = [mockAnnotation];
            const annotations = service._getAnnotations('docId');
            expect(annotations).toContain(mockAnnotation);
        }));
    });

    describe('_getComments', () => {
        it('should return a list of comments', inject([PdfAdapter], (service: PdfAdapter) => {
            service['commentData'] = [mockComment];
            const comments = service._getComments('docId');
            expect(comments).toContain(mockComment);
        }));
    });

    describe('clearSelection', () => {

        it('should remove window selections', inject([PdfAdapter], (service: PdfAdapter) => {
            spyOn(mockWindow, 'getSelection').and.callFake(() => {
                return {
                    removeAllRanges() {
                        return true;
                    }
                };
            });
            service.clearSelection();
            expect(mockWindow.getSelection).toHaveBeenCalled();
        }));

        it('should remove window selections', inject([PdfAdapter], (service: PdfAdapter) => {
            spyOn(mockWindow, 'getSelection').and.callFake(() => {
                return {
                    // TODO make this cover sel.empty
                    empty: true,
                    removeAllRanges() {
                        return false;
                    }
                };
            });
            service.clearSelection();
            expect(mockWindow.getSelection).toHaveBeenCalled();
        }));
    });

    describe('isDraftComment', () => {
        it('should return true if content is empty', inject([PdfAdapter], (service: PdfAdapter) => {
            const mockComment2 = new Comment(
                '3d7eee63-0439-40b9-b166-5f771d44ea32',
                '22a3bde9-18d6-46b2-982b-36e0a631ea4b',
                '111111', null, new Date(), null, null, null,
                '');
            expect(service.isDraftComment(mockComment2)).toBeTruthy();
        }));

        it('should return true if content is null', inject([PdfAdapter], (service: PdfAdapter) => {
            const mockComment2 = new Comment(
                '3d7eee63-0439-40b9-b166-5f771d44ea32',
                '22a3bde9-18d6-46b2-982b-36e0a631ea4b',
                '111111', null, new Date(), null, null, null,
                null);
            expect(service.isDraftComment(mockComment2)).toBeTruthy();
        }));

        it('should return false if content exists', inject([PdfAdapter], (service: PdfAdapter) => {
            const mockComment2 = new Comment(
                '3d7eee63-0439-40b9-b166-5f771d44ea32',
                '22a3bde9-18d6-46b2-982b-36e0a631ea4b',
                '111111', null, new Date(), null, null, null,
                'some content');
            expect(service.isDraftComment(mockComment2)).toBeFalsy();
        }));
    });

    describe('findById', () => {
        it('should find annotation by its id and return it', inject([PdfAdapter], (service: PdfAdapter) => {
            service['annotations'] = [mockAnnotation];
            expect(service.findById(service['annotations'], mockAnnotation.id))
                .toBe(mockAnnotation);
        }));
    });

    describe('getStoreAdapter', () => {
        describe('getAnnotations', () => {
            it('should return a promise with page annotations', inject([PdfAdapter], (service: PdfAdapter) => {
                service['annotations'] = [mockAnnotation];
                const promise = service.getStoreAdapter().getAnnotations('docId', 1);

                promise.then((annotationOptions: {documentId: string, pageNumber: number, annotations: Annotation[]}) => {
                    expect(annotationOptions.documentId).toBe('docId');
                    expect(annotationOptions.pageNumber).toBe(1);
                    expect(annotationOptions.annotations).toContain(mockAnnotation);
                });
            }));

            it('should return a promise with only current page annotations', inject([PdfAdapter], (service: PdfAdapter) => {
                service['annotations'] = [mockAnnotation];
                const promise = service.getStoreAdapter().getAnnotations('docId', 2);

                promise.then((annotationOptions: {documentId: string, pageNumber: number, annotations: Annotation[]}) => {
                    expect(annotationOptions.documentId).toBe('docId');
                    expect(annotationOptions.pageNumber).toBe(2);
                    expect(annotationOptions.annotations).not.toContain(mockAnnotation);
                });
            }));
        });

        describe('getComments', () => {
            it('should return a promise with annotation comments', inject([PdfAdapter], (service: PdfAdapter) => {
                service['commentData'] = [mockComment];
                const promise = service.getStoreAdapter().getComments('docId', mockComment.annotationId);

                promise.then((comments) => {
                    expect(comments).toContain(mockComment);
                });
            }));

            it('should return only comments associated with the annotation', inject([PdfAdapter], (service: PdfAdapter) => {
                service['commentData'] = [mockComment];
                const promise = service.getStoreAdapter().getComments('docId', 'invalidAnnotationId');

                promise.then((comments) => {
                    expect(comments).not.toContain(mockComment);
                });
            }));
        });

        describe('getAnnotation', () => {
            it('should return a promise with the annotation', inject([PdfAdapter], (service: PdfAdapter) => {
                service['annotations'] = [mockAnnotation];
                const promise = service.getStoreAdapter().getAnnotation('docId', mockAnnotation.id);

                promise.then((annotation) => {
                    expect(annotation).toBe(mockAnnotation);
                });
            }));

            it('should return only the annotation with given id', inject([PdfAdapter], (service: PdfAdapter) => {
                service['annotations'] = [mockAnnotation];
                const promise = service.getStoreAdapter().getAnnotation('docId', 'invalidAnnotationId');

                promise.then((annotation) => {
                    expect(annotation).not.toBe(mockAnnotation);
                });
            }));
        });

        describe('addAnnotation', () => {
            it('should create a new annotation with the similar properties', inject([PdfAdapter], (service: PdfAdapter) => {
                mockAnnotation.id = null;
                service['annotationSetId'] = mockAnnotation.annotationSetId;
                spyOn(mockUtils, 'generateRectanglePerLine').and.stub();
                const promise = service.getStoreAdapter().addAnnotation('docId', 1, mockAnnotation);

                promise.then((persistAnnotation: Annotation) => {
                    expect(persistAnnotation.id).toBeTruthy();
                    expect(persistAnnotation.page).toBe(1);
                    expect(persistAnnotation.type).toBe(mockAnnotation.type);
                    expect(persistAnnotation.annotationSetId).toBe(mockAnnotation.annotationSetId);
                });
            }));

            it('should call generateRectanglePerLine and updateChangeSubject', inject([PdfAdapter], (service: PdfAdapter) => {
                service['annotations'] = [];
                spyOn(mockUtils, 'generateRectanglePerLine').and.stub();
                service.getAnnotationChangeSubject().subscribe(annotationChangeSubject => {
                    expect(annotationChangeSubject.type).toBe('addAnnotation');
                });

                const promise = service.getStoreAdapter().addAnnotation('docId', 1, mockAnnotation);

                promise.then((persistAnnotation: Annotation) => {
                    expect(mockUtils.generateRectanglePerLine).toHaveBeenCalled();
                    expect(service['annotations']).toContain(persistAnnotation);
                });
            }));
        });

        describe('deleteAnnotation', () => {
            it('should remove the annotation from the annotations', inject([PdfAdapter], (service: PdfAdapter) => {
                service['annotations'] = [mockAnnotation];

                service.getAnnotationChangeSubject().subscribe(annotationChangeSubject => {
                    expect(annotationChangeSubject.type).toBe('deleteAnnotation');
                });

                const promise = service.getStoreAdapter().deleteAnnotation('docId', mockAnnotation.id);

                promise.then((annotations: Annotation) => {
                    expect(annotations).not.toContain(mockAnnotation);
                });
            }));
        });

        describe('addComment', () => {
            it('should add the comment into commentData and call addComment', inject([PdfAdapter], (service: PdfAdapter) => {
                mockAnnotation.comments = [];
                service['annotations'] = [mockAnnotation];
                service['commentData'] = [];

                service.getAnnotationChangeSubject().subscribe(annotationChangeSubject => {
                    expect(annotationChangeSubject.type).toBe('addComment');
                });

                const promise = service.getStoreAdapter()
                    .addComment('docId', mockAnnotation.id, mockComment);

                promise.then((comment: Comment) => {
                    expect(service['commentData']).toContain(comment);
                    expect(comment.id).toBeTruthy();
                    expect(comment.createdDate).toBeTruthy();
                    expect(mockAnnotation.comments).toContain(comment);
                });
            }));

            it('should not call annotationChangeSubject if isDraft', inject([PdfAdapter], (service: PdfAdapter) => {
                mockComment.content = '';
                service['annotations'] = [mockAnnotation];
                service['commentData'] = [];

                service.getAnnotationChangeSubject().subscribe(annotationChangeSubject => {
                    expect().nothing();
                });

                const promise = service.getStoreAdapter()
                    .addComment('docId', mockAnnotation.id, mockComment);

                promise.then((comment: Comment) => {
                    expect(service['commentData']).toContain(comment);
                });
            }));
        });

        describe('deleteComment', () => {
            it('should remove the comment from commentData and call deleteComment', inject([PdfAdapter], (service: PdfAdapter) => {
                mockComment.annotationId = mockAnnotation.id;
                mockAnnotation.comments = [mockComment];
                service['annotations'] = [mockAnnotation];
                service['commentData'] = [mockComment];

                service.getAnnotationChangeSubject().subscribe(annotationChangeSubject => {
                    expect(annotationChangeSubject.type).toBe('deleteComment');
                });
                const promise = service.getStoreAdapter()
                    .deleteComment('docId', mockComment.id);

                promise.then((comment: Comment) => {
                    expect(service['commentData']).not.toContain(comment);
                    expect(mockAnnotation.comments).not.toContain(comment);
                });
            }));

            it('should not call annotationChangeSubject if isDraft', inject([PdfAdapter], (service: PdfAdapter) => {
                mockComment.content = '';
                mockComment.annotationId = mockAnnotation.id;
                mockAnnotation.comments = [mockComment];
                service['annotations'] = [mockAnnotation];
                service['commentData'] = [mockComment];

                service.getAnnotationChangeSubject().subscribe(annotationChangeSubject => {
                    expect().nothing();
                });
                const promise = service.getStoreAdapter()
                    .deleteComment('docId', mockComment.id);

                promise.then((comment: Comment) => {
                    expect(service['commentData']).not.toContain(comment);
                    expect(mockAnnotation.comments).not.toContain(comment);
                });
            }));
        });

        describe('editAnnotation', () => {
            it('should update annotationChangeSubject', inject([PdfAdapter], (service: PdfAdapter) => {
                service.getAnnotationChangeSubject().subscribe(annotationChangeSubject => {
                    expect(annotationChangeSubject.type).toBe('editAnnotation');
                    expect(annotationChangeSubject.annotation).toBe(mockAnnotation);
                });
                service.getStoreAdapter()
                    .editAnnotation('docId', 1, mockAnnotation);
            }));
        });
    });
});
