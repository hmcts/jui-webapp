import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {Component, CUSTOM_ELEMENTS_SCHEMA, DebugElement, Input, ViewChild} from '@angular/core';
import {Selector} from '../../../../shared/selector-helper';
import {mockPanelData} from './mock/summary-panel.mock';
import {PageDateDefault, SectionSummaryItem} from '../../../models/section_fields';
import {SummaryPanelComponent} from './summary-panel.component';

describe('SummaryPanelComponent Component: Testing Input & Output', () => {
    @Component({
        selector: `app-host-dummy-component`,
        template: `<app-summary-panel [panelData]="data"></app-summary-panel>`
    })
    class TestDummyHostComponent {
        public data:  PageDateDefault = mockPanelData;
        @ViewChild(SummaryPanelComponent)
        public summaryPanelComponent: SummaryPanelComponent;
    }
    let testHostComponent: TestDummyHostComponent;
    let testHostFixture: ComponentFixture<TestDummyHostComponent>;
    let el: DebugElement;
    let de: any;
    let component: SummaryPanelComponent;
    let fixture: ComponentFixture<SummaryPanelComponent>;
    let element: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ SummaryPanelComponent, TestDummyHostComponent ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        testHostFixture = TestBed.createComponent(TestDummyHostComponent);
        testHostComponent = testHostFixture.componentInstance;
    });
    beforeEach(() => {
        fixture = TestBed.createComponent(SummaryPanelComponent);
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
        expect(testHostComponent.summaryPanelComponent.panelData).toBeUndefined();
        testHostFixture.detectChanges();
    });
    it('panelData should be valid', () => {
        testHostFixture.detectChanges();
        expect(typeof testHostComponent.summaryPanelComponent.panelData === 'object').toBeTruthy();
    });
    it('panelData should have data loaded', () => {
        testHostFixture.detectChanges();

        // const actualTitles = element.nativeElement.querySelectorAll(Selector.selector('title'));
       const filtered = (testHostComponent.summaryPanelComponent.panelData.sections as Array<SectionSummaryItem>
       ).filter(item => item.type !== 'timeline').map(item => item);
        expect(filtered[0].name).toEqual('Case Details');
        expect(filtered[1].name).toEqual('Representative');

        expect(testHostComponent.summaryPanelComponent.panelData.sections.length).toEqual(3);
    });
    it('should see John first and Gilbert second', () => {
        testHostFixture.detectChanges();
        const filtered: Array<SectionSummaryItem> = (testHostComponent.summaryPanelComponent.panelData.sections as Array<SectionSummaryItem>
        ).filter((item: SectionSummaryItem) => item.type === 'timeline');
        expect(filtered[0].type).toBe('timeline');

    });
})
