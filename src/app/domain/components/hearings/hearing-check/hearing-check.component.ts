import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-hearing-check',
    templateUrl: './hearing-check.component.html',
    styleUrls: ['./hearing-check.component.scss']
})
export class HearingCheckComponent implements OnInit {

    answer: string;


    constructor() { }

    ngOnInit() {
    }

}
