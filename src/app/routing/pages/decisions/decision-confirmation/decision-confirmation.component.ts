import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-decision-confirmation',
    templateUrl: './decision-confirmation.component.html',
    styleUrls: ['./decision-confirmation.component.scss']
})
export class DecisionConfirmationComponent implements OnInit {

    case: any;

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.case = this.route.parent.snapshot.data['caseData'];
    }

}
