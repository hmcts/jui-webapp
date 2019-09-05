import {Component, OnInit} from '@angular/core';
import {CaseService} from '../../services/case.service';
import {ErrorFormattingService} from '../../../shared/services/error-formatting.service';
import * as moment from 'moment';

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

    /**
     * TODO: Is CCD zero indexed or not? This would mean we start requesting the first page being 0 or 1.
     * @type {number}
     */
    FIRST_CCD_PAGE = 1;
    PAGINATION_INCREMENT = 1;

    cases: Object;
    errorStackResponse: Object;
    minimalErrorStack: Object;
    humanReadableErrorStack: String;
    browserTime: String;

    componentState = this.LOADING;

    selectedPageIndex = this.FIRST_CCD_PAGE;
    totalPages;

    pages = [];

    constructor(private caseService: CaseService, private errorFormattingService: ErrorFormattingService) {
    }

    /**
     * Checks if the user has any cases. If they do not we display a message to the user.
     *
     * @param cases
     */
    userHasNoCases(cases) {
        return cases.message === 'JUDGE_HAS_NO_VIEWABLE_CASES';
    }

    getCasesSuccess(cases) {

        if (this.userHasNoCases(cases)) {
            this.setComponentState(this.USER_HAS_NO_CASES);
            return;
        }

        this.setComponentState(this.CASES_LOAD_SUCCESSFULLY);

        this.cases = cases;
    }

    getCasesError(errorStack) {

        this.setComponentState(this.CASES_LOAD_ERROR);

        this.errorStackResponse = errorStack.error.response.data;

        this.minimalErrorStack = this.errorFormattingService.createMinimalErrorStack(errorStack.error);
        this.humanReadableErrorStack = this.errorFormattingService.createHumanReadableStack(this.minimalErrorStack);

        this.browserTime = moment().format(`D MMMM YYYY, h:mm:ss a`);

        /**
         * Please keep the following console logs in here, as then
         * we are able to debug while with Clients / Judges.
         */
        console.log('HttpErrorResponse Error:');
        console.log(errorStack);

        console.log('Minimal Error Stack:');
        console.log(this.minimalErrorStack);

        console.log('Human Readable Error Stack:');
        console.log(this.humanReadableErrorStack);

        console.log(this.browserTime);
    }

    /**
     * Set this component's state.
     *
     * @param state
     * @returns {any}
     */
    setComponentState = state => this.componentState = state;

    /**
     * Note that the minimal error stack, does not include the request, response or return objects, as this is
     * too much information to place into the view.
     */
    getCases(requestCcdPage) {

        this.setComponentState(this.LOADING);
        const casesObservable = this.caseService.getCases(requestCcdPage);

        casesObservable.subscribe(
            cases => {
                this.getCasesSuccess(cases);
            },
            errorStack => {
                this.getCasesError(errorStack);
            }
        );
    }

    getPaginationMetadata() {

        const paginationMetadataObservable = this.caseService.getPaginationMetadata();

        paginationMetadataObservable.subscribe(
            paginationMetadata => {

                this.totalPages = paginationMetadata['totalPagesForAllCases'];

                for (let index = 1; index <= this.totalPages; index++) {
                    this.pages.push(index);
                }
            },
            errorStack => {
                console.log(errorStack);
            }
        );
    }

    /**
     * TODO: We do not know if we should show the next page button as yet, as not sure if we can get the total
     * number of cases a User has from Ccd.
     */
    hasNextPage = selectedPageIndex => selectedPageIndex < this.totalPages;

    /**
     * We should check if there is a previous page of Cases, if yes then we should show the previous page button.
     *
     * @param selectedPageIndex
     * @returns {boolean}
     */
    hasPreviousPage = selectedPageIndex => selectedPageIndex > this.FIRST_CCD_PAGE;

    /**
     * Retrieves the next page of CCD cases.
     *
     * @param currentCcdPageIndex
     */
    getNextPage = currentCcdPageIndex => {

        const nextCcdPageIndex = currentCcdPageIndex + this.PAGINATION_INCREMENT;

        this.getCasesAndSetCcdPageIndex(nextCcdPageIndex);
    }

    /**
     * Retrieves the previous page of CCD cases.
     *
     * @param currentCcdPageIndex
     */
    getPreviousPage = currentCcdPageIndex => {

        const prevCcdPageIndex = currentCcdPageIndex - this.PAGINATION_INCREMENT;

        this.getCasesAndSetCcdPageIndex(prevCcdPageIndex);
    }

    getPage = selectedPageIndex => {

        this.getCasesAndSetCcdPageIndex(selectedPageIndex);
    }

    pageSelected = (pageIndex, selectedPageIndex) => {

        return pageIndex === selectedPageIndex;
    }

    /**
     * getCasesAndSetCcdPageIndex
     *
     * Get the Ccd cases and maintain the Ccd Page Index.
     *
     * @param selectedPageIndex - 1
     */
    getCasesAndSetCcdPageIndex = selectedPageIndex => {

        this.setSelectedPageIndex(selectedPageIndex);
        this.getCases(selectedPageIndex);
    }

    /**
     * setSelectedPageIndex
     *
     * We maintain the state of the Ccd Page Index within the UI, so that we can request the correct previous or next Ccd page.
     *
     * @param newPageIndex
     */
    setSelectedPageIndex = newPageIndex => {
        this.selectedPageIndex = newPageIndex;
    }

    /**
     * Initialise the page with the first page of Ccd Cases.
     */
    ngOnInit() {

        this.getCases(this.selectedPageIndex);
        this.getPaginationMetadata();
    }
}
