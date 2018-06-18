import {Component, OnInit} from '@angular/core';
import {CaseService} from '../../case.service';

@Component({
    selector: 'app-search-result',
    templateUrl: './search-result.component.html',
    styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

    data: Object;

    constructor(private caseService: CaseService) {
    }

    ngOnInit() {
        this.data = this.caseService.search();
    }
}
