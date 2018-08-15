import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GovukSkipLinkComponent } from './govuk-skip-link.component';

describe('GovukSkipLinkComponent', () => {
  let component: GovukSkipLinkComponent;
  let fixture: ComponentFixture<GovukSkipLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GovukSkipLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GovukSkipLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
