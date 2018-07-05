import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseDetailsBarComponent } from './case-details-bar.component';

describe('CaseDetailsBarComponent', () => {
  let component: CaseDetailsBarComponent;
  let fixture: ComponentFixture<CaseDetailsBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseDetailsBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseDetailsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
