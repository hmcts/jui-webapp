import { TestBed, inject } from '@angular/core/testing';

import { CaseFileService } from './case-file.service';

xdescribe('CaseFileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CaseFileService]
    });
  });

  it('should be created', inject([CaseFileService], (service: CaseFileService) => {
    expect(service).toBeTruthy();
  }));
});
