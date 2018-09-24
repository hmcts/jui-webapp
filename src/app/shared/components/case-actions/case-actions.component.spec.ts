import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseActionsComponent } from './case-actions.component';

describe('CaseActionsComponent', () => {
  let component: CaseActionsComponent;
  let fixture: ComponentFixture<CaseActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
