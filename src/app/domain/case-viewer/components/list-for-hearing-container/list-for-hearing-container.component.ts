import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-list-for-hearing-container',
    templateUrl: './list-for-hearing-container.component.html',
    styleUrls: ['./list-for-hearing-container.component.scss']
})
export class ListForHearingContainerComponent implements OnInit {

    @Input() caseId: any;
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
