import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TableComponent} from './table.component';
import {SharedModule} from '../../shared.module';
import {DebugElement} from '@angular/core';

import {Selector} from '../../../../../test/selector-helper';
import {RouterTestingModule} from '@angular/router/testing';
import {mockColumData, mockDataWithNoRows, mockDataWithTwoRows, mockResultData, mockResultData2} from './mock/table.mock';

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
        columns = mockColumData;
        result1 = mockResultData;
        result2 = mockResultData2;

        dataWithTwoRows = mockDataWithTwoRows;
        dataWithNoRows = mockDataWithNoRows;
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

        // xit('should have ALL the headers', () => {
        //     dataWithNoRows.columns.splice(0,1);
        //     dataWithNoRows.columns.forEach((column) => {
        //         const header = element.nativeElement.querySelector(Selector.selector(`table-component|${column.case_field_id}-header`));
        //         expect(header.textContent).toEqual(column.label);
        //     });
        // });
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

        xit('should have a clickable case status link', () => {
            const links =
                element.nativeElement.querySelectorAll(Selector.selector('table-component|case-status-reference-link'));
            expect(links[0].attributes.href.value).toEqual('/case/SSCS/Benefit/1528476356357908/casefile');
        });

        // xit('should have ALL the headers', () => {
        //     dataWithNoRows.columns.splice(0,1);
        //     dataWithTwoRows.columns.forEach((column) => {
        //         const header = element.nativeElement.querySelector(Selector.selector(`table-component|${column.case_field_id}-header`));
        //         expect(header.textContent).toEqual(column.label);
        //     });
        // });
    });
});
