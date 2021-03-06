import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../services/question.service';

@Component({
    selector: 'app-view-question',
    templateUrl: './view.component.html',
    styleUrls: ['./view.component.scss']
})
export class ViewQuestionComponent implements OnInit {
    question: any;
    caseId: string;
    jurisdiction: string;
    caseType: string;
    questionId: string;

    constructor( private route: ActivatedRoute, private questionService: QuestionService ) {
        this.route.parent.params.subscribe(params => {
            this.caseId = params['case_id'];
            this.jurisdiction = params['jur'];
            this.caseType = params['casetype'];
        });

        this.route.params.subscribe(params => {
            this.questionId = params['question_id'];
        });
    }

    ngOnInit() {
        this.questionService
            .fetch(this.caseId, this.questionId)
            .subscribe(data => { this.question = data; });
    }
}
