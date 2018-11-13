import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseFileTreeListComponent } from './case-file-tree-list.component';

describe('CaseFileTreeListComponent', () => {
  let component: CaseFileTreeListComponent;
  let fixture: ComponentFixture<CaseFileTreeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseFileTreeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseFileTreeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
