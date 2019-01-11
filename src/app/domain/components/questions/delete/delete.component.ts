import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../../services/question.service';
import { RedirectionService } from '../../../../routing/redirection.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-delete-question',
    templateUrl: './delete.component.html',
    styleUrls: ['./delete.component.scss']
})
export class DeleteQuestionComponent implements OnInit {
    caseId: any;
    jurisdiction: string;
    caseType: string;
    questionId: any;

    constructor(private questionService: QuestionService, private redirectionService: RedirectionService, private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.parent.params.subscribe(params => {
            this.caseId = params['case_id'];
            this.jurisdiction = params['jur'];
            this.caseType = params['casetype'];
        });
        this.route.params.subscribe(params => {
            this.questionId = params['question_id'];
        });
    }

    remove() {
        this.questionService.remove(this.caseId, this.questionId).subscribe(res => {
            this.redirectionService.redirect(`/case/${this.jurisdiction}/${this.caseType}/${this.caseId}/questions?deleted=success`);
        }, (err:any) => {});
    }
}
