import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GovukFieldsetComponent } from './govuk-fieldset.component';

describe('GovukFieldsetComponent', () => {
  let component: GovukFieldsetComponent;
  let fixture: ComponentFixture<GovukFieldsetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GovukFieldsetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GovukFieldsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
