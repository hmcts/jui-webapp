import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseFileAnnotationListComponent } from './case-file-annotation-list.component';

describe('CaseFileAnnotationListComponent', () => {
  let component: CaseFileAnnotationListComponent;
  let fixture: ComponentFixture<CaseFileAnnotationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseFileAnnotationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseFileAnnotationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
