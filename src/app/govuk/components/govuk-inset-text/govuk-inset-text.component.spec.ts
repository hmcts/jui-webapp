import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GovukInsetTextComponent } from './govuk-inset-text.component';

describe('GovukInsetTextComponent', () => {
  let component: GovukInsetTextComponent;
  let fixture: ComponentFixture<GovukInsetTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GovukInsetTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GovukInsetTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
