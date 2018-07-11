import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
    selector: 'app-case-details-bar',
    templateUrl: './case-details-bar.component.html',
    styleUrls: ['./case-details-bar.component.scss']
})
export class CaseDetailsBarComponent implements OnChanges {

    @Input() case: any;
    targetSection: any;

    constructor() { }

    ngOnChanges(changes) {
        if (this.case && this.case.details) {
                this.targetSection = this.case.details;
        }
    }

}
