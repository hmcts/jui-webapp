import { Component, Attribute, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';
import { DecisionService } from '../../../../../domain/services/decision.service';
import { FormsService } from '../../../../../shared/services/forms.service';
import { ValidationService } from '../../../../../shared/services/validation.service';

@Component({
  selector: 'app-reasons-co-not-approved',
  templateUrl: './reasons-co-not-approved.component.html',
  styleUrls: ['./reasons-co-not-approved.component.scss']
})

export class ReasonsCoNotApprovedComponent implements OnInit {

    rejectReasonsForm: FormGroup;
    Object = Object;
    options: any;
    decision: any;
    request: any;
    pageValues: any = null;
    case: any;
    showOther: boolean = false;
    showOther2: boolean = false;
    showChilds: FormGroup;
    pageitems;

    constructor( @Attribute('data-children-of') private type: string,
                 private activatedRoute: ActivatedRoute,
                 private router: Router,
                 private decisionService: DecisionService,
                 private formsService: FormsService,
                 private validationService: ValidationService) {}

    createForm(pageitems, pageValues) {

        // So we need to place into this all the controls that are needed.
        // then run through the controls and check if any are true.

        // So do we have formValidationService and then a
        // controlValidationService
        // ie. one for the parent and one of child control.


        // it needs to pass through if a box is checked.
        //TODO: Move to service
        /**
         * isAnyCheckboxChecked
         *
         * Checks if any of the checkbox controls passed to this function are checked ie. have a boolean value
         * of true.
         *
         * This is due to the fact that we might have multiply checkboxes within the view, and the user needs to
         * select at least one of these checkboxes to have entered a valid input.
         *
         * Note that we valid on the formGroup level, and not the control level for this as we are concerned with
         * multiply controls and the Angular 6 way is to have the validator on a common ancestor of controls, in this
         * case our formGroup.
         *
         * If this function returns null, there is no validation error.
         *
         * @param formGroup
         * @return {any}
         */
        const isAnyCheckboxChecked: ValidatorFn = (formGroup: FormGroup): ValidationErrors | null => {

            // const checkboxes: Array<string> = ['partiesNeedAttend', 'NotEnoughInformation', 'orderNotAppearOfS25ca1973', 'd81',
            //     'pensionAnnex', 'applicantTakenAdvice', 'respondentTakenAdvice', 'Other2'];

            for (let checkbox of checkboxes) {
                if (formGroup.get(checkbox).value) {
                    return null;
                }
            }
            return {
                'noCheckboxIsChecked': true
            };
        };

        const checkboxes: Array<string> = ['partiesNeedAttend', 'NotEnoughInformation', 'orderNotAppearOfS25ca1973', 'd81',
            'pensionAnnex', 'applicantTakenAdvice', 'respondentTakenAdvice', 'Other2'];

        this.rejectReasonsForm = new FormGroup(this.formsService.defineformControls(pageitems, pageValues), {
            validators: this.validationService.isAnyCheckboxChecked
        });

        // TODO: The angular way according to
        // @see https://angular.io/guide/form-validation#adding-to-reactive-forms-1 is to have
        // validation that involves more than one control, in the common ancestor, ie. the form group.
        // but when do we initialise the form group, do we place the validation there?
        // therefore over here we should place the form wide validation, ie. where it involves two
        // or more controls.

        this.showOther = this.rejectReasonsForm.controls.Other.value;
        this.showOther2 = this.rejectReasonsForm.controls.Other2.value;

        this.rejectReasonsForm.valueChanges.subscribe( (value) => {
            this.showChilds = this.rejectReasonsForm;
        });
    }
    ngOnInit() {
        this.rejectReasonsForm = null;
        this.activatedRoute.parent.data.subscribe(data => {
            this.case = data.caseData;
        });
        const caseId = this.case.id;
        const pageId = 'reject-reasons';
        const jurId = 'fr';
        this.decisionService.fetch(jurId, caseId, pageId).subscribe(decision => {
            this.decision = decision;
            this.pageitems = this.decision.meta;
            this.pageValues = this.decision.formValues;

            // console.log("pageitems", this.pageitems);
            // console.log("pageValues", this.pageValues);

            this.createForm(this.pageitems, this.pageValues) ;
        });
    }
    onSubmit() {
        const event = this.rejectReasonsForm.value.createButton.toLowerCase();
        delete this.rejectReasonsForm.value.createButton;

        this.request = { formValues: this.rejectReasonsForm.value, event: event };
        console.log(this.pageitems.name, this.request);
        this.pageValues.visitedPages['reject-reasons'] = true;
        this.request.formValues.visitedPages = this.pageValues.visitedPages;

        console.log('Form is valid:', this.rejectReasonsForm.valid);

        if (this.rejectReasonsForm.invalid) {
            this.useValidation = true;
            return;
        }

        // TODO: Hook this back in when you are happy that validation works.
        // this.decisionService.submitDecisionDraft('fr',this.activatedRoute.snapshot.parent.data.caseData.id, this.pageitems.name, this.request).subscribe(decision => {
        //     console.log(decision.newRoute);
        //     this.router.navigate([`../${decision.newRoute}`], {relativeTo: this.activatedRoute});
        // });
    }
}
