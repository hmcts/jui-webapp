import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-inputs',
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.scss']
})
export class InputsComponent {
    @Input() group: FormGroup;
    @Input() item;
    @Input() label;
    @Input() hint;
    @Input() labelFor;
    name;
    id;
}
