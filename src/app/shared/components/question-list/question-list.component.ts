import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-question-list',
    templateUrl: './question-list.component.html',
    styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent {

    @Input() questions = [];

    constructor() { }

}
