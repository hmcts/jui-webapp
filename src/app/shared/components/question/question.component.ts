import {Component, Input, AfterViewInit} from '@angular/core';

@Component({
    selector: 'app-question',
    templateUrl: './question.component.html',
    styleUrls: ['./question.component.scss']
})

export class QuestionComponent implements AfterViewInit  {
    @Input() rounds = [];
    draft: boolean;
    ngAfterViewInit () {
        this.checkForDraft();
    }

    checkForDraft() {
       setTimeout(() => {
           console.log(this.rounds);
            if (!this.rounds.length || this.rounds[this.rounds.length - 1].state !== 'question_drafted') {
                this.draft = true;
            } else {
                this.draft = false;
            }
       });
    }

}
