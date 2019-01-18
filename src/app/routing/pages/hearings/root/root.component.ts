import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {CaseDataOther} from '../../modules/case';

@Component({
    selector: 'app-list-for-hearing',
    templateUrl: './root.component.html'
})
export class HearingRootComponent implements OnInit {

    case: CaseDataOther;
    isConfirmationPage: boolean;

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.case = this.route.snapshot.data['caseData'];
        this.route.firstChild.url.subscribe(url => {
            this.isConfirmationPage = url[0].path === 'confirm';
        })
    }
}
