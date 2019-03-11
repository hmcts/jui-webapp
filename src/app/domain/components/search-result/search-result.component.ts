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

    /**
     * This component has a couple of different view states, therefore assigning a static
     * string to each state; as it's cleaner and easier to read, rather than to place multiply variable conditions
     * in the html.
     */
    LOADING = 'LOADING';
    CASES_LOAD_SUCCESSFULLY = 'CASES_LOAD_SUCCESSFULLY';
    CASES_LOAD_ERROR = 'CASES_LOAD_ERROR';
    USER_HAS_NO_CASES = 'USER_HAS_NO_CASES';

    cases: Object;

    componentState = this.LOADING;

    constructor(private caseService: CaseService) {
    }

    /**
     * Checks if the user has any cases. If they do not we display a message to the user.
     *
     * @param cases
     */
    userHasCases(cases) {
        return cases.results.length > 0;
    }

    ngOnInit() {

        const casesObservable = this.caseService.getCases();

        casesObservable.subscribe(
            cases => {

                if (!this.userHasCases(cases)) {
                    this.componentState = this.USER_HAS_NO_CASES;
                    return;
                }

                this.componentState = this.CASES_LOAD_SUCCESSFULLY;

                this.cases = cases;
            },
            error => {

                this.componentState = this.CASES_LOAD_ERROR;

                console.log('error condition');
                console.log(error);
            }
        );
    }
}
