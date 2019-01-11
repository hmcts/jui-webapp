import {Component, Input} from '@angular/core';
import {LinkItem} from '../../../domain/models/section_fields';

@Component({
    selector: 'app-case-actions',
    templateUrl: './case-actions.component.html'
})
export class CaseActionsComponent {

    @Input() header: string;
    @Input() actionPrimaryButton: LinkItem;
    @Input() actionSecondaryButton: LinkItem;
    constructor() { }
}
