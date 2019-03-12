import {Component, OnInit} from '@angular/core';
import {CaseService} from '../../services/case.service';
import {ErrorFormattingService} from '../../../shared/services/error-formatting.service';

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
    // TODO: Rename
    errorInResponseData: Object;

    minimalErrorStack: Object;

    componentState = this.LOADING;

    constructor(private caseService: CaseService, private errorFormattingService: ErrorFormattingService) {
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
            fullErrorStack => {

                this.componentState = this.CASES_LOAD_ERROR;

                // Full Error Stack, with request and response data. Although it does not look like
                // return is returning the correct message
                this.errorInResponseData = fullErrorStack.error.response.data;
                console.log('HttpErrorResponse Error:');
                console.log(fullErrorStack);

                // Minimal Error Stack, to display in the view.
                console.log('HttpErrorResponse minimalErrorStack for view:');
                const fullErrorStackClone = Object.assign({}, fullErrorStack.error);

                this.minimalErrorStack = this.errorFormattingService.removeRequestAndResponse(fullErrorStackClone);

                console.log(this.minimalErrorStack);
            }
        );
    }
}
