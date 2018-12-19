import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-case-action-alert',
  templateUrl: './case-action-alert.component.html',
  styleUrls: ['./case-action-alert.component.scss']
})
export class CaseActionAlertComponent implements OnInit {


    @Input() title: string;
    @Input() href;
    @Input() status;
    state = '';

  constructor() { }

  ngOnInit() {
      this.state = this.status.name;
      this.href = this.status.ID ? `../${this.status.actionGoTo}/${this.status.ID}` : `../${this.status.actionGoTo}`;
  }
}
