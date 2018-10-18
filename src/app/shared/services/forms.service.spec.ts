import { TestBed, inject } from '@angular/core/testing';

import { FormsService } from './forms.service';

describe('FormsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormsService]
    });
  });

  it('should be created', inject([FormsService], (service: FormsService) => {
    expect(service).toBeTruthy();
  }));
});
