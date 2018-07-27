import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DecisionService} from '../../../services/decision.service';

@Component({
    selector: 'app-decision-make',
    templateUrl: './decision-make.component.html',
    styleUrls: ['./decision-make.component.scss']
})
export class DecisionMakeComponent implements OnInit {

    caseId: string;
    case: any;
    decision: any;
    options = [];

    decisionAward: string;
    decisionState: string;
    decisionText: string;

    error = {
        server: false,
        decisionAward: false,
        decisionText: false
    };

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private decisionService: DecisionService
    ) { }

    ngOnInit() {
        this.route.parent.params.subscribe( params => this.caseId = params.case_id || null);
        this.case = this.route.parent.snapshot.data['caseData'];
        this.options = this.case.decision.options;

        this.decisionService.fetchDecision(this.caseId).subscribe(decision => {
            this.decision = decision;
            this.decisionAward = this.decision.decision_award;
            this.decisionState = this.decision.decision_state.state_name;
            this.decisionText = this.decision.decision_text;
        });

        this.route.fragment.subscribe(fragment => {
            const element = document.querySelector('#' + fragment);
            if (element) {
                element.scrollIntoView();
            }
        });
    }

    onDecisionButtonChange($event: string) {
        this.decisionAward = $event;
    }

    onDecisionNoteTextChange($event: string) {
        this.decisionText = $event;
    }

    submitDecisionDraft() {
        if (this.isValidDecisionAward() && this.isValidDecisionText()) {
            this.error.decisionAward = false;
            this.error.server = false;

            if (this.decision) {
                this.decisionService.updateDecisionDraft(this.caseId, this.decisionAward, this.decisionText)
                    .subscribe(
                        () => this.router.navigate(['../check-decision'], {relativeTo: this.route}),
                        error => this.error.server = true
                    );
            } else {
                this.decisionService.submitDecisionDraft(this.caseId, this.decisionAward, this.decisionText)
                    .subscribe(
                        () => this.router.navigate(['../check-decision'], {relativeTo: this.route}),
                        error => this.error.server = true
                    );
            }


        } else  {
            this.error.decisionAward = !this.isValidDecisionAward();
            this.error.decisionText = !this.isValidDecisionText();
        }
    }

    getValidId(id: string): string {
        return this.isValidOptionId(id) ? id : '';
    }

    isValidOptionId(id: string): boolean {
        return id === '' || this.options.some(obj => obj.id === id);
    }

    isValidDecisionText(): boolean {
        return !!this.decisionText;
    }

    isValidDecisionAward(): boolean {
        return this.decisionAward && this.getValidId(this.decisionAward) !== '';
    }

}
