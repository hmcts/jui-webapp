import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseViewerContainerComponent } from './case-viewer-container.component';

describe('CaseViewerContainerComponent', () => {
  let component: CaseViewerContainerComponent;
  let fixture: ComponentFixture<CaseViewerContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseViewerContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseViewerContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
