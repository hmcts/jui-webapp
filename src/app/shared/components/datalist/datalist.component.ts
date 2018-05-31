import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-datalist',
    templateUrl: './datalist.component.html',
    styleUrls: ['./datalist.component.scss']
})
export class DatalistComponent implements OnInit {

    @Input()
    datalist;

    @Input()
    title

    constructor() {
    }

    ngOnInit() {
    }

}
