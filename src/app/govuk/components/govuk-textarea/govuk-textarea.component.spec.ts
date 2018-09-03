import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GovukTextareaComponent } from './govuk-textarea.component';

describe('GovukTextareaComponent', () => {
  let component: GovukTextareaComponent;
  let fixture: ComponentFixture<GovukTextareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GovukTextareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GovukTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
