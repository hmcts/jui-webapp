import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-textareas',
  templateUrl: './textareas.component.html',
  styleUrls: ['./textareas.component.scss']
})
export class TextareasComponent {
    @Input() group: FormGroup;
    @Input() idPrefix = 'ta';
    @Input() name = 'ta';
    @Input() rows;
    @Input() classes;
    @Input() control;

    constructor() { }
}
