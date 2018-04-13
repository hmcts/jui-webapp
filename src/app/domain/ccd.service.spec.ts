import { TestBed, inject } from '@angular/core/testing';

import { CcdService } from './ccd.service';

describe('CcdService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CcdService]
    });
  });

  it('should be created', inject([CcdService], (service: CcdService) => {
    expect(service).toBeTruthy();
  }));
});
