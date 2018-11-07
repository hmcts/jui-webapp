import {Component, Input} from '@angular/core';
import {SubNavigation} from '../../models/nav';

@Component({
    selector: 'app-hmcts-sub-navigation',
    templateUrl: './hmcts-sub-navigation.component.html',
    styleUrls: ['./hmcts-sub-navigation.component.scss']
})
export class HmctsSubNavigationComponent {

    @Input() label: string;
    @Input() items: Array<SubNavigation>;

    constructor() { }

}
