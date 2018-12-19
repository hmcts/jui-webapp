import {Component, Input, OnInit} from '@angular/core';

export interface TitleObject {
    html: string;
}

@Component({
    selector: 'app-hmcts-details-bar',
    templateUrl: './hmcts-details-bar.component.html',
    styleUrls: ['./hmcts-details-bar.component.scss']
})
export class HmctsDetailsBarComponent implements OnInit {

    @Input() reference: string;
    @Input() title: TitleObject;
    @Input() items: Array<any>;

    constructor() { }

    ngOnInit() {
    }

}
