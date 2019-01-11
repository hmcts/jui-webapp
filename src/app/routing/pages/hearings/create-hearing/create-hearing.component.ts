import {ChangeDetectorRef, Component, EventEmitter, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RedirectionService} from '../../../redirection.service';
import {HearingService} from '../../../../domain/services/hearing.service';
import {CaseDataOther, CaseSnapShootRoot} from '../../modules/case';

@Component({
    selector: 'app-list-for-hearing',
    templateUrl: './create-hearing.component.html',
    styleUrls: ['./create-hearing.component.scss']
})
export class CreateHearingComponent implements OnInit {
    form: FormGroup;
    case: CaseDataOther;

    relistReasonText = '';

    eventEmitter: EventEmitter<any> = new EventEmitter();
    callback_options = {
        eventEmitter: this.eventEmitter
    };

    error = {
        server: false,
        notes: false
    };

    constructor(private fb: FormBuilder,
                private router: Router,
                private route: ActivatedRoute,
                private hearingService: HearingService,
                public redirectionService: RedirectionService,
                private cdRef: ChangeDetectorRef) {
    }

    createForm() {
        this.form = this.fb.group({
            notes: [this.relistReasonText, Validators.required],
        });
    }

    ngOnInit() {
        this.hearingService.currentMessage.subscribe(message => this.relistReasonText = message);
        this.eventEmitter.subscribe(this.submitCallback.bind(this));
        this.case = this.route.parent.snapshot.data['caseData'];

        this.createForm();

        this.getDraftedHearingReason(this.case.id);
    }

    /**
     * getDraftedHearingState
     *
     * We store the reason for re-listing within CoH therefore we need to retrieve the reason when we display
     * this page to the user.
     *
     * If we get an error response, for now we will let the user pass through to the continue page.
     *
     * @param caseId - 1545063650329442
     */
    getDraftedHearingReason(caseId) {
        this.hearingService.getHearing(caseId)
            .subscribe((response) => {
                    this.relistReasonText = response.online_hearings[0].relisting.reason;
                }, error => {
                }
            );
    }

    /**
     * saveDraftedHearingReason
     *
     * We store the reason for re-listing within CoH, in a 'drafted' state.
     *
     * @param caseId - 1545063650329442
     * @param relistReason - 'user freetext'
     */
    saveDraftedHearingReason(caseId, relistReason) {
        this.hearingService.listForHearing(caseId, relistReason, 'drafted')
            .subscribe((response) => {
                }, error => {
                }
            );
    }

    submitCallback(values) {
        if (this.form.valid) {
            this.saveDraftedHearingReason(this.case.id, values.notes);
            this.hearingService.changeMessage(values.notes);
            this.router.navigate(['../check'], {relativeTo: this.route});
        } else {
            this.error.notes = !this.form.controls.notes.valid;
        }
    }
}
