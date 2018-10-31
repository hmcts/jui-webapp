import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-jui-form-elements',
  templateUrl: './jui-form-elements.component.html',
  styleUrls: ['./jui-form-elements.component.scss']
})
export class JuiFormElementsComponent {
    // @Input() legendClasses: String;
    // @Input() hintClasses: String;
    // @Input() radiobuttonClasses: String;
    // @Input() radioItems: Object;
    @Input() group: FormGroup;
    @Input() data: Object;
    @Input() childrenOf;

    // Ok so this is fine, going in from here.
    @Input() useValidation = true;

    constructor() {}
}
