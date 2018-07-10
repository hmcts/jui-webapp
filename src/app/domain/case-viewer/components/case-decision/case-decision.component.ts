import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-case-decision',
    templateUrl: './case-decision.component.html',
    styleUrls: ['./case-decision.component.scss']
})
export class CaseDecisionComponent implements OnInit {

    // caseId: any;
    error = false;

    constructor() { }

    ngOnInit() {
    }

    public toggle() {
        this.error = !this.error;
    }

    submitDecision() {

    }
}
