import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DataListComponent } from './data-list.component';
import {Component, CUSTOM_ELEMENTS_SCHEMA, DebugElement, Input, ViewChild} from '@angular/core';
import {Selector} from '../../../shared/selector-helper';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {mockDatalist} from './mock/datalist.mock';

describe('DataListComponent', () => {
    @Component({
        selector: `app-host-dummy-component`,
        template: `<app-data-list
            [classes] = classes
            [title] = title
            [dataList] = dataList
        ></app-data-list>`
    })
    class TestDummyHostComponent {
        classes: string;
        title = 'Wow Bingo';
        dataList: Array<any> = mockDatalist;
        @ViewChild(DataListComponent)
        public dataListComponent: DataListComponent;
    }

    let testHostComponent: TestDummyHostComponent;
    let testHostFixture: ComponentFixture<TestDummyHostComponent>;
    let el: DebugElement;
    let de: any;
    let component: DataListComponent;
    let fixture: ComponentFixture<DataListComponent>;
    let element: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                FormsModule
            ],
            declarations: [ DataListComponent, TestDummyHostComponent ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        testHostFixture = TestBed.createComponent(TestDummyHostComponent);
        testHostComponent = testHostFixture.componentInstance;
    });
    beforeEach(() => {
        fixture = TestBed.createComponent(DataListComponent);
        component = fixture.componentInstance;
        element = fixture.debugElement;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should be created by angular', () => {
        expect(fixture).not.toBeNull();
    });
    it('should panelData not load', () => {
        expect(testHostComponent.dataListComponent.classes).toBeUndefined();
        expect(testHostComponent.dataListComponent.dataList).toBeUndefined();
        expect(testHostComponent.dataListComponent.newDataList).toBeUndefined();
        expect(testHostComponent.dataListComponent.title).toBeUndefined();
        testHostFixture.detectChanges();
        expect(testHostComponent.dataListComponent.title).toEqual('Wow Bingo');
        expect(testHostComponent.dataListComponent.dataList).toEqual(mockDatalist);
    });

    it('should display the title', () => {
        testHostFixture.detectChanges();
        expect(testHostFixture.debugElement.nativeElement.querySelector(Selector.selector('title')).textContent).toBe(testHostComponent.dataListComponent.title);
    });

    it('should display a table row per an item in the data list', () => {
        testHostFixture.detectChanges();
        expect(testHostFixture.debugElement.nativeElement.querySelectorAll(Selector.selector('title')).length).toBe(1);
    });
});
