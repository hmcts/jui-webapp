import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-question-list',
    templateUrl: './question-list.component.html'
})
export class QuestionListComponent {

    @Input() questions = [];

    constructor() { }

}
