import { Component, Input, OnInit } from '@angular/core';
import { QuestionService } from '../../../services/question.service';
import { RedirectionService } from '../../../../routing/redirection.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-create-question',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss']
})
export class CreateQuestionsComponent implements OnInit {
    @Input() caseId: any;
    model: any = {};

    constructor(private questionService: QuestionService, private redirectionService: RedirectionService, private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.parent.params.subscribe(params => {
            this.caseId = params['case_id'];
        });
    }

    onSubmit() {
        this.questionService.create(this.caseId, this.model).subscribe(res => {
            this.redirectionService.redirect(`/viewcase/${this.caseId}/questions?created=success`);
        }, err => console.log);
    }
}
