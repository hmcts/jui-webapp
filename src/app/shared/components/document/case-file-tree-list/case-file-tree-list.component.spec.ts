import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseFileTreeListComponent } from './case-file-tree-list.component';
import {RouterTestingModule} from '@angular/router/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('CaseFileTreeListComponent', () => {
  let component: CaseFileTreeListComponent;
  let fixture: ComponentFixture<CaseFileTreeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ CaseFileTreeListComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseFileTreeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
