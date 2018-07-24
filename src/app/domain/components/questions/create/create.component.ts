import {Component, OnInit, Inject, EventEmitter} from '@angular/core';
import { QuestionService } from '../../../services/question.service';
import { RedirectionService } from '../../../../routing/redirection.service';
import { ActivatedRoute } from '@angular/router';
// import { REQUEST, RESPONSE } from '@nguniversal/express-engine/tokens';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {DOCUMENT} from '@angular/common';

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
    model: any = {};



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
        this.eventEmitter.subscribe(this.bob.bind(this));
        this.route.parent.params.subscribe(params => {
            this.caseId = params['case_id'];
        });

        this.createForm();

    }

    bob(values) {
        console.log('holy shit!!!!', values)
        // if (this.form.valid) {

            this.questionService.create(this.caseId, values)
                .subscribe(res => {
                    this.redirectionService.redirect(`/viewcase/${this.caseId}/questions?created=success`);
                }, err => console.log);
        // }
    }
}
