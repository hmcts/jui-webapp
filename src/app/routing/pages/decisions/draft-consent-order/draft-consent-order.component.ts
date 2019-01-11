import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {DecisionService} from '../../../../domain/services/decision.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormsService} from '../../../../shared/services/forms.service';

@Component({
  selector: 'app-draft-consent-order',
  templateUrl: './draft-consent-order.component.html',
  styleUrls: ['./draft-consent-order.component.scss']
})
export class DraftConsentOrderComponent implements OnInit {
    draftConsentOrderForm: FormGroup;
    options: any;
    decision: any;
    request: any;
    pageValues: any = null;
    case: any;
    typeId: string;
    jurId: string;
    pageitems: any;
    useValidation: boolean = false;
    consentDocumentUrl: string;
    allowAnnotations = true;

    constructor( private activatedRoute: ActivatedRoute,
                 private router: Router,
                 private decisionService: DecisionService,
                 private formsService: FormsService) {}
    createForm(pageitems, pageValues) {
        this.draftConsentOrderForm = new FormGroup(this.formsService.defineformControls(pageitems, pageValues));
    }
    ngOnInit() {
        this.activatedRoute.parent.data.subscribe(data => {
            this.case = data.caseData;
            this.consentDocumentUrl = this.decisionService.findConsentOrderDocumentUrl(this.case);
        });

        const pageId = this.activatedRoute.snapshot.url[0].path;
        const caseId = this.case.id;
        this.jurId = this.case.case_jurisdiction;
        this.typeId = this.case.case_type_id;

        this.decisionService.fetch(this.jurId, caseId, pageId, this.typeId).subscribe(decision => {
            this.decision = decision;
            this.pageitems = this.decision.meta;
            this.pageValues = this.decision.formValues;
            if (!this.decision.formValues.visitedPages) {
                this.decision.formValues.visitedPages = {'create': true };
            } else {
                this.decision.formValues.visitedPages[pageId] = true;
            }
            this.createForm(this.pageitems, this.pageValues) ;
        });
    }
    onSubmit() {
        const event = this.draftConsentOrderForm.value.createButton.toLowerCase();
        delete this.draftConsentOrderForm.value.createButton;
        this.request = { formValues: this.draftConsentOrderForm.value, event: event };
        this.request.formValues.visitedPages = this.pageValues.visitedPages;

        this.decisionService.submitDecisionDraft(
            this.jurId,
            this.activatedRoute.snapshot.parent.data.caseData.id,
            this.pageitems.name,
            this.typeId,
            this.request).subscribe(decision => {
            this.router.navigate([`../${decision.newRoute}`], {relativeTo: this.activatedRoute});
        });
    }

}
