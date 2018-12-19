import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PartiesPanelComponent } from './parties-panel.component';
import {Component, CUSTOM_ELEMENTS_SCHEMA, DebugElement, ViewChild} from '@angular/core';
import {mockPanelData} from '../summary-panel/mock/summary-panel.mock';
import {PageDateDefault} from '../../../models/section_fields';


describe('PartiesPanelComponent Component: Testing Input & Output', () => {
    @Component({
        selector: `app-host-dummy-component`,
        template: `<app-parties-panel [panelData]="data"></app-parties-panel>`
    })
    class TestDummyHostComponent {
        public data:  PageDateDefault = mockPanelData;
        @ViewChild(PartiesPanelComponent)
        public partiesPanelComponent: PartiesPanelComponent;
    }
    let testHostComponent: TestDummyHostComponent;
    let testHostFixture: ComponentFixture<TestDummyHostComponent>;
    let el: DebugElement;
    let de: any;
    let component: PartiesPanelComponent;
    let fixture: ComponentFixture<PartiesPanelComponent>;
    let element: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ PartiesPanelComponent, TestDummyHostComponent ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        testHostFixture = TestBed.createComponent(TestDummyHostComponent);
        testHostComponent = testHostFixture.componentInstance;
    });
    beforeEach(() => {
        fixture = TestBed.createComponent(PartiesPanelComponent);
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
        expect(testHostComponent.partiesPanelComponent.panelData).toBeUndefined();
        testHostFixture.detectChanges();
    });

    it('panelData should have data loaded', () => {
        testHostFixture.detectChanges();
        expect( typeof testHostComponent.partiesPanelComponent.panelData === 'object').toBeTruthy();
    });
});
