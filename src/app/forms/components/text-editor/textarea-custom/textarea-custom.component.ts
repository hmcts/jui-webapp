import { Component, forwardRef, Renderer2, ViewChild, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-textarea-custom',
  templateUrl: './textarea-custom.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TextareaCustomComponent),
    multi: true,
  }]
})

export class TextareaCustomComponent implements ControlValueAccessor {
  @ViewChild('textarea') textarea;

  @Input() id: string;
  @Input() error: boolean;
  @Input() disable: boolean;
  
  onChange = new Function;
  onTouched = new Function;

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

  change(event) {
    document.execCommand('defaultParagraphSeparator', false, 'p');
    this.onChange(event.target.innerHTML);
    this.onTouched(event.target.innerHTML);
  }

  onKeyUp(event) {
    const div = this.textarea.nativeElement;
    const firstChild = div.firstChild;
    const firstChildText = firstChild ? div.firstChild.textContent : null;
    
    if (event.keyCode === 13 && firstChildText.indexOf('<p>') === -1) {
      div.removeChild(div.firstChild);
      const p: HTMLParagraphElement = document.createElement('p');
      p.innerHTML = firstChildText;
      div.insertBefore(p, div.firstChild);
    }
  }

}
