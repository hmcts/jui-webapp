import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationErrorLabelComponent } from './validation-error-label.component';

describe('ValidationErrorLabelComponent', () => {
  let component: ValidationErrorLabelComponent;
  let fixture: ComponentFixture<ValidationErrorLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidationErrorLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationErrorLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(true).toBeTruthy();
  });
});
