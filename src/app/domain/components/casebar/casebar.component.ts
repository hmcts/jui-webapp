import {Component, Input, OnInit} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import { CaseService } from '../../../case.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-casebar',
    templateUrl: './casebar.component.html',
    styleUrls: ['./casebar.component.scss']
})
export class CaseBarComponent {

    @Input() case: any;

    constructor() {}

}
