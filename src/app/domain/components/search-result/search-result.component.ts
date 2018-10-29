import {Component, OnInit} from '@angular/core';
import {CaseService} from '../../services/case.service';
import {RedirectionService} from "../../../routing/redirection.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-search-result',
    templateUrl: './search-result.component.html',
    styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

    data$: Object;
    error: string;

    constructor(private caseService: CaseService,  private route: ActivatedRoute ,private redirectionService: RedirectionService) {
    }

    ngOnInit() {
        this.data$ = this.caseService.search();
    }

    onSubmit() {
        this.caseService.getNewCase().subscribe( () => {
            console.log('next()');
        }, () => {
            console.log('somthing went wrong');
        }, () => {
            this.data$ = this.caseService.search();
        });
    }
}
