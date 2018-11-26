import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LinkItem, PageDateQuestion, QuestionValue} from '../../../models/section_fields';

@Component({
    selector: 'app-questions-panel',
    templateUrl: './questions-panel.component.html',
    styleUrls: ['./questions-panel.component.scss']
})
export class QuestionsPanelComponent implements OnInit {
    @Input() panelData: PageDateQuestion;
    createdQuestion: string;
    updatedQuestion: string;
    deletedQuestion: string;
    sentQuestions: string;
    actionPrimaryButton: LinkItem = {href: '../decision/create', text: 'Make decision'};
    actionSecondaryButton: LinkItem = {href: '../hearing/list', text: 'List for hearing'};
    constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.queryParams.subscribe(queryParams => {
            this.createdQuestion = queryParams['created'];
            this.deletedQuestion = queryParams['deleted'];
            this.updatedQuestion = queryParams['updated'];
            this.sentQuestions = queryParams['sent'];
        });
    }
}
