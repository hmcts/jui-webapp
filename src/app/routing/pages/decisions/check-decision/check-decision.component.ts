import { Component, Input, OnInit } from '@angular/core';
import { DecisionService } from '../../../../domain/services/decision.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsService } from '../../../../shared/services/forms.service';
import { FormGroup } from '@angular/forms';
import { NpaService } from '../../../../shared/components/hmcts-em-viewer-ui/data/npa.service';
import { IDocumentTask } from '../../../../shared/components/hmcts-em-viewer-ui/data/document-task.model';
import { AnnotationStoreService } from '../../../../shared/components/hmcts-em-viewer-ui/data/annotation-store.service';
import { ConfigService } from '../../../../config.service';
import { ValidationService } from '../../../../shared/services/validation.service';


@Component({
    selector: 'app-check-decision',
    templateUrl: './check-decision.component.html'
})
export class CheckDecisionComponent implements OnInit {
    form: FormGroup;
    options: any;
    decision: any;
    request: any;
    pageValues: any = null;
    case: any;
    typeId: string;
    jurId: string;
    consentOrderDocumentId: string;
    useValidation: boolean = false;
    // will hold results of NPA
    annotations: any = null;
    npaDocumentTask: IDocumentTask;

    @Input() pageitems;
    constructor(private activatedRoute: ActivatedRoute,
        private router: Router,
        private decisionService: DecisionService,
        private formsService: FormsService,
        private npaService: NpaService,
        private configService: ConfigService,
        private annotationStoreService: AnnotationStoreService,
        private validationService: ValidationService
    ) { }
    createForm(pageitems, pageValues) {
        this.form = new FormGroup(this.formsService.defineformControls(pageitems, pageValues));
        const formGroupValidators = this.validationService.createFormGroupValidators(this.form, pageitems.formGroupValidators);
        this.form.setValidators(formGroupValidators);
    }

    isSectionExist(value) {
        if ( this.pageValues.visitedPages[value] === true ) {
            return true;
        }
    }

    ngOnInit() {
        this.useValidation = false;
        this.activatedRoute.parent.data.subscribe(data => {
            this.case = data.caseData;
            this.jurId = this.case.case_jurisdiction;
            this.typeId = this.case.case_type_id;

            // if Financial Remedy then call document annotation service
            if ( this.jurId === 'DIVORCE' && this.typeId === 'FinancialRemedyMVP2' ) {
                this.consentOrderDocumentId = this.decisionService.findConsentOrderDocumentId(this.case);
            }

        });
        const pageId = this.activatedRoute.snapshot.url[0].path;
        const caseId = this.case.id;
        // if Financial Remedy then call document annotation service
        if ( this.jurId === 'DIVORCE' && this.typeId === 'FinancialRemedyMVP2' ) {
            this.annotationStoreService.fetchData('/api', this.consentOrderDocumentId).subscribe((results) => {
                this.annotations = results.body.annotations;
                //If document has bee annotated then burn new document
                if (this.annotations !== null) {
                    this.burnAnnotatedDocument();
                }
            });
        }

        this.decisionService.fetch(this.jurId, caseId, pageId, this.typeId).subscribe(decision => {
            this.decision = decision;
            this.pageitems = this.decision.meta;
            this.pageValues = this.decision.formValues;
            console.log(this.pageValues);
            this.createForm(this.pageitems, this.pageValues);
        });
    }

    // For preliminary view only
    hasActivities(activities) {
        for (const activity of activities) {
            if ( this.pageValues[activity.type] === true ) return true;
        }
    }

    onSubmit(pagename) {
        let event = 'continue';

        if (pagename) {
            this.pageitems.name = pagename;
            event = 'change';
        }
        delete this.form.value.createButton;
        this.request = { formValues: { ...this.pageValues, ...this.form.value }, event: event };
        if (this.npaDocumentTask) {
            if (this.npaDocumentTask.outputDocumentId) {
                this.request.formValues.documentAnnotationId = this.npaDocumentTask.outputDocumentId;
            }
        }
        if (this.form.invalid && event === 'continue') {
            this.useValidation = true;
            return;
        } else {
            this.decisionService.submitDecisionDraft(
                this.jurId,
                this.activatedRoute.snapshot.parent.data.caseData.id,
                this.pageitems.name,
                this.typeId,
                this.request)
                .subscribe(decision => {
                    this.router.navigate([`../${decision.newRoute}`], {relativeTo: this.activatedRoute});
                });
        }
    }

    burnAnnotatedDocument() {
        if (this.consentOrderDocumentId != null) {
            this.npaService.exportPdf(this.consentOrderDocumentId, null, this.configService.config.api_base_url /*, second arg - already existing doc id*/).subscribe(
                (response: any) => {
                    this.npaDocumentTask = response.body;
                });
        }
    }
    handleNpaError(message) {
        alert(message);
    }
}
