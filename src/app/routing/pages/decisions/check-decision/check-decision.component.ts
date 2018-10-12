import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit} from '@angular/core';
import {DecisionService} from '../../../../domain/services/decision.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormsService} from '../../../../shared/services/forms.service';
import {FormGroup} from '@angular/forms';
import {NpaService} from '../../../../shared/components/hmcts-annotation-ui-lib/data/npa.service';
import {IDocumentTask} from '../../../../shared/components/hmcts-annotation-ui-lib/data/document-task.model';

@Component({
    selector: 'app-check-decision',
    templateUrl: './check-decision.component.html',
    styleUrls: ['./check-decision.component.scss']
})
export class CheckDecisionComponent implements OnInit {
    form: FormGroup;
    options: any;
    decision: any;
    request: any;
    pageValues: any = null;
    case: any;
    isSectionExist: boolean = true;
    consentOrderDocumentId: string;
    // will hold results of NPA
    npaDocumentTask: IDocumentTask;

    @Input() pageitems;
    constructor( private activatedRoute: ActivatedRoute,
                 private router: Router,
                 private decisionService: DecisionService,
                 private formsService: FormsService,
                 private npaService: NpaService) {}
    createForm(pageitems, pageValues) {
        this.form = new FormGroup(this.formsService.defineformControls(pageitems, pageValues));
    }
    ngOnInit() {
        this.activatedRoute.parent.data.subscribe(data => {
            this.case = data.caseData;
            this.consentOrderDocumentId = this.decisionService.findConsentOrderDocumentId(this.case);
        });
        const caseId = this.case.id;
        const pageId = 'check';
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
        const event = this.form.value.createButton.toLowerCase();
        delete this.form.value.createButton;
        this.request = { formValues: this.pageValues, event: event };
        console.log("Submitting properties =>", this.pageitems.name, this.request);
        this.decisionService.submitDecisionDraft('fr',
            this.activatedRoute.snapshot.parent.data.caseData.id,
            this.pageitems.name,
            this.request)
            .subscribe(decision => {
                console.log(decision.newRoute);
                this.router.navigate([`../${decision.newRoute}`], {relativeTo: this.activatedRoute});
            });
    }
    burnAnnotatedDocument() {
        if (this.consentOrderDocumentId != null) {
            // this will generate a new document each time it's called.
            // provide second argument to upload the document as a next version of this document
            this.npaService.exportPdf(this.consentOrderDocumentId /*, second arg - already existing doc id*/).subscribe(
                (response) => {
                    this.npaDocumentTask = response.body;
                    if (this.npaDocumentTask.taskState === 'FAILED') {
                        this.handleNpaError(this.npaDocumentTask.failureDescription);
                    }
                },
                response => { this.handleNpaError('Could not create annotated PDF.'); } );
        }
    }
    handleNpaError(message) {
        alert(message);
    }
}
