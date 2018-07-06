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

    constructor(
        public router: Router,
        private caseService: CaseService,
        private route: ActivatedRoute) {
        this.route.params.subscribe( params => {
            this.caseId = params.case_id;
            this.sectionId = params.section || 'summary';
        } );

    }

    ngOnInit() {
        this.caseService.fetch(this.caseId).subscribe(data => {
            this.case = data;
        });
    }

}
