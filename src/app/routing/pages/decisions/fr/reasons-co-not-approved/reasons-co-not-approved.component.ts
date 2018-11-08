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

        /**
         * Creates Form Group with Controls.
         */
        this.rejectReasonsForm = new FormGroup(this.formsService.defineformControls(pageitems, pageValues));
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
            this.decisionService.submitDecisionDraft('fr',this.activatedRoute.snapshot.parent.data.caseData.id, this.pageitems.name, this.request).subscribe(decision => {
                console.log(decision.newRoute);
                this.router.navigate([`../${decision.newRoute}`], {relativeTo: this.activatedRoute});
            });
        }
    }
}
