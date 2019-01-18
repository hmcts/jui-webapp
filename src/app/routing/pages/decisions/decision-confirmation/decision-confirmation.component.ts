import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-decision-confirmation',
    templateUrl: './decision-confirmation.component.html'
})
export class DecisionConfirmationComponent implements OnInit {

    case: string;

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.case = this.route.parent.snapshot.data['caseData'].details.fields[0].value || null;
    }

}
