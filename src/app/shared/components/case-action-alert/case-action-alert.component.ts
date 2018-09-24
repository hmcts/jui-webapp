import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-case-action-alert',
  templateUrl: './case-action-alert.component.html',
  styleUrls: ['./case-action-alert.component.scss']
})
export class CaseActionAlertComponent implements OnInit {


    @Input() title = 'Decision needed';
    @Input() href = '#';
    @Input() status = 'Draft consent order';

  constructor() { }

  ngOnInit() {
  }

}
