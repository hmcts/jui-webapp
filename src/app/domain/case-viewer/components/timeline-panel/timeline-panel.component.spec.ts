import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CaseViewerModule } from '../../case-viewer.module';
import { TimelinePanelComponent } from './timeline-panel.component';
import {Component, CUSTOM_ELEMENTS_SCHEMA, DebugElement, Input, ViewChild} from '@angular/core';
import {mockPanelDataTimeline} from '../summary-panel/mock/summary-panel.mock';
import {PageDateWithFields} from '../../../models/section_fields';

describe('Timeline Panel Component: Testing Input & Output', () => {
    @Component({
        selector: `app-host-dummy-component`,
        template: `<app-timeline-panel [panelData]="data"></app-timeline-panel>`
    })
    class TestDummyHostComponent {
        public data:  PageDateWithFields = mockPanelDataTimeline;
        @ViewChild(TimelinePanelComponent)
        public timelinePanelComponent: TimelinePanelComponent;
    }
    let testHostComponent: TestDummyHostComponent;
    let testHostFixture: ComponentFixture<TestDummyHostComponent>;
    let el: DebugElement;
    let de: any;
    let component: TimelinePanelComponent;
    let fixture: ComponentFixture<TimelinePanelComponent>;
    let element: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ TimelinePanelComponent, TestDummyHostComponent ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        testHostFixture = TestBed.createComponent(TestDummyHostComponent);
        testHostComponent = testHostFixture.componentInstance;
    });
    beforeEach(() => {
        fixture = TestBed.createComponent(TimelinePanelComponent);
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
        expect(testHostComponent.timelinePanelComponent.panelData).toBeUndefined();
        testHostFixture.detectChanges();
    });

    it('panelData should have data loaded', () => {
        testHostFixture.detectChanges();
        expect( typeof testHostComponent.timelinePanelComponent.panelData === 'object').toBeTruthy();
    });
})


