import {Component, OnInit, ChangeDetectorRef, EventEmitter} from '@angular/core';
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
    form: FormGroup;
    caseId: string;
    jurisdiction: string;
    caseType: string;

    eventEmitter: EventEmitter<any> = new EventEmitter();
    callback_options = {
        eventEmitter: this.eventEmitter
    };

    error = {
        server: false,
        subject: false,
        question: false
    };
    roundNumber;

    constructor(
        private fb: FormBuilder,
        private questionService: QuestionService,
        private redirectionService: RedirectionService,
        private route: ActivatedRoute,
        private cdRef: ChangeDetectorRef) {

    }

    createForm() {
        this.form = this.fb.group({
            subject: ['', Validators.required],
            question: ['', Validators.required],
        });
    }

    ngAfterViewChecked() {
        this.cdRef.detectChanges();
    }

    ngOnInit(): void {
        this.eventEmitter.subscribe(this.submitCallback.bind(this));
        this.route.parent.params.subscribe(params => {
            this.caseId = params['case_id'];
            this.jurisdiction = params['jur'];
            this.caseType = params['casetype'];
        });
        this.route.params.subscribe(params => {
            this.roundNumber = params['round'];
        });
        this.createForm();
    }

    submitCallback(values) {
        values.subject && this.form.controls.subject.setValue(values.subject.trim());
        values.question && this.form.controls.question.setValue(values.question.trim());
        values.rounds = this.roundNumber;

        if (this.form.valid) {
            this.questionService.create(this.caseId, values)
                .subscribe(res => {
                    this.redirectionService.redirect(`/case/${this.jurisdiction}/${this.caseType}/${this.caseId}/questions?created=success`);
                }, err => console.log);
        }
        else {
            this.error.subject = !this.form.controls.subject.valid;
            this.error.question = !this.form.controls.question.valid;
        }
    }
}
