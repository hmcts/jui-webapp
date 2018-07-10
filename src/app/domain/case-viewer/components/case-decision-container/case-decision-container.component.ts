import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-case-decision-container',
    templateUrl: './case-decision-container.component.html',
    styleUrls: ['./case-decision-container.component.scss']
})
export class CaseDecisionContainerComponent implements OnInit {

    @Input() caseId: any;
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
