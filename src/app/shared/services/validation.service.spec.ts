import {TestBed, inject} from '@angular/core/testing';

import {ValidationService} from './validation.service';
import {FormGroup, FormControl, ValidatorFn, Validators} from '@angular/forms';

fdescribe('ValidationService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ValidationService]
        });
    });

    it('should be created', inject([ValidationService], (service: ValidationService) => {
        expect(service).toBeTruthy();
    }));

    it('should return an array with Validators.required, if the validation for a control is ["required"]',
        inject([ValidationService], (service: ValidationService) => {
            expect(service).toBeTruthy();
        }));

    // TODO: This should not check for Function as it's too broad.
    it('should create a form group validator, with type ValidationFn.', inject([ValidationService], (service: ValidationService) => {

        const formGroup = new FormGroup({
            test: new FormControl('test')
        });

        const formGroupValidators = {
            validatorFunc: 'isAnyCheckboxChecked',
            validationErrorId: 'reasonsConstentOrderNotApproved',
            checkboxes: [
                'partiesNeedAttend', 'NotEnoughInformation', 'orderNotAppearOfS25ca1973', 'd81',
                'pensionAnnex', 'applicantTakenAdvice', 'respondentTakenAdvice', 'Other2'
            ]
        };

        const formGroupValidatorFunction = service.createFormGroupValidator(formGroup, formGroupValidators.validatorFunc, formGroupValidators.checkboxes,
            formGroupValidators.validationErrorId);

        expect(formGroupValidatorFunction).toEqual(jasmine.any(Function));
    }));
    it('should return mapped simple names to Ng Validators', inject([ValidationService], (service: ValidationService) => {
        expect(service.getNgValidationFunctionMap()).toEqual(jasmine.any(Array));
    }));
    it('should take an array of simple names and map them to Ng Validation functions', inject([ValidationService], (service: ValidationService) => {
        const validators = [ 'required', 'email' ];
        expect(service.getNgValidators(validators)).toEqual([ jasmine.any(Function), jasmine.any(Function) ]);
    }));
    it('control should has a validator', inject([ValidationService], (service: ValidationService) => {
        const validators = [ 'required', 'email' ];
        expect(service.controlHasValidation(validators)).not.toBeLessThan(0);
    }));
    it('control should be valid', inject([ValidationService], (service: ValidationService) => {
        const formGroup = new FormGroup({
            test: new FormControl('test')
        });
        expect(service.isFormControlValid(formGroup, 'test')).toBe(true);
    }));
    it('form group should be not valid', inject([ValidationService], (service: ValidationService) => {
        let formGroup = {
            errors: {
                'testErrorId' : true
            }
        }
        const validationErrorId = 'testErrorId';
        const isFormGroupInvalidFunc = service.isFormGroupInvalid(formGroup, validationErrorId);
        expect(isFormGroupInvalidFunc).toBe(true);
    }));
    it('form group should be valid', inject([ValidationService], (service: ValidationService) => {
        const formGroup = new FormGroup({
            test: new FormControl('test')
        });
        const validationErrorId = 'testErrorId';
        const isFormGroupInvalidFunc = service.isFormGroupInvalid(formGroup, validationErrorId);
        expect(isFormGroupInvalidFunc).toBe(null);
    }));
    it('should at least one checkbox to be checked validation', inject([ValidationService], (service: ValidationService) => {
        const formGroup = new FormGroup({
            checkboxTest1: new FormControl('checkboxTest1'),
            checkboxTest2: new FormControl('checkboxTest2')
        });
        const validationIdentifier = 'isAnyCheckboxChecked';
        const checkboxes = [
            'checkboxTest1', 'checkboxTest2'
        ]
        const isAnyCheckboxChecked = service.isAnyCheckboxChecked(formGroup, checkboxes, validationIdentifier);
        formGroup.get('checkboxTest1').setValue(true);
        formGroup.get('checkboxTest2').setValue(false);
        expect(isAnyCheckboxChecked(formGroup)).toBe(null);
        formGroup.get('checkboxTest1').setValue(false);
        formGroup.get('checkboxTest2').setValue(false);
        expect(isAnyCheckboxChecked(formGroup).isAnyCheckboxChecked).toBe(true);
    }));
    it('should check if all fields required common function unit test', inject([ValidationService], (service: ValidationService) => {
        const formGroup = new FormGroup({
            test1Filed: new FormControl(),
            test2Filed: new FormControl()
        });
        const validationIdentifier = 'isAllFieldsRequiredValidationFn';
        const fields = [
            'test1Filed', 'test2Filed'
        ]
        let isAllFieldsRequiredValidationFn = service.isAllFieldsRequiredValidationFn(formGroup, fields, validationIdentifier);
        expect(isAllFieldsRequiredValidationFn[validationIdentifier]).toBe(true);
        formGroup.get('test1Filed').setValue('test value 1');
        formGroup.get('test2Filed').setValue('test value 2');
        isAllFieldsRequiredValidationFn = service.isAllFieldsRequiredValidationFn(formGroup, fields, validationIdentifier);
        expect(isAllFieldsRequiredValidationFn).toBe(null);
    }));
    it('should check if all fields required group validator returns a validation function', inject([ValidationService], (service: ValidationService) => {
        const formGroup = new FormGroup({
            test1Filed: new FormControl(),
            test2Filed: new FormControl()
        });
        const validationIdentifier = 'isAllFieldsRequiredValidationFn';
        const fields = [
            'test1Filed', 'test2Filed'
        ]
        const isAllFieldsRequired = service.isAllFieldsRequired(formGroup, fields, validationIdentifier);
        expect(isAllFieldsRequired).toEqual(jasmine.any(Function));
        expect(isAllFieldsRequired(formGroup)[validationIdentifier]).toBe(true);
    }));
    it('should check conditional validator textarea should be valid if parent checkbox checked', inject([ValidationService], (service: ValidationService) => {
        const formGroup = new FormGroup({
            testCheckbox: new FormControl(),
            testTextarea: new FormControl()
        });
        const validationIdentifier = 'isTextAreaValidWhenCheckboxChecked';
        const controls = {
            checkboxControl: 'testCheckbox',
            textareaControl: 'testTextarea'
        }
        let isTextAreaValidWhenCheckboxChecked = service.isTextAreaValidWhenCheckboxChecked(formGroup, controls, validationIdentifier);
        expect(isTextAreaValidWhenCheckboxChecked).toEqual(jasmine.any(Function));
        formGroup.get('testCheckbox').setValue(true);
        isTextAreaValidWhenCheckboxChecked = service.isTextAreaValidWhenCheckboxChecked(formGroup, controls, validationIdentifier);
        expect(isTextAreaValidWhenCheckboxChecked(formGroup)[validationIdentifier]).toBe(true);
        formGroup.get('testTextarea').setValue('Some test text');
        isTextAreaValidWhenCheckboxChecked = service.isTextAreaValidWhenCheckboxChecked(formGroup, controls, validationIdentifier);
        expect(isTextAreaValidWhenCheckboxChecked(formGroup)).toBe(null);
    }));
    it('should check conditional validator radio should be valid if one option selected', inject([ValidationService], (service: ValidationService) => {
        const formGroup = new FormGroup({
            testRadioControl: new FormControl('testOption'),
            testTextarea: new FormControl()
        });
        const validationIdentifier = 'isRadioValidWhenSomeOptionSelected';
        const controls = {
            radioControl: 'testRadioControl',
            selectedOptions: [
                {
                    selectedOption: 'testOption',
                    childValidator: {
                        validatorFunc: 'isAllFieldsRequired',
                        validationErrorId: 'testChildValidationErrorId',
                        controls: [
                            'test1', 'test2', 'test3'
                        ]
                    }
                }
            ]
        }
        let isRadioValidWhenSomeOptionSelected = service.isRadioValidWhenSomeOptionSelected(formGroup, controls, validationIdentifier);
        expect(isRadioValidWhenSomeOptionSelected).toEqual(jasmine.any(Function));
        // formGroup.get('testCheckbox').setValue(true);
        // isTextAreaValidWhenCheckboxChecked = service.isTextAreaValidWhenCheckboxChecked(formGroup, controls, validationIdentifier);
        // expect(isTextAreaValidWhenCheckboxChecked(formGroup)[validationIdentifier]).toBe(true);
        // formGroup.get('testTextarea').setValue('Some test text');
        // isTextAreaValidWhenCheckboxChecked = service.isTextAreaValidWhenCheckboxChecked(formGroup, controls, validationIdentifier);
        // expect(isTextAreaValidWhenCheckboxChecked(formGroup)).toBe(null);
    }));
});
