import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CaseService} from '../../../../domain/services/case.service';
import {DecisionService} from '../../../../domain/services/decision.service';
import {pages} from './decision-confirmation.model';

@Component({
    selector: 'app-decision-confirmation',
    templateUrl: './decision-confirmation.component.html'
})
export class DecisionConfirmationComponent implements OnInit {

    case: any;
    casenumber: string;
    caseId: string;
    pageId: string;
    display = {
        header:'',
        text:''
    };
    pages: pages = {
        tribunal: {
            header:'Tribunal\'s view submitted',
            text: 'Your tribunal\'s view will be sent to the appelant and DWP.'
        },
        finaldesision: {
            header:'Tribunal\'s decision submitted',
            text: 'Your tribunal\'s decision will be sent to the appelant and DWP.'
        }
    };

    constructor(
        private caseservice: CaseService,
        public decisionService: DecisionService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.activatedRoute.parent.data.subscribe(data => {
            this.case = data.caseData;
            this.caseId = this.case.id;
            this.pageId = this.activatedRoute.snapshot.url[0].path;
        });
        const jurId = this.case.case_jurisdiction;
        const typeId = this.case.case_type_id;
        this.decisionService.fetch(jurId, this.caseId, this.pageId, typeId).subscribe(decision => {
            if (decision.formValues.visitedPages) {
                const visitedPages = decision.formValues.visitedPages;
                if (visitedPages['final-decision'] === true) {
                    this.display = this.pages.finaldesision;
                }
                if (visitedPages['preliminary-advanced'] === true) {
                    this.display = this.pages.tribunal;
                }
            }
        });
        this.casenumber = this.activatedRoute.parent.snapshot.data['caseData'].details.fields[0].value || null;
        this.caseservice.newEvent('hideCasebar');
    }

}
