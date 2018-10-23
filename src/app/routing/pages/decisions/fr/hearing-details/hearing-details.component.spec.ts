import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HearingDetailsComponent } from './hearing-details.component';

describe('HearingDetailsComponent', () => {
  let component: HearingDetailsComponent;
  let fixture: ComponentFixture<HearingDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HearingDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HearingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
