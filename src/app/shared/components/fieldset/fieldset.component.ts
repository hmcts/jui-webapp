import {Component, Input} from '@angular/core';
import { Observable, EMPTY } from 'rxjs';

@Component({
  selector: 'app-fieldset',
  templateUrl: './fieldset.component.html',
  styleUrls: ['./fieldset.component.scss']
})
export class FieldsetComponent {
    @Input() classes;
    @Input() validate;
    @Input() group;
    @Input() data;
}
