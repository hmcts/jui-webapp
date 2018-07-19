import { Component, Input, OnInit  } from '@angular/core';
import { QuestionService } from '../../../services/question.service';
import { RedirectionService } from '../../../../routing/redirection.service';
import { ActivatedRoute } from '@angular/router';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-check-question',
    templateUrl: './check.component.html',
    styleUrls: ['./check.component.scss']
})
export class CheckQuestionsComponent implements OnInit {
    caseId: string;
    questionId: string;
    questions$: Observable<any[]>;

    constructor(private questionService: QuestionService,
                private redirectionService: RedirectionService,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.parent.params.subscribe(params => {
            this.caseId = params['case_id'];
            this.questions$ = this.questionService.fetchAll(this.caseId);
        });
    }

    onSubmit() {
        this.questionService.save(this.caseId, this.questionId);
        this.redirectionService.redirect(`/viewcase/${this.caseId}/questions?sent=success`);
    }
}
