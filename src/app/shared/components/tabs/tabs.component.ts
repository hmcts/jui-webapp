import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {

    @Input() data;

    params: any;
    prop: any;
    tabContent: any;
    fragment: string;
    constructor( public router: Router, private route: ActivatedRoute) {
        this.route.params.subscribe(params => {
            this.params = params;
            this.switchTabs(this.data);
        });
        this.route.fragment.subscribe(fragment => {
            this.fragment = fragment;
            this.switchTabs(this.data);
        });
    }

    ngOnInit() {
        this.switchTabs(this.data);
        if (this.fragment === undefined) {
            window.location.hash = this.data.sections[0].id;
        }
    }

    switchTabs(data) {
        if (data) {
            for (const dataTab of data.sections) {
                if (dataTab.id === this.fragment) {
                    this.tabContent = dataTab;
                }
            }
        }
    }
}
