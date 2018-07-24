import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../../services/question.service';
import { RedirectionService } from '../../../../routing/redirection.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-edit-question',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss']
})
export class EditQuestionComponent implements OnInit {
    form = new FormGroup({
        subject: new FormControl(),
        question: new FormControl(),
    });
    caseId: any;
    questionId: any;
    question: any;

    constructor(private fb: FormBuilder, private questionService: QuestionService, private redirectionService: RedirectionService, private route: ActivatedRoute) {
    }

    createForm(subject, question) {
        this.form = this.fb.group({
            subject: [subject, Validators.required],
            question: [question, Validators.required],
        });
    }

    ngOnInit(): void {
        this.route.parent.params.subscribe(params => {
            this.caseId = params['case_id'];
        });

        this.route.params.subscribe(params => {
            this.questionId = params['question_id'];
        });

        this.questionService
            .fetch(this.caseId, this.questionId)
            .subscribe((data: any) => this.createForm(data.header, data.body));
    }

    onSubmit() {
        if (this.form.valid) {
            this.questionService.update(this.caseId, this.questionId, this.form.value)
                .subscribe(res => {
                    this.redirectionService.redirect(`/viewcase/${this.caseId}/questions?updated=success`);
                }, err => console.log);
        }
    }
}
