import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HmctsAlertComponent } from './hmcts-alert.component';

describe('HmctsAlertComponent', () => {
  let component: HmctsAlertComponent;
  let fixture: ComponentFixture<HmctsAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HmctsAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HmctsAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
