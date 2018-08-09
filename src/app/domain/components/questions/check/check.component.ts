import { Component, Input, OnInit  } from '@angular/core';
import { QuestionService } from '../../../services/question.service';
import { RedirectionService } from '../../../../routing/redirection.service';
import { ActivatedRoute } from '@angular/router';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

@Component({
    selector: 'app-check-question',
    templateUrl: './check.component.html',
    styleUrls: ['./check.component.scss']
})
export class CheckQuestionsComponent implements OnInit {
    caseId: string;
    jurisdiction: string;
    caseType: string;

    questions$: Observable<any[]>;

    constructor(private questionService: QuestionService,
                private redirectionService: RedirectionService,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.parent.params.subscribe(params => {
            this.caseId = params['case_id'];
            this.jurisdiction = params['jur'];
            this.caseType = params['casetype'];
            this.questions$ = this.questionService.fetchAll(this.caseId)
                .map(questions => {
                    return questions.filter(question => question.state === 'question_drafted');
                });
        });
    }

    onSubmit() {
        this.questionService.sendQuestions(this.caseId, 1).subscribe(res => {
            this.redirectionService.redirect(`/jurisdiction/${this.jurisdiction}/casetype/${this.caseType}/viewcase/${this.caseId}/questions?sent=success`);
        }, () => {
            this.redirectionService.redirect(`/jurisdiction/${this.jurisdiction}/casetype/${this.caseType}/viewcase/${this.caseId}/questions?sent=failure`);
        });
    }
}
