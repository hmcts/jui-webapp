import {ChangeDetectorRef, Component, EventEmitter, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RedirectionService} from '../../../redirection.service';
import {HearingService} from '../../../../domain/services/hearing.service';
import {CaseDataOther} from '../../modules/case';
import { FormsService } from '../../../../shared/services/forms.service';
import { ValidationService } from '../../../../shared/services/validation.service';

@Component({
    selector: 'app-list-for-hearing',
    templateUrl: './create-hearing.component.html',
    styleUrls: ['./create-hearing.component.scss']
})
export class CreateHearingComponent implements OnInit {
    form: FormGroup;
    case: CaseDataOther;

    hearing: any;
    pageValues: any;
    pageitems: any;
    useValidation = false;
    request: any;

    constructor(private formsService: FormsService,
                private validationService: ValidationService,
                private router: Router,
                private route: ActivatedRoute,
                private hearingService: HearingService,
                public redirectionService: RedirectionService) {
    }


    createForm(pageitems, pageValues) {
        this.form = new FormGroup(this.formsService.defineformControls(pageitems, pageValues));
        const formGroupValidators = this.validationService.createFormGroupValidators(this.form, pageitems.formGroupValidators);
        this.form.setValidators(formGroupValidators);
    }

    ngOnInit() {
        this.case = this.route.parent.snapshot.data['caseData'];

        this.hearingService.fetch('DIVORCE', this.case.id, 'hearing-details', 'FinancialRemedyMVP2').subscribe(hearing => {
            this.hearing = hearing;
            this.pageitems = this.hearing.meta;
            this.pageValues = this.hearing.formValues;
            if (this.hearing.formValues.visitedPages === undefined) {
                this.hearing.formValues.visitedPages = {};
                this.hearing.formValues.visitedPages['create'] =  true ;
            } else {
                this.hearing.formValues.visitedPages['list'] = true;
            }
            this.createForm(this.pageitems, this.pageValues);
        });

    }

    onSubmit() {
        if (this.form.value.createButton) {
            const event = this.form.value.createButton.toLowerCase();
            delete this.form.value.createButton;
            this.request = { formValues: this.form.value, event: event };
            this.request.formValues.visitedPages = this.pageValues.visitedPages;
            if (this.form.invalid) {
                this.useValidation = true;
                return;
            } else {
                this.hearingService.submitHearingDraft(
                    'DIVORCE',
                    this.case.id,
                    this.pageitems.name,
                    'FinancialRemedyMVP2',
                    this.request).subscribe(decision => {
                    this.router.navigate(['../check'], {relativeTo: this.route});
                });
            }
        }
    }

}
