import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-question',
    templateUrl: './question.component.html',
    styleUrls: ['./question.component.scss']
})
export class QuestionComponent {

    @Input() rounds = [];

    constructor() { }

}
