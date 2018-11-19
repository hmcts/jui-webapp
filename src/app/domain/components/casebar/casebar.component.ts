import {Component, Input, OnInit} from '@angular/core';
import 'rxjs/add/operator/filter';
import {CaseDataOther} from '../../../routing/pages/modules/case';

@Component({
        selector: 'app-casebar',
    templateUrl: './casebar.component.html',
    styleUrls: ['./casebar.component.scss']
})
export class CaseBarComponent {

    @Input() case: CaseDataOther;

    constructor() {}

}
