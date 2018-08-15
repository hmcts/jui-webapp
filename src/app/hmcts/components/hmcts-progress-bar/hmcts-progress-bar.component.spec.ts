import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HmctsProgressBarComponent } from './hmcts-progress-bar.component';

describe('HmctsProgressBarComponent', () => {
  let component: HmctsProgressBarComponent;
  let fixture: ComponentFixture<HmctsProgressBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HmctsProgressBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HmctsProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
