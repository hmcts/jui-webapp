import {ChangeDetectorRef, Component, EventEmitter, OnInit} from '@angular/core';
import {DecisionService} from '../../../../domain/services/decision.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-check-decision',
    templateUrl: './check-decision.component.html',
    styleUrls: ['./check-decision.component.scss']
})
export class CheckDecisionComponent implements OnInit {
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

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private decisionService: DecisionService,
        private cdRef : ChangeDetectorRef
    ) { }

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

        console.log('woop!!!!', values);
        console.log('is it valid? - ', this.form.valid);
        if (this.form.valid) {

        }
        // else {
        //     this.error.decision = !this.form.controls.decision.valid;
        //     this.error.notes = !this.form.controls.notes.valid;
        // }
    }

    // submitDecision() {
    //     if (this.decision) {
    //         this.error = false;
    //         this.decisionService.issueDecision(this.caseId, this.decision)
    //             .subscribe(() => {
    //                     this.router.navigate(['../decision-confirmation'], {relativeTo: this.route});
    //                 }, error => {
    //                     this.error = true;
    //                     console.error('Something went wrong', error);
    //                 }
    //             );
    //     } else {
    //         this.error = true;
    //     }
    // }



}
