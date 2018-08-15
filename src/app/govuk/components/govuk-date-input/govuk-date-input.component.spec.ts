import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GovukDateInputComponent } from './govuk-date-input.component';

describe('GovukDateInputComponent', () => {
  let component: GovukDateInputComponent;
  let fixture: ComponentFixture<GovukDateInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GovukDateInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GovukDateInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
