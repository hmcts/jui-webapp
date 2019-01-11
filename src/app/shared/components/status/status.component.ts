import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html'
})
export class StatusComponent {

    @Input() classes = 'jui-status--urgent  govuk-!-margin-left-1'; //jui-status--new
    @Input() text = 'Urgent';

  constructor() { }


}
