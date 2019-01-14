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

  it('should call onChange with parameter', () => {
    const event = {
      target: {
        innerHTML: 'dummy'
      }
    };

    const onChange = spyOn(component, 'onChange');

    component.change(event);
    expect(onChange).toHaveBeenCalledWith('dummy');
  });

  it('should call onTouched with parameter', () => {
    const event = {
      target: {
        innerHTML: 'dummy'
      }
    };

    const onTouched = spyOn(component, 'onTouched');

    component.change(event);
    expect(onTouched).toHaveBeenCalledWith('dummy');
  });

  it('should return text wrapped in a p tag when onKeyUp called', () => {
    const event = {
      keyCode: 13
    };
    const lineFeed = '<p><br></p>';

    component.textarea.nativeElement.innerHTML = 'a' + lineFeed;
    component.onKeyUp(event);

    expect(component.textarea.nativeElement.innerHTML).toBe('<p>a</p>' + lineFeed);
  });

  it('should return html wrapped in a p tag when onKeyUp called', () => {
    const event = {
      keyCode: 13
    };
    const lineFeed = '<p><br></p>';

    component.textarea.nativeElement.innerHTML = '<b>a</b>' + lineFeed;
    component.onKeyUp(event);

    expect(component.textarea.nativeElement.innerHTML).toBe('<p><b>a</b></p>' + lineFeed);
  });

});
