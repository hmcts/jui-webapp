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
    award: string;
    text: string;
    error = {
        server: false,
        radiobutton: false
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
            console.dir(this.decision);
            this.text = this.decision.decision_text;
            this.award = this.decision.decision_award;
        });
    }

    onDecisionButtonChange($event: string) {
        this.award = $event;
        console.log(`PARENT TEXT ${this.award}`);
    }

    onDecisionNoteTextChange($event: string) {
        this.text = $event;
        console.log(`PARENT TEXT ${this.text}`);
    }

    submitDecisionDraft() {
        if (this.award && this.getValidId(this.award) !== '') {
            this.error.radiobutton = false;
            this.error.server = false;

            if (this.decision) {
                this.decisionService.updateDecisionDraft(this.caseId, this.award, this.text).subscribe(() => {
                        this.router.navigate(['../check-decision'], {relativeTo: this.route});
                    }, error => {
                        this.error.server = true;
                        console.error('Somthing went wrong', error);
                    }
                );
            } else {
                this.decisionService.submitDecisionDraft(this.caseId, this.award, this.text).subscribe(() => {
                        this.router.navigate(['../check-decision'], {relativeTo: this.route});
                    }, error => {
                        this.error.server = true;
                        console.error('Somthing went wrong', error);
                    }
                );
            }


        } else  {
            this.error.radiobutton = true;
        }
    }

    getValidId(id: string): string {
        return this.isValidId(id) ? id : '';
    }

    isValidId(id: string): boolean {
        return id === '' || this.options.some(obj => {
            return obj.id === id;
        });
    }


}
