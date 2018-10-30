import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { DecisionService } from '../../../../../domain/services/decision.service';
import { FormsService } from '../../../../../shared/services/forms.service';

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
    showChildrenCheckboxes: boolean = false;

    /**
     * showValidation
     *
     * As per the prototype, initially we do not show validation, only when the user clicks on 'Continue' should we
     * show the validation issues, for each control.
     *
     * @type {boolean}
     */
    showValidation = false;

    @Input() pageitems;
    constructor( private activatedRoute: ActivatedRoute,
                 private router: Router,
                 private decisionService: DecisionService,
                 private formsService: FormsService) {}
    createForm(pageitems, pageValues) {

        this.rejectReasonsForm = new FormGroup(this.formsService.defineformControls(pageitems, pageValues));

        this.showOther = this.rejectReasonsForm.controls.Other.value;
        this.showOther2 = this.rejectReasonsForm.controls.Other2.value;

        this.showChildrenCheckboxes = this.rejectReasonsForm.controls.NotEnoughInformation.value;

        //Assigning controls
        this.rejectReasonsForm.controls.Other.valueChanges.subscribe( (value) => {
            this.showOther = value;
        });
        this.rejectReasonsForm.controls.Other2.valueChanges.subscribe( (value) => {
            this.showOther2 = value;
        });
        this.rejectReasonsForm.controls.NotEnoughInformation.valueChanges.subscribe( (value) => {
            this.showChildrenCheckboxes = value;
            console.log(value);
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

            console.log("pageitems", this.pageitems);
            console.log("pageValues", this.pageValues);

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
        console.log('Form is pristine:', this.rejectReasonsForm.pristine);
        if (this.rejectReasonsForm.invalid) {
            this.showValidation = true;
            return;
        }
        // this.decisionService.submitDecisionDraft('fr',this.activatedRoute.snapshot.parent.data.caseData.id, this.pageitems.name, this.request).subscribe(decision => {
        //     console.log(decision.newRoute);
        //     this.router.navigate([`../${decision.newRoute}`], {relativeTo: this.activatedRoute});
        // });
    }
}
