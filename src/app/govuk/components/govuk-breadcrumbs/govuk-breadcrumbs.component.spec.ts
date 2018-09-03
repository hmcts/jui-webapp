import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GovukBreadcrumbsComponent } from './govuk-breadcrumbs.component';

describe('GovukBreadcrumbsComponent', () => {
  let component: GovukBreadcrumbsComponent;
  let fixture: ComponentFixture<GovukBreadcrumbsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GovukBreadcrumbsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GovukBreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
