import { Component, Attribute, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
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
    pageitems;

    /**
     * showValidation
     *
     * As per the prototype, initially we do not show validation, only when the user clicks on 'Continue' should we
     * show the validation issues, for each control.
     *
     * @type {boolean}
     */
    useValidation = false;

    constructor( @Attribute('data-children-of') private type: string,
                 private activatedRoute: ActivatedRoute,
                 private router: Router,
                 private decisionService: DecisionService,
                 private formsService: FormsService,
                 private validationService: ValidationService) {}

    createForm(pageitems, pageValues) {

        /**
         * Creates Form Group with Controls.
         */
        this.rejectReasonsForm = new FormGroup(this.formsService.defineformControls(pageitems, pageValues));

        const checkboxes: Array<string> = ['partiesNeedAttend', 'NotEnoughInformation', 'orderNotAppearOfS25ca1973', 'd81',
            'pensionAnnex', 'applicantTakenAdvice', 'respondentTakenAdvice', 'Other2'];

        const validationIdentifier = 'reasonsConstentOrderNotApproved';

        /**
         * Form Group Validators, are used for validation that involves one control, being dependent upon another,
         * or on a group of other controls.
         *
         * Validation is required on the common ancestor as per
         * @see https://angular.io/guide/form-validation#adding-to-reactive-forms-1
         * to validate multiply controls.
         *
         * TODO: So over here, you can place in multiply validators for the page.
         * So over here you need to pass in the checkboxes. how would you do this?
         *
         * Therefore isAnyCheckboxChecked needs to return an object that is of signature of ValidationFn.
         *
         * So a dev would add validators here, each validator, would have a name
         * So you should be able to pass in.
         *
         */
        const formGroupValidators = [this.validationService.isAnyCheckboxChecked(this.rejectReasonsForm, checkboxes, validationIdentifier)];

        /**
         * Sets up Forms top most validators, ie. validators that depend on multiply controls. ie.
         * to check if one of multiply checkboxes are checked.
         *
         * Note : set Validations takes objects with a signature of ValidationFn
         */
        this.rejectReasonsForm.setValidators(formGroupValidators);
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
        } else {
            this.decisionService.submitDecisionDraft('fr', this.activatedRoute.snapshot.parent.data.caseData.id, this.pageitems.name, this.request).subscribe(decision => {
                console.log(decision.newRoute);
                this.router.navigate([`../${decision.newRoute}`], {relativeTo: this.activatedRoute});
            });
        }
    }
}
