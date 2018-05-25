import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseViewerComponent } from './case-viewer.component';

describe('CaseViewerComponent', () => {
  let component: CaseViewerComponent;
  let fixture: ComponentFixture<CaseViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
