import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CaseService} from '../../../../domain/services/case.service';

@Component({
    selector: 'app-decision-confirmation',
    templateUrl: './decision-confirmation.component.html'
})
export class DecisionConfirmationComponent implements OnInit {

    case: string;

    constructor(private route: ActivatedRoute, private caseservice: CaseService) { }

    ngOnInit() {
        this.case = this.route.parent.snapshot.data['caseData'].details.fields[0].value || null;
        this.caseservice.newEvent('hideCasebar');
    }

}
