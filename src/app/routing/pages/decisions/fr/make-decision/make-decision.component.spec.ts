import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeDecisionComponent } from './make-decision.component';

describe('MakeDecisionComponent', () => {
  let component: MakeDecisionComponent;
  let fixture: ComponentFixture<MakeDecisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeDecisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeDecisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
