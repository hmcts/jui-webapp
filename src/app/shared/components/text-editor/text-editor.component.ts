import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html'
})
export class TextEditorComponent implements OnInit {

  @Input() id: string;
  @Input() label: string;
  @Input() errorMessage: string;
  @Input() error: boolean;
  @Input() disable: boolean;
  @Input() text = '';
  @Input() formGroup;

  public selectedStyleButton: string;
  private keys: any;

  constructor() { }

  ngOnInit() {
    this.keys = {
      left: 37,
      right: 39,
      up: 38,
      down: 40
    };
  }
  
  applyCommand(e) {
    if (e.srcElement.dataset.command) {
      document.execCommand(e.srcElement.dataset.command, false, null);
    }
  };

  changeTabIndex(e) {
    if (e.srcElement.dataset.command) {
      this.selectedStyleButton = e.srcElement.dataset.command;
    }
  }

  changeFocus(e) {
    let focusableButton = e.srcElement;
    switch(e.keyCode) {
      case this.keys.right:
      case this.keys.down:
        e.preventDefault();
        const nextButton = focusableButton.nextSibling;
        if(nextButton) {
          nextButton.focus();
        }
        break;
      case this.keys.left:
      case this.keys.up:
        e.preventDefault();
        const previousButton = focusableButton.previousSibling;
        if(previousButton) {
          previousButton.focus();
        }
        break;
    }
  }

}
