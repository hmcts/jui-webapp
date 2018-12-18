import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DecisionService } from '../../../../domain/services/decision.service';

@Component({
    selector: 'app-root',
    templateUrl: './root.component.html'
})
export class DecisionRootComponent implements OnInit {

    case: any;

    constructor(
      private route: ActivatedRoute,
      private decisionService: DecisionService
    ) { }

    ngOnInit() {
      this.case = this.route.snapshot.data['caseData'];
      this.decisionService.issueDecision(this.case);
      console.log('Decision root componnet called', this.case);
    }
}
