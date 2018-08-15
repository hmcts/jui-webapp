import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GovukPhaseBannerComponent } from './govuk-phase-banner.component';

describe('GovukPhaseBannerComponent', () => {
  let component: GovukPhaseBannerComponent;
  let fixture: ComponentFixture<GovukPhaseBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GovukPhaseBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GovukPhaseBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
