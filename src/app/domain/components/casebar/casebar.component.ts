import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import { CaseService } from '../../../case.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-casebar',
    templateUrl: './casebar.component.html',
    styleUrls: ['./casebar.component.scss']
})
export class CaseBarComponent implements OnInit {

    case: any;
    caseId: string;
    sectionId: string;

    constructor(public router: Router, private caseService: CaseService, private route: ActivatedRoute) {
        this.route.params.subscribe(params => {
            this.caseId = params.case_id;
            this.sectionId = params.section;
        });
    }

    ngOnInit() {
    }

}
