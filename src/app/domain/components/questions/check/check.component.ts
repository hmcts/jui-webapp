import { Component, Input } from '@angular/core';
import { QuestionService } from '../../../services/question.service';
import { RedirectionService } from '../../../../routing/redirection.service';

@Component({
    selector: 'app-check-question',
    templateUrl: './check.component.html',
    styleUrls: ['./check.component.scss']
})
export class CheckQuestionsComponent {
    @Input() caseId: any;
    model: any = {};

    constructor(private questionService: QuestionService, private redirectionService: RedirectionService) {
    }

    onSubmit() {
        this.questionService.save(this.caseId, this.model);
        this.redirectionService.redirect(`/viewcase/${this.caseId}/questions`);
    }
}
