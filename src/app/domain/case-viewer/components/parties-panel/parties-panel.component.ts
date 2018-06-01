import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-parties-panel',
    templateUrl: './parties-panel.component.html',
    styleUrls: ['./parties-panel.component.scss']
})
export class PartiesPanelComponent implements OnInit {

    @Input()
    panelData;

    constructor() {
    }

    ngOnInit() {
    }

}
