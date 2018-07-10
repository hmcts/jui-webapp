import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecisionConfirmationComponent } from './decision-confirmation.component';

describe('DecisionConfirmationComponent', () => {
  let component: DecisionConfirmationComponent;
  let fixture: ComponentFixture<DecisionConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecisionConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecisionConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
