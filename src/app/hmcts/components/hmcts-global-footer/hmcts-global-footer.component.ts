import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-hmcts-global-footer',
    templateUrl: './hmcts-global-footer.component.html',
    styleUrls: ['./hmcts-global-footer.component.scss']
})
export class HmctsGlobalFooterComponent implements OnInit {

    @Input() help = {
        heading: 'Help',
        email: {
            address: '#',
            text: 'service-desk@hmcts.gov.uk'
        },
        phone: {
            text: '0207 633 4140'
        },
        opening: {
            text: 'Monday to Friday, 8am to 6pm (excluding public holidays)'
        }
    };

    @Input() navigation = {
        items: [{
            text: 'Terms and conditions',
            href: '#'
        }, {
            text: 'Cookies',
            href: '#'
        }, {
            text: 'Privacy policy',
            href: '#'
        }]
    };


    constructor() { }

    ngOnInit() {
    }

}
