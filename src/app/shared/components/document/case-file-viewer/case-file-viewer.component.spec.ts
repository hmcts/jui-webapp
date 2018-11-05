import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseFileViewerComponent } from './case-file-viewer.component';

describe('CaseFileViewerComponent', () => {
  let component: CaseFileViewerComponent;
  let fixture: ComponentFixture<CaseFileViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseFileViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseFileViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
