import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {TextareasComponent} from './textareas.component';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {LabelComponent} from '../label/label.component';
import {ValidationErrorFormControlComponent} from '../validation-error-formcontrol/validation-error-formcontrol.component';
import {DatePipe} from '@angular/common';
import {ValidationService} from '../../services/validation.service';

describe('TextareasComponent', () => {
  let component: TextareasComponent;
  let fixture: ComponentFixture<TextareasComponent>;
  let MockFormGroup;
  const MockValidation = {
      isFormControlValid: () => true
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [ ReactiveFormsModule ],
        declarations: [ TextareasComponent, LabelComponent, ValidationErrorFormControlComponent ],
        providers: [ DatePipe,
            {
                provide: ValidationService,
                useValue: MockValidation
            }
        ]
    })
    .compileComponents();
  }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TextareasComponent);
        component = fixture.componentInstance;
        MockFormGroup = new FormGroup({
            testControl: new FormControl('', Validators.required)
        });
        component.control = 'testControl';
        component.group = MockFormGroup;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should isControlInvalidAndShowValidation return false if there is a validation error', () => {
        expect(component.isControlInvalidAndShowValidation(MockFormGroup, 'testControl',true)).toBe(false);
    });

    it('should isGroupInvalidAndShowValidation return false if there is no group validation errors', () => {
        expect(component.isGroupInvalidAndShowValidation(MockFormGroup, true)).toBe(false);
    });

    it('should isGroupInvalidAndShowValidation return true if there is a group validation errors', () => {
        component.group.setErrors({
            testControl: 'required'
        });
        expect(component.isGroupInvalidAndShowValidation(MockFormGroup, true)).toBe(true);
    });
});
