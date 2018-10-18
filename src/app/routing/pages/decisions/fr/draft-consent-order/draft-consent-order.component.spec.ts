import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftConsentOrderComponent } from './draft-consent-order.component';

describe('DraftConsentOrderComponent', () => {
  let component: DraftConsentOrderComponent;
  let fixture: ComponentFixture<DraftConsentOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DraftConsentOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DraftConsentOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
