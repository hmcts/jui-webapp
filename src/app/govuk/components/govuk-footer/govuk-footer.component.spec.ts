import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GovukFooterComponent } from './govuk-footer.component';

describe('GovukFooterComponent', () => {
  let component: GovukFooterComponent;
  let fixture: ComponentFixture<GovukFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GovukFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GovukFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
