import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {  FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

import { TextEditorComponent } from './text-editor.component';
import { TextareaCustomComponent } from './textarea-custom/textarea-custom.component';

describe('TextEditorComponent', () => {
  let component: TextEditorComponent;
  let fixture: ComponentFixture<TextEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [  ReactiveFormsModule ],
      declarations: [ TextEditorComponent, TextareaCustomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextEditorComponent);
    component = fixture.componentInstance;
    component.id = 'bob';
    component.formGroup = new FormGroup({
        bob: new FormControl()
    }, null, null);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('TextEditorComponent methods', () => {

    it('should call document.execCommand function when applyCommand called', () => {
      const execCommand = spyOn(document, 'execCommand');
      const event = {
        srcElement: {
          dataset: {
            command: 'dummy'
          }
        }
      };

      component.applyCommand(event);
      expect(execCommand).toHaveBeenCalledWith('dummy', false, null);
    });

    it('should change changeTabIndex', () => {
      const event = {
        srcElement: {
          dataset: {
            command: 'dummy'
          }
        }
      };

      component.changeTabIndex(event);
      expect(component.selectedStyleButton).toMatch('dummy');
    });

    it('should get changeFocus to return value when called with parameter "next"', () => {
      const event = {
        preventDefault: () => {},
        srcElement: {
          nextSibling: {
            focus: () => 'next'
          }
        }
      };

      expect(component.changeFocus('next', event)).toMatch('next');
    });

    it('should get changeFocus to return value when called with parameter "previous"', () => {
      const event = {
        preventDefault: () => {},
        srcElement: {
          previousSibling: {
            focus: () => 'previous'
          }
        }
      };

      expect(component.changeFocus('previous', event)).toMatch('previous');
    });

  });

  describe('TextEditorComponent events', () => {

    it('should call applyCommand function when clicked', () => {
      const applyCommand = spyOn(component, 'applyCommand');
      const event = {
        srcElement: {
          dataset: {
            command: true
          }
        }
      };

      component.onClick(event);
      expect(applyCommand).toHaveBeenCalled();
    });

    it('should call changeTabIndex function when focused', () => {
      const changeTabIndex = spyOn(component, 'changeTabIndex');
      const event = {
        srcElement: {
          dataset: {
            command: true
          }
        }
      };

      component.onFocus(event);
      expect(changeTabIndex).toHaveBeenCalled();
    });

    it('should call changeFocus with direction "next" function when key pressed down', () => {
      const changeFocus = spyOn(component, 'changeFocus');
      const event = {
        keyCode: 40
      };

      component.onKeyDown(event);
      expect(changeFocus).toHaveBeenCalledWith('next', event);
    });

    it('should call changeFocus with direction "next" function when key pressed right', () => {
      const changeFocus = spyOn(component, 'changeFocus');
      const event = {
        keyCode: 39
      };

      component.onKeyDown(event);
      expect(changeFocus).toHaveBeenCalledWith('next', event);
    });

    it('should call changeFocus with direction "previous" function when key pressed up', () => {
      const changeFocus = spyOn(component, 'changeFocus');
      const event = {
        keyCode: 38
      };

      component.onKeyDown(event);
      expect(changeFocus).toHaveBeenCalledWith('previous', event);
    });

    it('should call changeFocus with direction "previous" function when key pressed left', () => {
      const changeFocus = spyOn(component, 'changeFocus');
      const event = {
        keyCode: 37
      };

      component.onKeyDown(event);
      expect(changeFocus).toHaveBeenCalledWith('previous', event);
    });

  });
});
