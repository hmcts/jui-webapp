import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../../services/question.service';
import { RedirectionService } from '../../../../routing/redirection.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-create-question',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss']
})
export class CreateQuestionsComponent implements OnInit {
    form = new FormGroup({
        subject: new FormControl(),
        question: new FormControl(),
    });
    caseId: any;
    submitted = false;

    constructor(private fb: FormBuilder, private questionService: QuestionService, private redirectionService: RedirectionService, private route: ActivatedRoute) {
    }

    createForm() {
        this.form = this.fb.group({
            subject: ['', Validators.required],
            question: ['', Validators.required],
        });
    }

    ngOnInit(): void {
        this.route.parent.params.subscribe(params => {
            this.caseId = params['case_id'];
        });

        this.createForm();
    }

    onSubmit() {
        if (this.form.valid) {
            this.questionService.create(this.caseId, this.form.value)
                .subscribe(res => {
                    this.redirectionService.redirect(`/viewcase/${this.caseId}/questions?created=success`);
                }, err => console.log);
        }
        this.submitted = true;
    }
}
