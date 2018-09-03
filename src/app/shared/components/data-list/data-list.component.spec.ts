import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DataListComponent } from './data-list.component';
import { SharedModule } from '../../shared.module';
import { DebugElement } from '@angular/core';
import { Selector } from '../../../../../test/selector-helper';
import {HmctsModule} from '../../../hmcts/hmcts.module';
import {GovukModule} from '../../../govuk/govuk.module';

describe('DataListComponent', () => {
    let component: DataListComponent;
    let fixture: ComponentFixture<DataListComponent>;
    let element: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SharedModule, GovukModule, HmctsModule]
        })
               .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DataListComponent);
        component = fixture.componentInstance;
        element = fixture.debugElement;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('Setting inputs:: ', () => {
        it('should display the title', () => {
            component.title = 'Example';
            fixture.detectChanges();
            expect(element.nativeElement.querySelector(Selector.selector('title')).textContent).toBe(component.title);
        });

        it('should display a table row per an item in the data list', () => {
            component.dataList = [
                {
                    label: 'label 1',
                    value: 'value 1'
                },
                {
                    label: 'label 2',
                    value: 'value 2'
                }
            ];

            component.ngOnChanges({
                dataList: []
            });

            fixture.detectChanges();
            expect(element.nativeElement.querySelectorAll(Selector.selector('table-row')).length).toBe(2);
        });

        it('should display all table headers that match the dataList labels', () => {
            component.dataList = [
                {
                    label: 'label 1',
                    value: 'value 1'
                },
                {
                    label: 'label 2',
                    value: 'value 2'
                }
            ];

            component.ngOnChanges({
                dataList: []
            });

            fixture.detectChanges();

            const actualHeaders = element.nativeElement.querySelectorAll(Selector.selector('table-header'));
            component.dataList.map((expectedItem, index) => {
                expect(actualHeaders[index].textContent).toEqual(expectedItem.label);
            });
        });

        it('should display all table standard cells that match the dataList values', () => {
            component.dataList = [
                {
                    label: 'label 1',
                    value: 'value 1'
                },
                {
                    label: 'label 2',
                    value: 'value 2'
                }
            ];

            component.ngOnChanges({
                dataList: []
            });

            fixture.detectChanges();

            const actualCells = element.nativeElement.querySelectorAll(Selector.selector('table-cell'));
            component.dataList.map((expectedItem, index) => {
                expect(actualCells[index].textContent).toEqual(expectedItem.value);
            });
        });
    });
});
