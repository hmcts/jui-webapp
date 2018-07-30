import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-decision-make',
    templateUrl: './root.component.html'
})
export class HearingRootComponent implements OnInit {

    case: any;

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.case = this.route.snapshot.data['caseData'];
    }
}
