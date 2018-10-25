import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent {
    @Input() idPrefix = 'btn';
    @Input() name = 'btn';
    @Input() group: FormGroup;
    @Input() classes;
    @Input() typeBtn;
    @Input() control;
}
