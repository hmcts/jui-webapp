import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {DecisionService} from '../../../../../domain/services/decision.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormsService} from '../../../../../shared/services/forms.service';

@Component({
  selector: 'app-hearing-details',
  templateUrl: './hearing-details.component.html',
  styleUrls: ['./hearing-details.component.scss']
})
export class HearingDetailsComponent implements OnInit {
    hearingDetailsForm: FormGroup;
    options: any;
    decision: any;
    request: any;
    pageValues: any;
    case: any;
    @Input() pageitems;
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        public decisionService: DecisionService,
        private formsService: FormsService
    ) {}
    createForm(pageitems, pageValues) {
        this.hearingDetailsForm = new FormGroup(this.formsService.defineformControls(pageitems, pageValues));
    }
    ngOnInit() {
        this.activatedRoute.parent.data.subscribe(data => {
            this.case = data.caseData;
        });
        const caseId = this.case.id;
        const pageId = 'hearing-details';
        const jurId = 'fr';
        this.decisionService.fetch(jurId, caseId, pageId).subscribe(decision => {
            this.decision = decision;
            this.pageitems = this.decision.meta;
            this.pageValues = this.decision.formValues;

            console.log('pageitems', this.pageitems);
            console.log('pageValues', this.pageValues);

            this.createForm(this.pageitems, this.pageValues) ;
        });
    }
    onSubmit() {
        const event = this.hearingDetailsForm.value.createButton.toLowerCase();
        delete this.hearingDetailsForm.value.createButton;
        this.request = { formValues: this.hearingDetailsForm.value, event: event };
        this.pageValues.visitedPages['hearing-details'] = true;
        this.request.formValues.visitedPages = this.pageValues.visitedPages;
        console.log('Calling service with properties =>', this.pageitems.name, this.request);
        this.decisionService.submitDecisionDraft('fr',
                this.activatedRoute.snapshot.parent.data.caseData.id,
                this.pageitems.name,
                this.request)
            .subscribe(decision => {
                console.log(decision.newRoute);
                this.router.navigate([`../${decision.newRoute}`], {relativeTo: this.activatedRoute});
        });
    }
}
