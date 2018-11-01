import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import { Observable, EMPTY } from 'rxjs';

@Component({
  selector: 'app-jui-form-elements',
  templateUrl: './jui-form-elements.component.html',
  styleUrls: ['./jui-form-elements.component.scss']
})
export class JuiFormElementsComponent implements OnInit, OnChanges {
    @Input() group: FormGroup;
    @Input() data: Object;
    childOf;
    @Input() showChilds: Observable<any>;
    show;

    // Ok so this is fine, going in from here.
    @Input() useValidation = true;

    constructor() {}
    ngOnInit() {
    }
    onSelect(element) {
        console.log(element);
        if (element.checkbox) {
            this.childOf = element.checkbox.control;
        }
        if (element.radios) {
            this.childOf = element.radios.control;
        }
    }
    ngOnChanges() {
        if (this.group) {
            this.group.valueChanges.subscribe( (formGroup) => {
                this.show = formGroup;
            });
        }
    }
}
