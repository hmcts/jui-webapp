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
    rounds$: Observable<any[]>;

    constructor(private questionService: QuestionService,
                private redirectionService: RedirectionService,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.parent.params.subscribe(params => {
            this.caseId = params['case_id'];
            this.rounds$ = this.questionService.fetchAll(this.caseId)
                .map(rounds => {
                    return rounds.filter(round => round).map(round => {
                        return round.filter(q => q.state === 'question_drafted');
                    });
                });
        });
    }

    onSubmit() {
        this.questionService.sendQuestions(this.caseId, 1).subscribe(res => {
            this.redirectionService.redirect(`/viewcase/${this.caseId}/questions?sent=success`);
        });
    }
}
