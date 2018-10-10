import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseActionAlertComponent } from './case-action-alert.component';
import {Selector} from '../../../../../test/selector-helper';
import {DebugElement} from '@angular/core';

describe('CaseActionAlertComponent', () => {
  let component: CaseActionAlertComponent;
  let fixture: ComponentFixture<CaseActionAlertComponent>;
  let element: DebugElement;

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
    element = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
