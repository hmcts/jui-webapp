import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesForCourtAdministratorComponent } from './notes-for-court-administrator.component';

describe('NotesForCourtAdministratorComponent', () => {
  let component: NotesForCourtAdministratorComponent;
  let fixture: ComponentFixture<NotesForCourtAdministratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotesForCourtAdministratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesForCourtAdministratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
