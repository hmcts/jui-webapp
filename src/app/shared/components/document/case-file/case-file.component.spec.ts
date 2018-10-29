import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseFileComponent } from './case-file.component';

describe('CaseFileComponent', () => {
  let component: CaseFileComponent;
  let fixture: ComponentFixture<CaseFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
