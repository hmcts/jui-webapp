import { TestBed, inject } from '@angular/core/testing';

import { AnnotationStoreService } from './annotation-store.service';

describe('AnnotationStoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnnotationStoreService]
    });
  });

  it('should be created', inject([AnnotationStoreService], (service: AnnotationStoreService) => {
    expect(service).toBeTruthy();
  }));
});
