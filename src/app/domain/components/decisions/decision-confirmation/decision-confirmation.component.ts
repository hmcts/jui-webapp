import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-decision-confirmation',
    templateUrl: './decision-confirmation.component.html',
    styleUrls: ['./decision-confirmation.component.scss']
})
export class DecisionConfirmationComponent implements OnInit {

    caseId: string;

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.caseId = this.route.parent.snapshot.data['caseData'].details.fields[0].value || null;
    }

}
