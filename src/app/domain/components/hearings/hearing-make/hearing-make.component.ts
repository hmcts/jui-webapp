import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-list-for-hearing',
    templateUrl: './hearing-make.component.html',
    styleUrls: ['./hearing-make.component.scss']
})
export class HearingMakeComponent implements OnInit {

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
