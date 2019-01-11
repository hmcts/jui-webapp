import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../../services/question.service';
import { RedirectionService } from '../../../../routing/redirection.service';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-check-question',
    templateUrl: './check.component.html',
    styleUrls: ['./check.component.scss']
})
export class CheckQuestionsComponent implements OnInit {
    caseId: string;
    jurisdiction: string;
    caseType: string;
    asyncResolved: boolean = true;
    asynctext: string = 'Send questions'

    questions$: Observable<any[]>;
    roundNumber: number;

    constructor(private questionService: QuestionService,
        private redirectionService: RedirectionService,
        private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.parent.params.subscribe(parentParams => {
            this.caseId = parentParams['case_id'];
            this.jurisdiction = parentParams['jur'];
            this.caseType = parentParams['casetype'];

            this.route.params.subscribe(params => {
                this.roundNumber = params['round'];
                this.questions$ = this.questionService
                    .fetchRound(this.caseId, this.roundNumber)
                    .map(x => { console.dir(x); return x; })
                    .map(r => r.question_references ? r.question_references.filter(q => q.current_question_state.state_name === 'question_drafted') : []);
            });
        });

    }

    onSubmit() {
        this.asyncResolved = false;
        this.asynctext = 'Sending...';
        this.questionService.sendQuestions(this.caseId, this.roundNumber).subscribe(res => {
            // this.asyncResolved = true;
            //this.asynctext = 'Send questions';
            this.redirectionService.redirect(`/case/${this.jurisdiction}/${this.caseType}/${this.caseId}/questions?sent=success`);
        }, () => {
            this.asyncResolved = true;
            this.asynctext = 'Send questions';
            this.redirectionService.redirect(`/case/${this.jurisdiction}/${this.caseType}/${this.caseId}/questions?sent=failure`);
        });
    }
}
