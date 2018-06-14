import { TestBed, inject } from '@angular/core/testing';

import { DMStoreService } from './dm-store.service';

xdescribe('DMStoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DMStoreService]
    });
  });

  it('should be created', inject([DMStoreService], (service: DMStoreService) => {
    expect(service).toBeTruthy();
  }));
});
