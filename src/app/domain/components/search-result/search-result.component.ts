import {Component, OnInit} from '@angular/core';
import {CaseService} from '../../services/case.service';

@Component({
    selector: 'app-search-result',
    templateUrl: './search-result.component.html',
    styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

    data$: Object;
    error: string;

    constructor(private caseService: CaseService) {
    }

    ngOnInit() {
        this.data$ = this.caseService.search();
    }
}
