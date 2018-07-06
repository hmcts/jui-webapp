import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseDecisionContainerComponent } from './case-decision-container.component';

describe('CaseDecisionContainerComponent', () => {
  let component: CaseDecisionContainerComponent;
  let fixture: ComponentFixture<CaseDecisionContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseDecisionContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseDecisionContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
