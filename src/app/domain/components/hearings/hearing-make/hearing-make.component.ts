import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-list-for-hearing',
    templateUrl: './hearing-make.component.html',
    styleUrls: ['./hearing-make.component.scss']
})
export class HearingMakeComponent implements OnInit {

    error = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
    }

    submitHearing() {
        this.router.navigate(['../check-hearings-notes'], {relativeTo: this.route});
    }
}
