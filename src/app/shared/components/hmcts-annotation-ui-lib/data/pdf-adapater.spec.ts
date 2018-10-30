import { TestBed, inject } from '@angular/core/testing';
import { Utils } from './utils';
import { PdfAdapter } from './pdf-adapter';
import { AnnotationSet } from './annotation-set.model';

class MockUtils {

}

fdescribe('PdfAdapter', () => {
    const mockUtils = new MockUtils();

    beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
              PdfAdapter,
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
        const mockAnnotationSet = new AnnotationSet(
            '9ad31e66-ec05-476d-9a38-09973d51c0c3',
            '111111',
            null,
            new Date(),
            '111111', null,
            new Date(),
            '',
            []
        );

        it('should set annotationSet', inject([PdfAdapter], (service: PdfAdapter) => {
            service.setStoreData(mockAnnotationSet);
        }));
    });
});
