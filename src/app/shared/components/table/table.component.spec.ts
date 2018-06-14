import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TableComponent} from './table.component';
import {SharedModule} from '../../shared.module';
import {DebugElement} from '@angular/core';

const columns = [
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

const result1 = {
    'case_id': 1528476356357908,
    'case_fields': {
        'caseReference': null,
        'parties': 'A vs May_146863',
        'type': 'SSCS',
        'status': 'unknown',
        'caseCreated': '2018-06-08T16:45:56.301',
        'caseLastActioned': '2018-06-11T10:36:58.652'
    }
};
const result2 = {
    'case_id': 1528476358303157,
    'case_fields': {
        'caseReference': null,
        'parties': 'B vs May_417228',
        'type': 'SSCS',
        'status': 'unknown',
        'caseCreated': '2018-06-08T16:45:58.349',
        'caseLastActioned': '2018-06-08T16:45:58.349'
    }
};
const dataWithTwoRows = {
    'columns': columns,
    'results': [
        result1,
        result2
    ]
};
const dataWithNoRows = {
    'columns': columns,
    'results': [
    ]
};

describe('TableComponent', () => {
    let component: TableComponent;
    let fixture: ComponentFixture<TableComponent>;
    let element: DebugElement;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SharedModule]
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
            expect(element.nativeElement.querySelectorAll('mat-row').length).toBe(0);
        });

        it('should have ALL the headers', () => {
            dataWithNoRows.columns.forEach((column) => {
                const selector = `span[data-test-hook="jui-table-component-${column.case_field_id}-header"]`;
                const header = element.nativeElement.querySelector(selector);
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
            expect(element.nativeElement.querySelectorAll('mat-row').length).toBe(dataWithTwoRows.results.length);
        });

        it('should have a clickable case reference link to summary', () => {
            const links = element.nativeElement.querySelectorAll('a[data-test-hook="jui-table-component-case-reference-link"');
            expect(links[0].attributes.href.value).toEqual('/viewcase/1528476356357908/summary');
        });

        it('should have ALL the headers', () => {
            dataWithTwoRows.columns.forEach((column) => {
                const selector = `span[data-test-hook="jui-table-component-${column.case_field_id}-header"]`;
                const header = element.nativeElement.querySelector(selector);
                expect(header.textContent).toEqual(column.label);
            });
        });
    });
});
