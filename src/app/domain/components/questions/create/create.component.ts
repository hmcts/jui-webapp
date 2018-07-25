import {Component, OnInit, Inject, EventEmitter} from '@angular/core';
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
    eventEmitter: EventEmitter<any> = new EventEmitter();
    callback_options = {
        eventEmitter: this.eventEmitter
    };

    constructor(private fb: FormBuilder, private questionService: QuestionService, private redirectionService: RedirectionService, private route: ActivatedRoute) {

    }

    createForm() {
        this.form = this.fb.group({
            subject: ['', Validators.required],
            question: ['', Validators.required],
        });
    }

    ngOnInit(): void {
        this.eventEmitter.subscribe(this.submitCallback.bind(this));
        this.route.parent.params.subscribe(params => {
            this.caseId = params['case_id'];
        });
        this.createForm();
    }

    submitCallback(values) {
        console.log('woop!!!!', values);
        console.log('is it valid? - ', this.form.valid);
        if (this.form.valid) {
            this.questionService.create(this.caseId, values)
                .subscribe(res => {
                    this.redirectionService.redirect(`/viewcase/${this.caseId}/questions?created=success`);
                }, err => console.log);
        }
    }
}
