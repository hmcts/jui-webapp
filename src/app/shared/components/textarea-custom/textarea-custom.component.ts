import { Component, forwardRef, Renderer2, ViewChild, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-textarea-custom',
  templateUrl: './textarea-custom.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TextareaCustomComponent),
    multi: true,
  }],
  styles: [`
    div[disabled] {
      @extend textarea[disabled];
    }
  `]
})

export class TextareaCustomComponent implements ControlValueAccessor {
  @ViewChild('textarea') textarea;

  @Input() id: string;
  @Input() error: boolean;
  @Input() disable: boolean;
  @Input() text = '';
  
  onChange;
  onTouched;

  constructor(private renderer: Renderer2) {
  }

  writeValue(value: any) : void {
    const div = this.textarea.nativeElement;
    this.renderer.setProperty(div, 'innerHTML', value);
  }

  registerOnChange(fn: any) : void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) : void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) : void {  }

  change(event) {    
    this.onChange(event.target.innerHTML);
    this.onTouched(event.target.innerHTML);
    document.execCommand('defaultParagraphSeparator', false, 'p');
  }

}
