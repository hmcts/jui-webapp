import {Component, OnInit} from '@angular/core';
import {CasesService} from '../../cases.service';

@Component({
    selector: 'app-search-result',
    templateUrl: './search-result.component.html',
    styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

    data: Object;

    constructor(private casesService: CasesService) {
    }

    ngOnInit() {
        this.data = this.casesService.search();
    }
}
