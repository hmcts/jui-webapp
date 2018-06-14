import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseNavComponent } from './case-nav.component';

xdescribe('CaseNavComponent', () => {
  let component: CaseNavComponent;
  let fixture: ComponentFixture<CaseNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
