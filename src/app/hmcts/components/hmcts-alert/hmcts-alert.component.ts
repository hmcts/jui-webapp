import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-hmcts-alert',
  templateUrl: './hmcts-alert.component.html',
  styleUrls: ['./hmcts-alert.component.scss']
})
export class HmctsAlertComponent {

    @Input() classes = '';

    @Input() type =  'success'; // success, information, warning
    @Input() text = 'You have successfully added 1 question.';
    @Input() iconFallbackText = 'Success';

  constructor() { }

}
