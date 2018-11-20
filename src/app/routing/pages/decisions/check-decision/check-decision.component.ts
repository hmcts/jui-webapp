import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit } from '@angular/core';
import { DecisionService } from '../../../../domain/services/decision.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsService } from '../../../../shared/services/forms.service';
import { FormGroup } from '@angular/forms';
import { NpaService } from '../../../../shared/components/hmcts-annotation-ui-lib/data/npa.service';
import { IDocumentTask } from '../../../../shared/components/hmcts-annotation-ui-lib/data/document-task.model';
import { ApiHttpService } from '../../../../shared/components/hmcts-annotation-ui-lib/data/api-http.service';
import { AnnotationStoreService } from '../../../../shared/components/hmcts-annotation-ui-lib/data/annotation-store.service';
import { ViewerFactoryService } from '../../../../shared/components/document-viewer/viewers/viewer-factory.service';

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
    consentOrderDocumentId: string;
    // will hold results of NPA
    annotations: any = null;
    npaDocumentTask: IDocumentTask;

    @Input() pageitems;
    constructor(private activatedRoute: ActivatedRoute,
        private router: Router,
        private decisionService: DecisionService,
        private formsService: FormsService,
        private npaService: NpaService,
        private apiHttpService: ApiHttpService,
        private annotationStoreService: AnnotationStoreService) { }
    createForm(pageitems, pageValues) {
        this.form = new FormGroup(this.formsService.defineformControls(pageitems, pageValues));
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
        this.activatedRoute.parent.data.subscribe(data => {
            this.case = data.caseData;
            this.consentOrderDocumentId = this.decisionService.findConsentOrderDocumentId(this.case);
        });
        const caseId = this.case.id;
        const pageId = 'check';
        const jurId = 'fr';

        console.log('docId=>', this.consentOrderDocumentId);

        this.annotationStoreService.fetchData('/api', this.consentOrderDocumentId).subscribe((results) => {
            this.annotations = results.body.annotations;
            console.log('annotations => ', this.annotations);
            //If document has bee annotated then burn new document

            if (this.annotations !== null) {
                this.burnAnnotatedDocument();
            }
        });

        this.decisionService.fetch(jurId, caseId, pageId).subscribe(decision => {
            this.decision = decision;
            this.pageitems = this.decision.meta;
            this.pageValues = this.decision.formValues;

            console.log('pageitems', this.pageitems);
            console.log('pageValues', this.pageValues);
            this.createForm(this.pageitems, this.pageValues);
        });
    }
    onSubmit(pagename) {
        let event = 'continue';

        if (pagename) {
            this.pageitems.name = pagename;
            event = 'change';
        }
        // else {
        //     event = this.form.value.createButton.toLowerCase();
        // }
        delete this.form.value.createButton;
        this.request = { formValues: this.pageValues, event: event };
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
        this.decisionService.submitDecisionDraft('fr',
            this.activatedRoute.snapshot.parent.data.caseData.id,
            this.pageitems.name,
            this.request)
            .subscribe(decision => {
                console.log(decision.newRoute);
                this.router.navigate([`../${decision.newRoute}`], { relativeTo: this.activatedRoute });
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
