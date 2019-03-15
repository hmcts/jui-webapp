import {ChangeDetectorRef, Component, EventEmitter, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {RedirectionService} from '../../../redirection.service';
import {HearingService} from '../../../../domain/services/hearing.service';
import { FormsService } from '../../../../shared/services/forms.service';
import { ValidationService } from '../../../../shared/services/validation.service';

@Component({
    selector: 'app-check-list-for-hearing',
    templateUrl: './check-hearing.component.html',
    styleUrls: ['./check-hearing.component.scss']
})
export class CheckHearingComponent implements OnInit {
    form: FormGroup;
    case: any;

    hearing: any;
    pageValues: any;
    pageitems: any;
    useValidation: boolean = false;
    request: any;

    constructor(private formsService: FormsService,
                private validationService: ValidationService,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private hearingService: HearingService,
                private redirectionService: RedirectionService) {}

     createForm(pageitems, pageValues) {
        this.form = new FormGroup(this.formsService.defineformControls(pageitems, pageValues));
        const formGroupValidators = this.validationService.createFormGroupValidators(this.form, pageitems.formGroupValidators);
        this.form.setValidators(formGroupValidators);
    }

    ngOnInit() {
        this.case = this.activatedRoute.parent.snapshot.data['caseData'];

        this.hearingService.fetch('DIVORCE', this.case.id, 'check', 'FinancialRemedyMVP2').subscribe(hearing => {
            this.hearing = hearing;
            this.pageitems = this.hearing.meta;
            this.pageValues = this.hearing.formValues;
            console.log(this.pageitems);
            if (this.hearing.formValues.visitedPages === undefined) {
                this.hearing.formValues.visitedPages = {};
                this.hearing.formValues.visitedPages['check'] =  true ;
            }
            this.createForm(this.pageitems, this.pageValues);
        });

    }

    isSectionExist(value) {
        if ( this.pageValues.visitedPages[value] === true ) {
            return true;
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

        if (this.form.invalid && event === 'continue') {
            this.useValidation = true;
            return;
        } else {
            if (event === 'change') {
                this.router.navigate(['../list'], {relativeTo: this.activatedRoute});
            }

            if (event === 'continue') {
                this.submitCallback();
            }
        }
    }

    submitCallback() {
        if (this.form.valid) {
            this.hearingService.listForHearing(this.case.id, this.request.formValues)
                .subscribe(() => {
                        this.redirectionService.redirect(`/case/${this.case.case_jurisdiction}/${this.case.case_type_id}/${this.case.id}/hearing/confirm`);
                    }, error => {
                        console.error('Unable to relist', error);
                    }
                );
        }
    }

}
