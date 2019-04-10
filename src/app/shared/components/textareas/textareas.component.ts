import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ValidationService} from '../../services/validation.service';

@Component({
    selector: 'app-textareas',
    templateUrl: './textareas.component.html'
})

export class TextareasComponent {
    @Input() group: FormGroup;
    @Input() labelFor;
    @Input() rows;
    @Input() classes;
    @Input() control;
    @Input() showValidation;
    @Input() label;
    @Input() items;
    @Input() validationError;

    constructor(private validationService: ValidationService) {
    }

    isGroupInvalidAndShowValidation (formGroup: FormGroup, showValidation: boolean) {
        if(formGroup.errors && formGroup.errors[this.control] && showValidation) {
            return true;
        }
        return false;
    }
    isControlInvalidAndShowValidation(formGroup: FormGroup, control: string, showValidation: boolean) {;
        return !this.isFormControlValid(formGroup, control) && showValidation;
    }
    isFormControlValid(formGroup: FormGroup, control: string): boolean {
        return this.validationService.isFormControlValid(formGroup, control);
    }
}
