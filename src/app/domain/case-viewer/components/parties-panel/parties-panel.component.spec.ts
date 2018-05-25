import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartiesPanelComponent } from './parties-panel.component';

describe('PartiesPanelComponent', () => {
  let component: PartiesPanelComponent;
  let fixture: ComponentFixture<PartiesPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartiesPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartiesPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
