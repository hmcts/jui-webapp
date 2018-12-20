import {ChangeDetectorRef, Component, EventEmitter, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {RedirectionService} from '../../../redirection.service';
import {HearingService} from '../../../../domain/services/hearing.service';

@Component({
    selector: 'app-check-list-for-hearing',
    templateUrl: './check-hearing.component.html',
    styleUrls: ['./check-hearing.component.scss']
})
export class CheckHearingComponent implements OnInit {
    form: FormGroup;
    case: any;

    relistReasonText: string;
    cohErrorMessage = 'Server Error';

    error: boolean;

    eventEmitter: EventEmitter<any> = new EventEmitter();
    callback_options = {
        eventEmitter: this.eventEmitter
    };

    constructor(private fb: FormBuilder,
                private route: ActivatedRoute,
                private hearingService: HearingService,
                private redirectionService: RedirectionService,
                private cdRef: ChangeDetectorRef) {}

    createForm() {
        this.form = this.fb.group({});
    }

    ngOnInit() {
        this.eventEmitter.subscribe(this.submitCallback.bind(this));
        this.hearingService.currentMessage.subscribe(message => this.relistReasonText = message);
        this.case = this.route.parent.snapshot.data['caseData'];

        this.createForm();
    }

    submitCallback(values) {
        if (this.form.valid) {
            this.hearingService.listForHearing(this.case.id, this.relistReasonText, 'issued')
                .subscribe(() => {
                        this.redirectionService.redirect(`/case/${this.case.case_jurisdiction}/${this.case.case_type_id}/${this.case.id}/hearing/confirm`);
                    }, error => {
                        this.error = true;
                        this.cohErrorMessage = error.error;
                        console.error('Unable to relist', error);
                    }
                );
        }
    }

}
