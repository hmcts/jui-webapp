import { Component, OnInit, Input } from '@angular/core';



@Component({
  selector: 'app-summary-panel',
  templateUrl: './summary-panel.component.html',
  styleUrls: ['./summary-panel.component.scss']
})
export class SummaryPanelComponent implements OnInit {

    @Input()
    panelData;


    constructor() { }

  ngOnInit() {
  }

}
