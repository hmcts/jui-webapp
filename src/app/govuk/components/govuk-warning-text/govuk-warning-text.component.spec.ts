import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GovukWarningTextComponent } from './govuk-warning-text.component';

describe('GovukWarningTextComponent', () => {
  let component: GovukWarningTextComponent;
  let fixture: ComponentFixture<GovukWarningTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GovukWarningTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GovukWarningTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
