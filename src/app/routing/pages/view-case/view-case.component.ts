import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import 'rxjs/add/operator/filter';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-view-case',
    templateUrl: './view-case.component.html',
    styleUrls: ['./view-case.component.scss']
})
export class ViewCaseComponent implements OnInit {

    case: any;

    constructor(public router: Router, private route: ActivatedRoute) {}

    ngOnInit() {
        this.case = this.route.snapshot.data['caseData'];
    }

}
