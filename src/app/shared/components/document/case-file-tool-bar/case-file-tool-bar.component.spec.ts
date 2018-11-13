import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseFileToolBarComponent } from './case-file-tool-bar.component';

describe('CaseFileToolBarComponent', () => {
  let component: CaseFileToolBarComponent;
  let fixture: ComponentFixture<CaseFileToolBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseFileToolBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseFileToolBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
