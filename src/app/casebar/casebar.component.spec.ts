import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasebarComponent } from './casebar.component';

describe('CasebarComponent', () => {
  let component: CasebarComponent;
  let fixture: ComponentFixture<CasebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
