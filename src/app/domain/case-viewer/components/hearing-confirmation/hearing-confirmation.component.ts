import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-hearing-confirmation',
    templateUrl: './hearing-confirmation.component.html',
    styleUrls: ['./hearing-confirmation.component.scss']
})
export class HearingConfirmationComponent implements OnInit {

    caseId: string;


    constructor() { }

    ngOnInit() {
    }

}
