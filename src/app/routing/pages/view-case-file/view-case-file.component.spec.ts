import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCaseFileComponent } from './view-case-file.component';

xdescribe('ViewCaseFileComponent', () => {
  let component: ViewCaseFileComponent;
  let fixture: ComponentFixture<ViewCaseFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCaseFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCaseFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
