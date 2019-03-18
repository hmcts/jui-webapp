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
    errorStackResponse: Object;
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

    getCasesSuccess(cases) {

        if (!this.userHasCases(cases)) {
            this.componentState = this.USER_HAS_NO_CASES;
            return;
        }

        this.componentState = this.CASES_LOAD_SUCCESSFULLY;
        this.cases = cases;
    }

    getCasesError(errorStack) {

        this.componentState = this.CASES_LOAD_ERROR;

        this.errorStackResponse = errorStack.error.response.data;

        this.minimalErrorStack = this.errorFormattingService.createMinimalErrorStack(errorStack.error);

        console.log('HttpErrorResponse Error:');
        console.log(errorStack);
    }

    /**
     * Note that the minimal error stack, does not include the request, response or return objects, as this is
     * too much information to place into the view.
     */
    getCases() {

        const casesObservable = this.caseService.getCases();

        casesObservable.subscribe(
            cases => {
                this.getCasesSuccess(cases);
            },
            errorStack => {
                this.getCasesError(errorStack);
            }
        );
    }

    /**
     * When we move out logic into seperate functions they become easier to test in Angular, otherwise we
     * have to mock.
     */
    ngOnInit() {

        this.getCases();
    }
}
