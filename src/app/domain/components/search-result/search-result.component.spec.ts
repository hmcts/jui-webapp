import {async, ComponentFixture, TestBed, inject} from '@angular/core/testing';
import {SearchResultComponent} from './search-result.component';
import {SharedModule} from '../../../shared/shared.module';
import {DomainModule} from '../../domain.module';
import {CaseService} from '../../services/case.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ConfigService} from '../../../config.service';
import {BrowserTransferStateModule} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';
import {mockConfigService} from '../../mock/config.mock';
import {ErrorFormattingService} from '../../../shared/services/error-formatting.service';

describe('SearchResultComponent', () => {
    let component: SearchResultComponent;
    let fixture: ComponentFixture<SearchResultComponent>;
    let httpMock: HttpTestingController;
    let nativeElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [],
            imports: [
                DomainModule,
                SharedModule,
                BrowserTransferStateModule,
                HttpClientTestingModule,
                RouterTestingModule
            ],
            providers: [
                CaseService,
                {
                    provide: ErrorFormattingService,
                    useValue: mockErrorFormattingService,
                },
                {
                    provide: ConfigService,
                    useValue: mockConfigService
                }
            ]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(SearchResultComponent);
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        httpMock = TestBed.get(HttpTestingController);
        fixture.detectChanges();
    });
    beforeEach(async(() => {
        fixture.whenStable()
            .then(() => {
                fixture.detectChanges();
            });
    }));

    /**
     * Representative object of the minimal error stack.
     */
    const mockErrorFormattingService = {

        createMinimalErrorStack() {
            return {
                'case list': 'Error appending question rounds.',
                'questions': 'Error getting question rounds.',
                'ccd-store': 'Error getting cases for DIVORCE'
            };
        },

        createHumanReadableStack() {
            return 'ER_CASES, ER_CASES_JUR_SCSS';
        }
    };

    /**
     * A test object, here 'cases', should be representative of the actual object used in the production
     * code, so that a developer is easily able to see an objects structure; understand what the function
     * does and develop against it.
     */
    const cases = {
        columns: [],
        results: [
            {
                case_id: 1552389424468616,
            },
            {
                case_id: 1552402420415026,
            },
            {
                case_id: 1551801279180592,
            }]
    };

    /**
     * getCasesSuccess()
     */
    it('should be able to check if the user has cases.', () => {

        const casesNoViewableCasesMessage = {
            message: 'JUDGE_HAS_NO_VIEWABLE_CASES'
        };

        expect(component.userHasNoCases(casesNoViewableCasesMessage)).toBeTruthy();
    });

    it('should start in a state of "LOADING" as the component has no cases.', () => {

        expect(component.componentState).toEqual(component.LOADING);
    });

    /**
     * If a message of Judge Has No Viewable Cases is sent through to the UI the component should
     * switch into a 'USER_HAS_NO_CASES' state.
     */
    it('should set the componentState as "USER_HAS_NO_CASES", if there are no case results for that user.', () => {

        const casesNoViewableCasesMessage = {
            message: 'JUDGE_HAS_NO_VIEWABLE_CASES'
        };

        component.getCasesSuccess(casesNoViewableCasesMessage);

        expect(component.componentState).toEqual(component.USER_HAS_NO_CASES);
    });

    it('should set the componentState as "CASES_LOAD_SUCCESSFULLY", if there are cases for that user.', () => {

        component.getCasesSuccess(cases);

        expect(component.componentState).toEqual(component.CASES_LOAD_SUCCESSFULLY);
    });

    it('should set cases, if there are results.', () => {

        component.getCasesSuccess(cases);

        expect(component.cases).toEqual(cases);
    });

    const errorStack = {
        error: {
            response: {
                data: {}
            }
        }
    };

    /**
     * getCasesError()
     */
    it('should be able to set a state of "CASES_LOAD_ERROR".', () => {

        component.getCasesError(errorStack);

        expect(component.componentState).toEqual(component.CASES_LOAD_ERROR);
    });

    it('should set errorStackResponse as the response data, so that it can be shown to the user,' +
        'within the view.', () => {

        component.getCasesError(errorStack);

        expect(component.errorStackResponse).toEqual(errorStack.error.response.data);
    });

    it('should call createMinimalErrorStack, to create a more granular error stack.', inject([ErrorFormattingService], (errorFormattingService: ErrorFormattingService) => {

        const errorFormattingServiceSpy = spyOn(errorFormattingService, 'createMinimalErrorStack');

        component.getCasesError(errorStack);

        expect(errorFormattingServiceSpy).toHaveBeenCalled();
    }));

    it('should set minimalErrorStack with the result from calling createMinimalErrorStack.', inject([ErrorFormattingService], (errorFormattingService: ErrorFormattingService) => {

        component.getCasesError(errorStack);

        expect(component.minimalErrorStack).toEqual(mockErrorFormattingService.createMinimalErrorStack());
    }));
});
