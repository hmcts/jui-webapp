import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SearchResultComponent} from './search-result.component';
import {SharedModule} from '../../shared/shared.module';
import {DomainModule} from '../domain.module';
import {CaseService} from '../../case.service';
import {Selector} from '../../../../test/selector-helper';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ConfigService} from '../../config.service';
import {BrowserTransferStateModule, StateKey} from '@angular/platform-browser';
import {makeStateKey, TransferState} from '@angular/platform-browser';

const columns = [{
    'label': 'Parties',
    'order': 2,
    'case_field_id': 'parties',
    'lookup': ['$.appeal.appellant.name.firstName', '$.appeal.appellant.name.lastName', 'versus DWP']
},
{
    'label': 'Type',
    'order': 3,
    'case_field_id': 'type',
    'value': 'PIP',

}];

describe('SearchResultComponent', () => {
    let component: SearchResultComponent;
    let fixture: ComponentFixture<SearchResultComponent>;
    let httpMock: HttpTestingController;
    let nativeElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [],
            imports: [DomainModule, SharedModule, BrowserTransferStateModule, HttpClientTestingModule],
            providers: [CaseService, ConfigService]
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
            expect(component).toBeTruthy();
        });

        describe('when no rows are returned', () => {
            beforeEach(async(() => {
                const req = httpMock.expectOne('http://localhost:3000/api/cases');

                req.flush({
                    columns: columns,
                    results: []
                });
            }));

            beforeEach(async(() => {
                fixture.whenStable().then(() => {
                    fixture.detectChanges();
                });
            }));

            it('should have zero rows', () => {
                expect(nativeElement.querySelectorAll(Selector.selector('search-result|table-row')).length).toBe(0);
            });
        });

        describe('when some rows are returned', () => {
            const results = [{
                case_id: '987654321',
                case_fields: {
                    parties: 'Louis Houghton versus DWP',
                    type: 'PIP'
                }
            }];

            beforeEach(async(() => {
                const req = httpMock.expectOne('http://localhost:3000/api/cases');

                req.flush({
                    columns,
                    results
                });
            }));

            beforeEach(async(() => {
                fixture.whenStable().then(() => {
                    fixture.detectChanges();
                });
            }));

            it('should have some rows', () => {
                expect(nativeElement.querySelectorAll(Selector.selector('search-result|table-row')).length).toBe(results.length);
            });
        });
    });


    describe('when there is some data in the transfer state', () => {
        const results = [{
            case_id: '987654321',
            case_fields: {
                parties: 'Louis Houghton versus DWP',
                type: 'PIP'
            }
        }];
        let state: TransferState;

        beforeEach(() => {
            state = TestBed.get(TransferState);
            const key: StateKey<Object> = makeStateKey('http://localhost:3000/api/cases');
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
            expect(nativeElement.querySelectorAll(Selector.selector('search-result|table-row')).length).toBe(results.length);
        });
    });
});
