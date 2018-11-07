import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HmctsGlobalFooterComponent } from './hmcts-global-footer.component';
import {helpData, navigationData} from './mock/hmcts-global-footer.mock';

describe('HmctsGlobalFooterComponent', () => {
  let component: HmctsGlobalFooterComponent;
  let fixture: ComponentFixture<HmctsGlobalFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HmctsGlobalFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HmctsGlobalFooterComponent);
    component = fixture.componentInstance;
    component.help = helpData;
    component.navigation = navigationData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
