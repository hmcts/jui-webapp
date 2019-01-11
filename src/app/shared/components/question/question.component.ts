import {Component, Input, AfterViewInit} from '@angular/core';

@Component({
    selector: 'app-question',
    templateUrl: './question.component.html'
})

export class QuestionComponent implements AfterViewInit  {
    @Input() rounds = [];
    draft: boolean;
    ngAfterViewInit () {
        this.checkForDraft();
    }

    checkForDraft() {
       setTimeout(() => {
            this.draft = this.draft = !this.rounds.length || !(this.rounds[0].state === 'question_drafted' || this.rounds[0].state === 'question_issue_pending');
       });
    }

}
