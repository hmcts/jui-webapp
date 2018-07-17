import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-decision-make',
    templateUrl: './decision-make.component.html',
    styleUrls: ['./decision-make.component.scss']
})
export class DecisionMakeComponent implements OnInit {

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
