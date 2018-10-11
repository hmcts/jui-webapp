import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit} from '@angular/core';
import {DecisionService} from '../../../../domain/services/decision.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormsService} from '../../../../shared/services/forms.service';
import {FormGroup} from '@angular/forms';

@Component({
    selector: 'app-check-decision',
    templateUrl: './check-decision.component.html',
    styleUrls: ['./check-decision.component.scss']
})
export class CheckDecisionComponent implements OnInit {
    form: FormGroup;
    options: any;
    decision: any;
    request: any;
    pageValues: any = null;
    case: any;

    @Input() pageitems;
    constructor( private activatedRoute: ActivatedRoute,
                 private router: Router,
                 private decisionService: DecisionService,
                 private formsService: FormsService) {}
    createForm(pageitems, pageValues) {
        this.form = new FormGroup(this.formsService.defineformControls(pageitems, pageValues));
    }
    ngOnInit() {
        this.activatedRoute.parent.data.subscribe(data => {
            this.case = data.caseData;
        });
        const caseId = this.case.id;
        const pageId = 'check';
        const jurId = 'fr';
        this.decisionService.fetch(jurId, caseId, pageId).subscribe(decision => {
            this.decision = decision;
            this.pageitems = this.decision.meta;
            this.pageValues = this.decision.formValues;

            console.log("pageitems", this.pageitems);
            console.log("pageValues", this.pageValues);
            this.createForm(this.pageitems, this.pageValues) ;
        });
    }
}
