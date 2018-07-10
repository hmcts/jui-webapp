import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HearingConfirmationComponent } from './hearing-confirmation.component';

describe('HearingConfirmationComponent', () => {
  let component: HearingConfirmationComponent;
  let fixture: ComponentFixture<HearingConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HearingConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HearingConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
