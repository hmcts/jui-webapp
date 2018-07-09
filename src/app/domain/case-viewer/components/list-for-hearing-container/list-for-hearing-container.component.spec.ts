import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListForHearingContainerComponent } from './list-for-hearing-container.component';

describe('ListForHearingContainerComponent', () => {
  let component: ListForHearingContainerComponent;
  let fixture: ComponentFixture<ListForHearingContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListForHearingContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListForHearingContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
