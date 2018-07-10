import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-list-for-hearing',
    templateUrl: './list-for-hearing.component.html',
    styleUrls: ['./list-for-hearing.component.scss']
})
export class ListForHearingComponent implements OnInit {

    // caseId: any;
    error = false;

    constructor() { }

    ngOnInit() {
    }

    public toggle() {
        this.error = !this.error;
    }

    submitHearing() {

    }
}
