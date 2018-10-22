import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TableComponent} from './table.component';
import {SharedModule} from '../../shared.module';
import {DebugElement} from '@angular/core';

import {Selector} from '../../../../../test/selector-helper';
import {RouterTestingModule} from '@angular/router/testing';

let columns;
let result1;
let result2;
let dataWithTwoRows;
let dataWithNoRows;

describe('TableComponent', () => {
    let component: TableComponent;
    let fixture: ComponentFixture<TableComponent>;
    let element: DebugElement;

    beforeEach(() => {
        columns = [
            {
                'label': 'Ignore this column',
                'order': 2,
                'case_field_id': 'ignoreignore',
                'case_field_type': {
                    'id': 'Text',
                    'type': 'Text',
                    'min': null,
                    'max': null,
                    'regular_expression': null,
                    'fixed_list_items': [],
                    'complex_fields': [],
                    'collection_field_type': null
                }
            },
            {
                'label': 'Parties',
                'order': 2,
                'case_field_id': 'parties',
                'case_field_type': {
                    'id': 'Text',
                    'type': 'Text',
                    'min': null,
                    'max': null,
                    'regular_expression': null,
                    'fixed_list_items': [],
                    'complex_fields': [],
                    'collection_field_type': null
                }
            },
            {
                'label': 'Type',
                'order': 3,
                'case_field_id': 'type',
                'case_field_type': {
                    'id': 'Text',
                    'type': 'Text',
                    'min': null,
                    'max': null,
                    'regular_expression': null,
                    'fixed_list_items': [],
                    'complex_fields': [],
                    'collection_field_type': null
                }
            },
            {
                'label': 'Status',
                'order': 4,
                'case_field_id': 'status',
                'case_field_type': {
                    'id': 'Text',
                    'type': 'Text',
                    'min': null,
                    'max': null,
                    'regular_expression': null,
                    'fixed_list_items': [],
                    'complex_fields': [],
                    'collection_field_type': null
                }
            },
            {
                'label': 'Date',
                'order': 5,
                'case_field_id': 'caseCreated',
                'case_field_type': {
                    'id': 'Date',
                    'type': 'Date',
                    'min': null,
                    'max': null,
                    'regular_expression': null,
                    'fixed_list_items': [],
                    'complex_fields': [],
                    'collection_field_type': null
                }
            },
            {
                'label': 'Last Action',
                'order': 7,
                'case_field_id': 'caseLastActioned',
                'case_field_type': {
                    'id': 'Date',
                    'type': 'Date',
                    'min': null,
                    'max': null,
                    'regular_expression': null,
                    'fixed_list_items': [],
                    'complex_fields': [],
                    'collection_field_type': null
                }
            }
        ];

        result1 = {
            'case_id': 1528476356357908,
            'case_reference': '123-123-123',
            'case_jurisdiction': 'SSCS',
            'case_type_id':'Benefit',
            'case_fields': {
                'caseRef': null,
                'parties': 'A v May_146863',
                'type': 'SSCS',
                'status': {
                    'name': 'Draft Consent Order',
                    'action_goto': 'casefile'
                },
                'caseCreated': '2018-06-08T16:45:56.301',
                'caseLastActioned': '2018-06-11T10:36:58.652'
            }
        };
        result2 = {
            'case_id': 1528476358303157,
            'case_reference': '321-321-321',
            'case_jurisdiction': 'SSCS',
            'case_type_id':'Benefit',
            'case_fields': {
                'caseRef': null,
                'parties': 'B v May_417228',
                'type': 'SSCS',
                'status': {
                    'name': 'Draft Consent Order',
                    'action_goto': 'casefile'
                },
                'caseCreated': '2018-06-08T16:45:58.349',
                'caseLastActioned': '2018-06-08T16:45:58.349'
            }
        };

        dataWithTwoRows = {
            'columns': columns,
            'results': [
                result1,
                result2
            ]
        };
        dataWithNoRows = {
            'columns': columns,
            'results': []
        };
    });



    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SharedModule, RouterTestingModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TableComponent);
        component = fixture.componentInstance;
        element = fixture.debugElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('when I pass the table data with no results', () => {
        beforeEach(async(() => {
            component.ngOnChanges({
                data: {
                    currentValue: dataWithNoRows
                }
            });
            fixture.whenStable().then(() => {
                fixture.detectChanges();
            });
        }));

        it('should have no rows', () => {
            expect(element.nativeElement.querySelectorAll(Selector.selector('table-row')).length).toBe(0);
        });

        it('should have ALL the headers', () => {
            dataWithNoRows.columns.splice(0,1);
            dataWithNoRows.columns.forEach((column) => {
                const header = element.nativeElement.querySelector(Selector.selector(`table-component|${column.case_field_id}-header`));
                expect(header.textContent).toEqual(column.label);
            });
        });
    });

    describe('when I pass the table data with results', () => {
        beforeEach(async(() => {
            component.ngOnChanges({
                data: {
                    currentValue: dataWithTwoRows
                }
            });
            fixture.whenStable().then(() => {
                fixture.detectChanges();
            });
        }));

        it('should show match the number of  rows', () => {
            expect(element.nativeElement.querySelectorAll(Selector.selector('table-row')).length).toBe(dataWithTwoRows.results.length);
        });

        it('should have a clickable case reference link to summary', () => {
            const links =
                element.nativeElement.querySelectorAll(Selector.selector('table-component|case-reference-link'));
            expect(links[0].attributes.href.value).toEqual('/case/SSCS/Benefit/1528476356357908/summary');
        });

        it('should have a clickable case status link', () => {
            const links =
                element.nativeElement.querySelectorAll(Selector.selector('table-component|case-status-reference-link'));
            expect(links[0].attributes.href.value).toEqual('/case/SSCS/Benefit/1528476356357908/casefile');
        });

        it('should have ALL the headers', () => {
            dataWithNoRows.columns.splice(0,1);
            dataWithTwoRows.columns.forEach((column) => {
                const header = element.nativeElement.querySelector(Selector.selector(`table-component|${column.case_field_id}-header`));
                expect(header.textContent).toEqual(column.label);
            });
        });
    });
});
