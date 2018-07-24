import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-view-question',
    templateUrl: './view.component.html',
    styleUrls: ['./view.component.scss']
})
export class ViewQuestionComponent implements OnInit {
    question: any;
    caseId: string;
    questionId: string;

    constructor(public router: Router, private questionService: QuestionService, private route: ActivatedRoute) {
        this.route.parent.params.subscribe(params => {
            this.caseId = params['case_id'];
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
