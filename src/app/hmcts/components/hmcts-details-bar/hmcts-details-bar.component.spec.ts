import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HmctsDetailsBarComponent } from './hmcts-details-bar.component';

describe('HmctsDetailsBarComponent', () => {
  let component: HmctsDetailsBarComponent;
  let fixture: ComponentFixture<HmctsDetailsBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HmctsDetailsBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HmctsDetailsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
