import {Component, OnInit, OnDestroy} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {CaseDataOther} from '../../modules/case';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-list-for-hearing',
    templateUrl: './root.component.html'
})
export class HearingRootComponent implements OnInit, OnDestroy {

    case: CaseDataOther;
    isConfirmationPage: boolean;
    routeSubscription: Subscription

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.case = this.route.snapshot.data['caseData'];
        this.routeSubscription = this.route.firstChild.url.subscribe(url => {
            this.isConfirmationPage = url[0].path === 'confirm';
        })
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }
}
