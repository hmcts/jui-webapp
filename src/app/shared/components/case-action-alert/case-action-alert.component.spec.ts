import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseActionAlertComponent } from './case-action-alert.component';

describe('CaseActionAlertComponent', () => {
  let component: CaseActionAlertComponent;
  let fixture: ComponentFixture<CaseActionAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseActionAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseActionAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
