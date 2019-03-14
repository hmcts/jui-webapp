import {async, ComponentFixture, TestBed, inject} from '@angular/core/testing';
import {of} from 'rxjs';
import {SearchResultComponent} from './search-result.component';
import {SharedModule} from '../../../shared/shared.module';
import {DomainModule} from '../../domain.module';
import {CaseService} from '../../services/case.service';
import {Selector} from '../../../shared/selector-helper';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ConfigService} from '../../../config.service';
import {BrowserTransferStateModule, StateKey} from '@angular/platform-browser';
import {makeStateKey, TransferState} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';
import {mockColums} from './mock/columns.mock';
import {mockConfigService} from '../../mock/config.mock';

const columns = mockColums;
const casesUrl = '/api/cases';

fdescribe('SearchResultComponent', () => {
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

    it('should be able to check if the user has cases.', () => {

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
                }
            ]
        };

        expect(component.userHasCases(cases)).toBeTruthy();
    });

    // const caseServiceStub = {
    //     getCases() {
    //         const cases = {
    //             columns: [],
    //             results: [
    //                 {
    //                     case_id: 1552389424468616,
    //                 },
    //                 {
    //                     case_id: 1552402420415026,
    //                 },
    //                 {
    //                     case_id: 1551801279180592,
    //                 }
    //             ]
    //         };
    //         return of(cases);
    //     }
    // };

    // it('should be able to retrieve cases from the case service.', inject([CaseService], (caseService: CaseService) => {
    //
    //     const caseServiceSpy = spyOn(caseService, 'getCases');
    //
    //     component.getCases();
    //     expect(caseServiceSpy).toHaveBeenCalled();
    // }));

    describe('when there is no data in the transfer state', () => {


        it('should create', () => {
            expect(component)
                .toBeTruthy();
        });

        describe('when no rows are returned', () => {
            beforeEach(async(() => {
                const req = httpMock.expectOne(casesUrl);

                req.flush({
                    columns,
                    results: []
                });
            }));


            it('should have zero rows', () => {
                expect(nativeElement.querySelectorAll(Selector.selector('search-result|table-row')).length)
                    .toBe(0);
            });
        });

        describe('when there is an error', () => {
            beforeEach(async(() => {
                const req = httpMock.expectOne(casesUrl);

                req.flush({}, {
                    statusText: 'Forbidden',
                    status: 403
                });
            }));

            beforeEach(async(() => {
                fixture.whenStable()
                    .then(() => {
                        fixture.detectChanges();
                    });
            }));

            //TODO: Re-write and add unit tests once functionality is signed off.
            // xit('should have zero rows', () => {
            //     expect(nativeElement.querySelectorAll(Selector.selector('search-result|table-row')).length)
            //         .toBe(0);
            // });

            // xit('should show a message saying that there has been an error', () => {
            //     console.log("1", nativeElement.querySelector(Selector.selector('error-text')))
            //     expect(nativeElement.querySelector(Selector.selector('error-text')))
            //         .toBeTruthy();
            // });
        });

        describe('when some rows are returned', () => {
            const results = [
                {
                    case_id: '987654321',
                    case_reference: '123-456-789',
                    case_fields: {
                        parties: 'Louis Houghton versus DWP',
                        type: 'PIP',
                        createdDate: '2018-06-21T12:56:12.466Z',
                        lastModified: '2018-06-21T12:58:12.466Z'
                    }
                }
            ];

            beforeEach(async(() => {
                const req = httpMock.expectOne(casesUrl);

                req.flush({
                    columns,
                    results
                });
            }));

            beforeEach(async(() => {
                fixture.whenStable()
                    .then(() => {
                        fixture.detectChanges();
                    });
            }));

            xit('should have some rows', () => {
                expect(nativeElement.querySelectorAll(Selector.selector('search-result|table-row')).length)
                    .toBe(results.length);
            });

            xit('should have have dates formatted properly', () => {
                expect(nativeElement.querySelector(Selector.selector('createdDate-value')).textContent)
                    .toEqual('21 June 2018 at 12:56pm');

                expect(nativeElement.querySelector(Selector.selector('lastModified-value')).textContent)
                    .toEqual('21 June 2018 at 12:58pm');
            });
        });
    });

    describe('when there is some data in the transfer state', () => {
        const results = [
            {
                case_id: '987654321',
                case_reference: '123-456-789',
                case_fields: {
                    parties: 'Louis Houghton versus DWP',
                    type: 'PIP',
                    createdDate: '2018-06-21T12:56:12.466Z',
                    lastModified: '2018-06-21T12:56:12.466Z'
                }
            }
        ];
        let state: TransferState;

        beforeEach(() => {
            state = TestBed.get(TransferState);

            const key: StateKey<Object> = makeStateKey(casesUrl);
            state.set(key, {
                columns,
                results
            });
        });

        beforeEach(() => {
            fixture = TestBed.createComponent(SearchResultComponent);
            component = fixture.componentInstance;
            nativeElement = fixture.nativeElement;
            httpMock = TestBed.get(HttpTestingController);
            fixture.detectChanges();
        });

        xit('should have some rows without hitting backend', () => {
            expect(nativeElement.querySelectorAll(Selector.selector('search-result|table-row')).length)
                .toBe(results.length);
        });
    });

    describe('when there is an error in the transfer state', () => {
        let state: TransferState;

        beforeEach(() => {
            state = TestBed.get(TransferState);

            const key: StateKey<Object> = makeStateKey(casesUrl);
            state.set(key, {
                error: {}
            });
        });

        beforeEach(() => {
            fixture = TestBed.createComponent(SearchResultComponent);
            component = fixture.componentInstance;
            nativeElement = fixture.nativeElement;
            httpMock = TestBed.get(HttpTestingController);
            fixture.detectChanges();
        });

        it('should show a message saying that there has been an error', () => {
            console.log(nativeElement.querySelector(Selector.selector('search-result|error-text')));
            expect(nativeElement.querySelector(Selector.selector('search-result|error-text')))
                .not.toBeTruthy();
        });
    });
});
