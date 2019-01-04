import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextareaCustomComponent } from './textarea-custom.component';

describe('TextareaCustomComponent', () => {
  let component: TextareaCustomComponent;
  let fixture: ComponentFixture<TextareaCustomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextareaCustomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextareaCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
