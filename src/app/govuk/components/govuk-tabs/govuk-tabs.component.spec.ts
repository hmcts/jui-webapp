import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GovukTabsComponent } from './govuk-tabs.component';

describe('GovukTabsComponent', () => {
  let component: GovukTabsComponent;
  let fixture: ComponentFixture<GovukTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GovukTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GovukTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
