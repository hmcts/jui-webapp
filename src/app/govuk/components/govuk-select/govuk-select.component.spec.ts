import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GovukSelectComponent } from './govuk-select.component';

describe('GovukSelectComponent', () => {
  let component: GovukSelectComponent;
  let fixture: ComponentFixture<GovukSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GovukSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GovukSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
