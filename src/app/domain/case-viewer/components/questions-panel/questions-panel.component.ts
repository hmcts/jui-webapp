import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-questions-panel',
    templateUrl: './questions-panel.component.html',
    styleUrls: ['./questions-panel.component.scss']
})
export class QuestionsPanelComponent implements OnInit {
    @Input() panelData;
    caseId;
    createdQuestion: string;
    updatedQuestion: string;
    deletedQuestion: string;
    sentQuestions: string;

    rounds = [];

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.rounds = this.panelData.fields[0].value;
        this.route.queryParams.subscribe(queryParams => {
            this.createdQuestion = queryParams['created'];
            this.deletedQuestion = queryParams['deleted'];
            this.updatedQuestion = queryParams['updated'];
            this.sentQuestions = queryParams['sent'];
        });
        this.route.parent.params.subscribe(params => {
            this.caseId = params['case_id'];
        });
    }
}
