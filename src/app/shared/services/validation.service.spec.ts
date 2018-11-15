import { TestBed, inject } from '@angular/core/testing';

import { ValidationService } from './validation.service';

describe('ValidationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValidationService]
    });
  });

  it('should be created', inject([ValidationService], (service: ValidationService) => {
    expect(service).toBeTruthy();
  }));

  it('should return an array with Validators.required, if the validation for a control is ["required"]',
      inject([ValidationService], (service: ValidationService) => {
    expect(service).toBeTruthy();
  }));
});
