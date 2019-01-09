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
    const lastChild = div.lastChild;

    if (
      event.keyCode === 13
      && !event.shiftKey
      && firstChild.nodeName.toLowerCase() !== 'p'
    ) {

      const content = div.innerHTML;
      const firstPIndex = content.indexOf('<p>'); // there always be a <p> because of keyCode 13

      while(div.hasChildNodes()){ // remove all because b or u tags etc will not be in first child
        div.removeChild(div.lastChild);
      }

      const p: HTMLParagraphElement = document.createElement('p');
      p.innerHTML = content.slice(0, firstPIndex);
      div.insertBefore(lastChild, div.firstChild);
      div.insertBefore(p, div.firstChild);

      const selection = window.getSelection();
      selection.collapse(div.lastChild, div.lastChild.length); // set cursor to end
    }
  }

}
