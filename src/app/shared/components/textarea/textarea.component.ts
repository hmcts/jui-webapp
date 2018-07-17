import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-textarea',
    templateUrl: './textarea.component.html',
    styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent implements OnInit {

    @Input() id: string;
    @Input() label: string;
    @Input() rows: string;
    @Input() errorMessage: string;
    @Input() error: boolean;
    @Input() text = '';
    @Output() textChange  = new EventEmitter<string>();


    constructor() { }

    ngOnInit() {
    }

    textChanged() {
        console.log(this.text);
        this.textChange.emit(this.text);
    }

}
