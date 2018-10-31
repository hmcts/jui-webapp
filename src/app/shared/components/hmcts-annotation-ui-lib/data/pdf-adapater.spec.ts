import { TestBed, inject } from '@angular/core/testing';
import { Utils } from './utils';
import { PdfAdapter } from './pdf-adapter';
import { AnnotationSet, Annotation, Comment } from './annotation-set.model';

class MockUtils {}
declare global { interface Window { PDFAnnotate: any; } }
class MockPDFAnnotate {
    setStoreAdapater(storeAdapter: any) {}

    StoreAdapter() {

    }
  }

describe('PdfAdapter', () => {
    const windowMock: Window = <any>{
        getSelection() {
            return null;
        }
    };
    const mockPDFAnnotate = new MockPDFAnnotate();
    window.PDFAnnotate = mockPDFAnnotate;

    const mockUtils = new MockUtils();
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
        1, 'red', [mockComment]
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

    beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
              PdfAdapter,
              { provide: 'windowObject', useFactory: () => windowMock},
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

    describe('getAnnotationChangeSubject', () => {
        it('should return the annotationChangeSubject', inject([PdfAdapter], (service: PdfAdapter) => {
            expect(service.getAnnotationChangeSubject()).toBeTruthy();
        }));
    });

    describe('setStoreData', () => {

        it('should set annotationSet', inject([PdfAdapter], (service: PdfAdapter) => {
            service.setStoreData(mockAnnotationSet);
            expect(service['annotationSet']).toBe(mockAnnotationSet);
        }));

        it('should set annotations', inject([PdfAdapter], (service: PdfAdapter) => {
            service.setStoreData(mockAnnotationSet);
            expect(service['annotations']).toContain(mockAnnotation);
        }));

        it('should set commentData to a list of annotation comments', inject([PdfAdapter], (service: PdfAdapter) => {
            service.setStoreData(mockAnnotationSet);
            expect(service['commentData'].length).toBe(1);
            expect(service['commentData']).toContain(mockComment);
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
            spyOn(windowMock, 'getSelection').and.callFake(() => {
                return {
                    removeAllRanges() {
                        return true;
                    }
                };
            });
            service.clearSelection();
            expect(windowMock.getSelection).toHaveBeenCalled();
        }));

        it('should remove window selections', inject([PdfAdapter], (service: PdfAdapter) => {
            spyOn(windowMock, 'getSelection').and.callFake(() => {
                return {
                    // TODO make this cover sel.empty
                    empty: true,
                    removeAllRanges() {
                        return false;
                    }
                };
            });
            service.clearSelection();
            expect(windowMock.getSelection).toHaveBeenCalled();
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

    // describe('getStoreAdapter', () => {
    //     describe('getAnnotations', () => {
    //         it('should return a promise with page annotations', inject([PdfAdapter], (service: PdfAdapter) => {
    //             service.getStoreAdapter();
    //         }));
    //     });
    // });
});
