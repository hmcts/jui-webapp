import {Component, Input, OnInit} from '@angular/core';
import {Helper, Navigation} from '../../../shared/components/footer/footer.model';

@Component({
    selector: 'app-hmcts-global-footer',
    templateUrl: './hmcts-global-footer.component.html'
})
export class HmctsGlobalFooterComponent implements OnInit {
    @Input() help: Helper;
    @Input() navigation: Navigation;

    constructor() { }
    ngOnInit() {}

}
