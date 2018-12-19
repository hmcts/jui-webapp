import {Component, Input} from '@angular/core';

export type alertType =  'success' | 'information' | 'warning';

@Component({
  selector: 'app-hmcts-alert',
  templateUrl: './hmcts-alert.component.html',
  styleUrls: ['./hmcts-alert.component.scss']
})
export class HmctsAlertComponent {
    @Input() type: alertType; // success, information, warning
    @Input() text: string
    @Input() iconFallbackText: string;

  constructor() { }

}
