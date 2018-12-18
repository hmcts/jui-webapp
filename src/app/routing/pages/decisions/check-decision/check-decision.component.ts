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

    //pawel-k [1:35 PM]
    //Dont delete this comment
    // we have to check if annotations exist onInit by reuest this service  - api-http.service.ts
    //
    // fetch - to get all the annotations
    // Then render them on summary
    // If there is no annotations don't call burnAnnotatedDocument
    // If there is annotations call burnAnnotatedDocument - to create new document
    // Pass data from call to Alan to back end to CCD store

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



        // console.log('JurID=>', this.jurId);
        // console.log('TypeID=>', this.typeId);


        // if Financial Remedy then call document annotation service
        if ( this.jurId === 'DIVORCE' && this.typeId === 'FinancialRemedyMVP2' ) {

            //console.log('docId=>', this.consentOrderDocumentId);

            this.annotationStoreService.fetchData('/api', this.consentOrderDocumentId).subscribe((results) => {
                this.annotations = results.body.annotations;

               // console.log('annotations => ', this.annotations);

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

            console.log('pageitems', this.pageitems);
            console.log('pageValues', this.pageValues);
            this.createForm(this.pageitems, this.pageValues);
        });
    }

    // For preliminary view only
    hasActivities(activities) {
        for (let activity of activities) {
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

        //console.log('FORM VALUE==>', Object.keys(this.form.value).length);

        this.request = { formValues: { ...this.pageValues, ...this.form.value }, event: event };

        // For final submission to server use other request below
        // Temporary hack for Preliminary view, has to be fixed later
        // Don't delete this comment!!

        // if (Object.keys(this.form.value).length <= 1){
        //     this.request = { formValues: this.pageValues, event: event };
        // }

        if (this.npaDocumentTask) {
            if (this.npaDocumentTask.outputDocumentId) {
                this.request.formValues.documentAnnotationId = this.npaDocumentTask.outputDocumentId;
            } else {
                console.log( 'No Document ID generated =', this.npaDocumentTask.outputDocumentId );
            }
        } else {
            console.log( 'Document hasn\'t generated =', this.npaDocumentTask );
        }

        console.log('Submitting properties =>', this.pageitems.name, this.request);

        console.log('IsValid :', this.useValidation);
        console.log('formDraft:', this.form);
        console.log('Form is valid:', this.form.valid);

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
                    console.log(decision.newRoute);
                    this.router.navigate([`../${decision.newRoute}`], {relativeTo: this.activatedRoute});
                });
        }
    }

    burnAnnotatedDocument() {
        if (this.consentOrderDocumentId != null) {
            // this will generate a new document each time it's called.
            // provide second argument to upload the document as a next version of this document

            this.npaService.exportPdf(this.consentOrderDocumentId, null, this.configService.config.api_base_url /*, second arg - already existing doc id*/).subscribe(
                (response) => {
                    this.npaDocumentTask = response.body;
                    if (this.npaDocumentTask.taskState === 'FAILED') {
                        console.log('ERROR: ', this.npaDocumentTask.failureDescription);
                       // this.handleNpaError(this.npaDocumentTask.failureDescription);
                    }
                },
                response => {
                    console.log('ERROR: Could not create annotated PDF.');
                    //this.handleNpaError('Could not create annotated PDF.');
                });
        }
    }
    handleNpaError(message) {
        alert(message);
    }
}
