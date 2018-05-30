import { TestBed, inject } from '@angular/core/testing';

import { CasesService } from './cases.service';

describe('CasesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CasesService]
    });
  });

  it('should be created', inject([CasesService], (service: CasesService) => {
    expect(service).toBeTruthy();
  }));
});
