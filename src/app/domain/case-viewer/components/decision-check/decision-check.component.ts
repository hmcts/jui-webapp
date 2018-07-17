import { Component, OnInit } from '@angular/core';
import {DecisionService} from '../../../services/decision.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-check-decision',
    templateUrl: './decision-check.component.html',
    styleUrls: ['./decision-check.component.scss']
})
export class DecisionCheckComponent implements OnInit {

    case: any;
    decision: any;
    error: boolean;
    caseId: string;
    options: { id: string; name: string }[];

    decision_text: string;
    decision_award: string;
    decision_state: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private decisionService: DecisionService
    ) { }

    ngOnInit() {
        this.route.parent.params.subscribe( params => this.caseId = params.case_id);
        this.case = this.route.parent.snapshot.data['caseData'];
        this.options = this.case.decision.options;
        this.decisionService.fetchDecision(this.caseId).subscribe(decision => {
            this.decision = decision;
            this.decision_state = this.decision.decision_state.state_name;
            this.decision_text = this.decision.decision_text;
            this.decision_award = this.options
                .filter(option => option.id === this.decision.decision_award)
                .map(options => options.name)[0];
        });
    }

    submitDecision() {
        if (this.decision) {
            this.error = false;
            this.decisionService.issueDecision(this.caseId, this.decision)
                .subscribe(() => {
                    this.router.navigate(['../decision-confirmation'], {relativeTo: this.route});
                }, error => {
                    this.error = true;
                    console.error('Something went wrong', error);
                }
            );
        } else {
            this.error = true;
        }
    }



}
