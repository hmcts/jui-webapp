import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {QuestionService} from '../../../services/question.service';
import {RedirectionService} from '../../../../routing/redirection.service';

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

    questions: any[];
    private sentQuestions: any[];
    private draftQuestions: any[];

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        console.log(this.panelData);
        this.sentQuestions = this.panelData.sections[0].sections[1].fields[0].value; // What the hell?
        this.draftQuestions = this.panelData.sections[0].sections[0].fields[0].value; // What the hell?
        this.route.queryParams.subscribe(queryParams => {
            this.createdQuestion = queryParams['created'];
            this.deletedQuestion = queryParams['deleted'];
            this.updatedQuestion = queryParams['updated'];
        });
        this.route.parent.params.subscribe(params => {
            this.caseId = params['case_id'];
        });
    }
}
