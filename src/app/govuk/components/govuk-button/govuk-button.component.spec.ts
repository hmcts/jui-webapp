import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GovukButtonComponent } from './govuk-button.component';

describe('GovukButtonComponent', () => {
  let component: GovukButtonComponent;
  let fixture: ComponentFixture<GovukButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GovukButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GovukButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
