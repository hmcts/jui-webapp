import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GovukErrorSummaryComponent } from './govuk-error-summary.component';

describe('GovukErrorSummaryComponent', () => {
  let component: GovukErrorSummaryComponent;
  let fixture: ComponentFixture<GovukErrorSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GovukErrorSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GovukErrorSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
