import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-parties-panel',
    templateUrl: './parties-panel.component.html',
    styleUrls: ['./parties-panel.component.scss']
})
export class PartiesPanelComponent implements OnInit {

    @Input() panelData;
    params: any;
    tabContent: any;

    constructor(public router: Router, private route: ActivatedRoute) {
        this.route.params.subscribe(params => {
            this.params = params;
            this.switchTabs(this.panelData);
        });
    }

    ngOnInit() {
        this.switchTabs(this.panelData);
        if (this.params.section_item_id === undefined) {
            this.router.navigate([`/jurisdiction/${this.params.jur}/casetype/${this.params.casetype}/viewcase/${this.params.case_id}/${this.params.section}/${this.panelData.sections[0].id}`]);
        }
    }

    switchTabs(data) {
        if (data) {
            for (let dataTab of data.sections) {
                if (dataTab.id === this.params.section_item_id) {
                    this.tabContent = dataTab;
                }
            }
        }
    }
}
