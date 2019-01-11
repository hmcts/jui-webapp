import {Component, Input, OnInit} from '@angular/core';
import 'rxjs/add/operator/filter';
import {PageDateCaseBar} from '../../models/section_fields';

@Component({
        selector: 'app-casebar',
    templateUrl: './casebar.component.html',
    styleUrls: ['./casebar.component.scss']
})
export class CaseBarComponent {

    @Input() case: PageDateCaseBar;

    constructor() {}

}
