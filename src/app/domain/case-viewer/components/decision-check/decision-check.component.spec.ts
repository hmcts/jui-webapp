import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecisionCheckComponent } from './decision-check.component';

describe('DecisionCheckComponent', () => {
  let component: DecisionCheckComponent;
  let fixture: ComponentFixture<DecisionCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecisionCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecisionCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
