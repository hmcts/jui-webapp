import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GovukRadiosComponent } from './govuk-radios.component';

describe('GovukRadiosComponent', () => {
  let component: GovukRadiosComponent;
  let fixture: ComponentFixture<GovukRadiosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GovukRadiosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GovukRadiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
