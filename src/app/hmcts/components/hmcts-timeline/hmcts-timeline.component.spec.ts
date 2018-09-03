import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HmctsTimelineComponent } from './hmcts-timeline.component';
import {SentenceCasePipe} from '../../pipes/sentence-case/sentence-case-pipe';

describe('HmctsTimelineComponent', () => {
  let component: HmctsTimelineComponent;
  let fixture: ComponentFixture<HmctsTimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HmctsTimelineComponent, SentenceCasePipe]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HmctsTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
