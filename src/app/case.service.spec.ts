import { TestBed, inject } from '@angular/core/testing';

import { CaseService } from './case.service';

describe('CaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CaseService]
    });
  });

  it('should be created', inject([CaseService], (service: CaseService) => {
    expect(service).toBeTruthy();
  }));
});
