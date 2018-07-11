import {Component} from '@angular/core';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

    email = 'service-desk@hmcts.gov.uk';
    phone = '0207 633 4140';

}
