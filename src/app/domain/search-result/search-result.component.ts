import {Component, OnInit} from '@angular/core';
import {CcdService} from '../ccd.service';
import { TransferState, makeStateKey } from '@angular/platform-browser';

@Component({
    selector: 'app-search-result',
    templateUrl: './search-result.component.html',
    styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

    data: Object;

    constructor(private ccdService: CcdService) {
    }


    ngOnInit() {
        this.data = this.ccdService.search();
    }

}
