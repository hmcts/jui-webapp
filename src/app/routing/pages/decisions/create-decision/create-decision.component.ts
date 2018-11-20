import {Component, OnInit, Inject, EventEmitter, ChangeDetectorRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DecisionService} from '../../../../domain/services/decision.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { RedirectionService } from '../../../redirection.service';

@Component({
    selector: 'app-decision-make',
    templateUrl: './create-decision.component.html',
    styleUrls: ['./create-decision.component.scss']
})
export class CreateDecisionComponent implements OnInit {
    form: FormGroup;
    case: any;
    decision: any;
    options = [];

    decisionAward = '';
    decisionState = '';
    decisionText = '';

    eventEmitter: EventEmitter<any> = new EventEmitter();
    callback_options = {
        eventEmitter: this.eventEmitter
    };

    error = {
        server: false,
        decision: false,
        notes: false
    };

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        public decisionService: DecisionService,
        public redirectionService: RedirectionService,
        private cdRef: ChangeDetectorRef
    ) { }

    createForm() {
        this.form = this.fb.group({
            decision: [this.decisionAward, Validators.required],
            notes: [this.decisionText, Validators.required],
        });
    }

    ngOnInit() {
        this.eventEmitter.subscribe(this.submitCallback.bind(this));

        this.case = this.route.parent.snapshot.data['caseData'];
        this.decision = this.route.parent.snapshot.data['decision'];
        this.options = this.case.decision.options;

        if (this.decision) {
            this.decisionAward = this.decision.decision_award;
            this.decisionState = this.decision.decision_state.state_name;
            this.decisionText = this.decision.decision_text;
        }
        this.createForm();
    }

    
    submitCallback(values) {
        if (this.form.valid) {
            if (this.decision) {
                this.decisionService.updateDecisionDraft(this.case.id, values.decision, values.notes)
                    .subscribe(
                        () => this.redirectionService.redirect(`/case/${this.case.case_jurisdiction}/${this.case.case_type_id}/${this.case.id}/decision/check`),
                        error => this.error.server = true
                    );
            } else {
                this.decisionService.submitDecisionDraft(this.case.id, values.decision, values.notes, null)
                    .subscribe(
                        () => this.redirectionService.redirect(`/case/${this.case.case_jurisdiction}/${this.case.case_type_id}/${this.case.id}/decision/check`),
                        error => this.error.server = true
                    );
            }


        } else {
            this.error.decision = !this.form.controls.decision.valid;
            this.error.notes = !this.form.controls.notes.valid;
        }
    }
}
