import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GovukDetailsComponent } from './govuk-details.component';

describe('GovukDetailsComponent', () => {
  let component: GovukDetailsComponent;
  let fixture: ComponentFixture<GovukDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GovukDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GovukDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
