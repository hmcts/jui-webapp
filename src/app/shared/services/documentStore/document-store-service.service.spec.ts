import { TestBed, inject } from '@angular/core/testing';

import { DocumentStoreService } from './document-store.service';

describe('DocumentStoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DocumentStoreService]
    });
  });

  it('should be created', inject([DocumentStoreService], (service: DocumentStoreService) => {
    expect(service).toBeTruthy();
  }));
});
