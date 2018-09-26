import {ChangeDetectorRef, Component, EventEmitter, OnInit} from '@angular/core';
import {DecisionService} from '../../../../domain/services/decision.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup} from "@angular/forms";
import {RedirectionService} from '../../../../routing/redirection.service';
import {JUIFormInterface} from "../../../../forms/components/form/form.component";

@Component({
    selector: 'app-check-decision',
    templateUrl: './check-decision.component.html',
    styleUrls: ['./check-decision.component.scss']
})
export class CheckDecisionComponent implements OnInit, JUIFormInterface {
    form: FormGroup;
    caseId: string;
    case: any;
    decision: any;
    options = [];

    decisionAward: string;
    decisionText: string;
    decisionState: string;

    error: boolean;

    eventEmitter: EventEmitter<any> = new EventEmitter();
    callback_options = {
        eventEmitter: this.eventEmitter
    };

    constructor(private fb: FormBuilder,
                private route: ActivatedRoute,
                private router: Router,
                private decisionService: DecisionService,
                private redirectionService: RedirectionService,
                private cdRef: ChangeDetectorRef) {
    }

    createForm() {
        this.form = this.fb.group({});
    }

    ngOnInit() {
        this.eventEmitter.subscribe(this.submitCallback.bind(this));

        this.case = this.route.parent.snapshot.data['caseData'];
        this.decision = this.route.parent.snapshot.data['decision'];
        this.options = this.case.decision.options;

        this.decisionService.fetch(this.case.id).subscribe(decision => {
            this.decision = decision;
            this.decisionAward = this.options
                .filter(option => option.id === this.decision.decision_award)
                .map(options => options.name)[0];
            this.decisionState = this.decision.decision_state.state_name;
            this.decisionText = this.decision.decision_text;
        });

        this.createForm();
    }

    ngAfterViewChecked() {
        this.cdRef.detectChanges();
    }

    submitCallback(values) {
        if (this.form.valid) {
            this.decisionService.issueDecision(this.case.id, this.decision)
                .subscribe(() => {
                    this.redirectionService.redirect(`/jurisdiction/${this.case.case_jurisdiction}/casetype/${this.case.case_type_id}/${this.case.id}/decision/confirm`);
                    }, error => {
                        this.error = true;
                        console.error('Something went wrong', error);
                    }
                );
        }
    }
}
