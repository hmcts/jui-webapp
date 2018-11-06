import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReasonsCoNotApprovedComponent } from './reasons-co-not-approved.component';

describe('ReasonsCoNotApprovedComponent', () => {
  let component: ReasonsCoNotApprovedComponent;
  let fixture: ComponentFixture<ReasonsCoNotApprovedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReasonsCoNotApprovedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReasonsCoNotApprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
