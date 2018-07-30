import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-hearing-check',
    templateUrl: './check-hearing.component.html',
    styleUrls: ['./check-hearing.component.scss']
})
export class CheckHearingComponent implements OnInit {

    answer: string;


    constructor(private route: ActivatedRoute,
                private router: Router) { }

    ngOnInit() {
    }

    submitHearing() {
        this.router.navigate(['../hearings-confirmation'], {relativeTo: this.route});
    }

}
