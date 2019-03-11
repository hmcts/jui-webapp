import {Component, OnInit} from '@angular/core';
import {CaseService} from '../../services/case.service';
import {RedirectionService} from '../../../routing/redirection.service';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';

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

        const cases = this.caseService.getCases();
        console.log('cases');
        console.log(cases);
        //This is an observable
        this.data$ = cases;

        // We want to handle the error condition here.
        // casesObservable.subscribe(cases => {
        //         console.log('in subscribe');
        //         console.log(cases);
        //         this.data$ = cases;
        //     },
        //     error => {
        //         console.log('error condition');
        //         console.log(error);
        //     }
        // );

    }
}
