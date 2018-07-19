import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-hearing-check',
    templateUrl: './hearing-check.component.html',
    styleUrls: ['./hearing-check.component.scss']
})
export class HearingCheckComponent implements OnInit {

    answer: string;


    constructor(private route: ActivatedRoute,
                private router: Router) { }

    ngOnInit() {
    }

    submitHearing() {
        this.router.navigate(['../hearings-confirmation'], {relativeTo: this.route});
    }

}
