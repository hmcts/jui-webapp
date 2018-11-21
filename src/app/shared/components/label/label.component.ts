import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent {
    @Input() idPrefix = 'lb';
    @Input() name = 'lb';
    @Input() forElement;
    @Input() label;

    constructor() {}
}
