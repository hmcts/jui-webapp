import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultComponent } from './search-result.component';
import { SharedModule } from '../../../shared/shared.module';
import { DomainModule } from '../../domain.module';
import { CaseService } from '../../services/case.service';
import { Selector } from '../../../../../test/selector-helper';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ConfigService } from '../../../config.service';
import { BrowserTransferStateModule, StateKey } from '@angular/platform-browser';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

const columns = [
    {
        'label': 'Parties',
        'order': 2,
        'case_field_id': 'parties',
        'lookup': [
            '$.appeal.appellant.name.firstName',
            '$.appeal.appellant.name.lastName',
            'vs DWP'
        ]
    },
    {
        'label': 'Type',
        'order': 3,
        'case_field_id': 'type',
        'lookup': 'PIP',

    },
    {
        'label': 'Case Start Date',
        'order': 4,
        'case_field_id': 'caseStartDate',
        'lookup': '$.created_date',
        'date_format': 'd MMMM yyyy \'at\' h:mmaaaaa\'m\''
    },
    {
        'label': 'Date of Last Action',
        'order': 5,
        'case_field_id': 'dateOfLastAction',
        'lookup': '$.last_modified',
        'date_format': 'd MMMM yyyy \'at\' h:mmaaaaa\'m\''
    }
];
const casesUrl = '/api/cases';

const configMock = {
    config: {
        api_base_url: ''
    }
};

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
                    provide: ConfigService,
                    useValue: configMock
                }
            ]
        })
               .compileComponents();
    }));

    describe('when there is no data in the transfer state', () => {
        beforeEach(() => {
            fixture = TestBed.createComponent(SearchResultComponent);
            component = fixture.componentInstance;
            nativeElement = fixture.nativeElement;
            httpMock = TestBed.get(HttpTestingController);
            fixture.detectChanges();
        });

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

            beforeEach(async(() => {
                fixture.whenStable()
                       .then(() => {
                           fixture.detectChanges();
                       });
            }));

            it('should have zero rows', () => {
                expect(nativeElement.querySelectorAll(Selector.selector('search-result|table-row')).length)
                    .toBe(0);
            });

            it('should show a message saying that there are no cases', () => {
                expect(nativeElement.querySelector(Selector.selector('search-result|no-results-text')))
                    .toBeTruthy();
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

            it('should have zero rows', () => {
                expect(nativeElement.querySelectorAll(Selector.selector('search-result|table-row')).length)
                    .toBe(0);
            });

            it('should show a message saying that there has been an error', () => {
                expect(nativeElement.querySelector(Selector.selector('search-result|error-text')))
                    .toBeTruthy();
            });
        });

        describe('when some rows are returned', () => {
            const results = [
                {
                    case_id: '987654321',
                    case_reference: '123-456-789',
                    case_fields: {
                        parties: 'Louis Houghton versus DWP',
                        type: 'PIP',
                        caseStartDate: '2018-06-21T12:56:12.466Z',
                        dateOfLastAction: '2018-06-21T12:58:12.466Z'
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

            it('should have some rows', () => {
                expect(nativeElement.querySelectorAll(Selector.selector('search-result|table-row')).length)
                    .toBe(results.length);
            });

            it('should have have dates formatted properly', () => {
                expect(nativeElement.querySelector(Selector.selector('caseStartDate-value')).textContent)
                    .toEqual('21 June 2018 at 12:56pm');

                expect(nativeElement.querySelector(Selector.selector('dateOfLastAction-value')).textContent)
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
                    caseStartDate: '2018-06-21T12:56:12.466Z',
                    dateOfLastAction: '2018-06-21T12:56:12.466Z'
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

        it('should have some rows without hitting backend', () => {
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
            expect(nativeElement.querySelector(Selector.selector('search-result|error-text')))
                .toBeTruthy();
        });
    });
});
