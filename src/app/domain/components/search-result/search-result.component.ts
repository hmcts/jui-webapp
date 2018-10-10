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
    selectedJurisdiction: string;

    constructor(private caseService: CaseService,  private route: ActivatedRoute ,private redirectionService: RedirectionService) {
    }

    ngOnInit() {
        this.route.queryParams.subscribe(params =>  {
            this.selectedJurisdiction = params['selectedJurisdiction'] || undefined;
        });
        if(this.selectedJurisdiction) {
            this.data$ = this.caseService.getNewCase(this.selectedJurisdiction);
        } else {
            this.data$ = this.caseService.search();
        }
    }

    onSubmit() {
        this.redirectionService.redirect(`/get-new-case`);
    }
}
