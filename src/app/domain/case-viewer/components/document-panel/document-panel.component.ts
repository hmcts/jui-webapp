import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-document-panel',
  templateUrl: './document-panel.component.html',
  styleUrls: ['./document-panel.component.scss']
})
export class DocumentPanelComponent implements OnInit {

    @Input()
    panelData;


    constructor() { }

  ngOnInit() {
  }

}
