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
    jurisdiction: string;
    caseType: string;
    questionId: any;
    question: any;
    submitted = false;
    roundNumber;

    constructor(
        private fb: FormBuilder,
        private questionService: QuestionService,
        private redirectionService: RedirectionService,
        private route: ActivatedRoute
    ) { }

    public noWhitespaceValidator(control: FormControl) {
      console.log('Validator works');
      const isWhitespace = (control.value || '').trim().length === 0;
      const isValid = !isWhitespace;
      return isValid ? null : { 'whitespace': true };
  }

    createForm(subject, question) {
        this.form = this.fb.group({
            subject: [subject, Validators.compose([Validators.required, this.noWhitespaceValidator])],
            question: [question, Validators.compose([Validators.required, this.noWhitespaceValidator])],
        });
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

        this.route.fragment.subscribe(fragment => {
            const element = document.querySelector('#' + fragment);
            if (element) {
                element.scrollIntoView();
            }
        });

        this.questionService
            .fetch(this.caseId, this.questionId)
            .subscribe((data: any) => {
                this.createForm(data.header, data.body);
                this.roundNumber = data.round;
            });
    }

    onSubmit() {

      console.log("Form Valid===>",this.form);

        if (this.form.valid) {
            const values = {
                ...this.form.value,
                rounds: this.roundNumber
            };
            this.questionService.update(this.caseId, this.questionId, values)
                .subscribe(res => {
                    this.redirectionService.redirect(`/case/${this.jurisdiction}/${this.caseType}/${this.caseId}/questions?updated=success`);
                }, err => console.log(err));
        }
        this.submitted = true;
    }
}
