import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HearingCheckComponent } from './hearing-check.component';

describe('HearingCheckComponent', () => {
  let component: HearingCheckComponent;
  let fixture: ComponentFixture<HearingCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HearingCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HearingCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
