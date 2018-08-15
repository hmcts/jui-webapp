import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GovukInputComponent } from './govuk-input.component';

describe('GovukInputComponent', () => {
  let component: GovukInputComponent;
  let fixture: ComponentFixture<GovukInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GovukInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GovukInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
