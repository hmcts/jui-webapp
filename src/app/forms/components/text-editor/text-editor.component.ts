import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html'
})
export class TextEditorComponent implements OnInit {

  @Input() id: string;
  @Input() error: boolean;
  @Input() disable: boolean;
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
    document.execCommand(e.srcElement.dataset.command, false, null);
  };

  changeTabIndex(e) {
    this.selectedStyleButton = e.srcElement.dataset.command;
  }

  changeFocus(direction, e) {
    e.preventDefault();
    let focusableButton = e.srcElement;
    const siblingButton = direction === 'next' ? focusableButton.nextSibling : focusableButton.previousSibling;
    if(siblingButton) {
      siblingButton.focus();
    }
  }

  onClick(e) {
    if (e.srcElement.dataset.command) {
      this.applyCommand(e);
    }
  }

  onFocus(e) {
    if (e.srcElement.dataset.command) {
      this.changeTabIndex(e);
    }
  }

  onKeyDown(e) {
    let focusableButton = e.srcElement;
    switch(e.keyCode) {
      case this.keys.right:
      case this.keys.down:
        this.changeFocus('next', e);
        break;
      case this.keys.left:
      case this.keys.up:
        this.changeFocus('previous', e);
        break;
    }
  }

}
