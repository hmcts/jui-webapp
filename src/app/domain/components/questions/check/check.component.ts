import { Component, Input, OnInit  } from '@angular/core';
import { QuestionService } from '../../../services/question.service';
import { RedirectionService } from '../../../../routing/redirection.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-check-question',
    templateUrl: './check.component.html',
    styleUrls: ['./check.component.scss']
})
export class CheckQuestionsComponent implements OnInit {
    caseId: string;
    questionId: string;

    constructor(private questionService: QuestionService, private redirectionService: RedirectionService, private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.caseId = params['case_id'];
            this.caseId = params['question_id'];
        });
    }

    onSubmit() {
        this.questionService.save(this.caseId, this.questionId);
        this.redirectionService.redirect(`/viewcase/${this.caseId}/questions?sent=success`);
    }
}
