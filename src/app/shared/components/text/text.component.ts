import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent {

    @Input() id: string;
    @Input() label: string;
    @Input() rows: string;
    @Input() errorMessage: string;
    @Input() error: boolean;
    @Input() disable: boolean;
    @Input() text = '';
    @Input() formGroup;

    constructor() { }

}
