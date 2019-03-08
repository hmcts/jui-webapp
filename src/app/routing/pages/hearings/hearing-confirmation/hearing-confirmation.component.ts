import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ExchangeService} from '../../../../domain/services/exchange.service';

@Component({
    selector: 'app-list-for-hearing',
    templateUrl: './hearing-confirmation.component.html',
    styleUrls: ['./hearing-confirmation.component.scss']
})
export class HearingConfirmationComponent implements OnInit {

    caseId: string;

    constructor(private route: ActivatedRoute, private exchangeervice: ExchangeService,) { }

    ngOnInit() {
        this.caseId = this.route.parent.snapshot.data['caseData'].details.fields[0].value || null;
        this.exchangeervice.newEvent('hideCasebar');
    }

}
