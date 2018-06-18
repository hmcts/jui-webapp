import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import 'rxjs/add/operator/filter';
import {CaseService} from "../../../case.service";
import { ActivatedRoute } from '@angular/router';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-view-case',
    templateUrl: './view-case.component.html',
    styleUrls: ['./view-case.component.scss']
})
export class ViewCaseComponent implements OnInit {

    case: any;
    caseId: string;
    sectionId: string;
    links = [];

    constructor(
        public router: Router,
        private caseService: CaseService,
        private route: ActivatedRoute) {
        this.route.params.subscribe( params => {
            this.caseId = params.case_id;
            this.sectionId = params.section;
        } );

    }

    ngOnInit() {
        this.caseService.fetch(this.caseId).subscribe(data => {
            this.case = data;
            this.links = this.case.sections.map(section => {
                return {
                    href: `/viewcase/${this.caseId}/${section.id}`,
                    label: section.name,
                    id: section.id
                }
            });
        });
    }

}
