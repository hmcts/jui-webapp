import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {Component, CUSTOM_ELEMENTS_SCHEMA, DebugElement, ViewChild} from '@angular/core';
import {TimelineComponent} from './timeline.component';
import {mockData, TimeDataStamp} from './mock/timeline.mock';

describe('TimelineComponent Component: Testing Input & Output', () => {
    @Component({
        selector: `app-host-dummy-component`,
        template: `<app-timeline [events]="data" [maxHistory]="maxHistory"></app-timeline>`
    })
    class TestDummyHostComponent {
        public data: Array<TimeDataStamp> = mockData;
        public maxHistory: number;
        @ViewChild(TimelineComponent)
        public timelineComponent: TimelineComponent;
    }

    let testHostComponent: TestDummyHostComponent;
    let testHostFixture: ComponentFixture<TestDummyHostComponent>;
    let el: DebugElement;
    let de: any;
    let component: TimelineComponent;
    let fixture: ComponentFixture<TimelineComponent>;
    let element: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ TimelineComponent, TestDummyHostComponent ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        testHostFixture = TestBed.createComponent(TestDummyHostComponent);
        testHostComponent = testHostFixture.componentInstance;
    });
    beforeEach(() => {
        fixture = TestBed.createComponent(TimelineComponent);
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
        expect(testHostComponent.timelineComponent.events).toBeUndefined();
        expect(testHostComponent.timelineComponent.maxHistory).toBeUndefined();
        testHostFixture.detectChanges();
        expect(testHostComponent.timelineComponent.events.length).toEqual(2);
        expect(testHostComponent.timelineComponent.events[0].title).toEqual('HEARING');
    });
    it('Events length is bigger than maxHistory, than slice ', () => {
        component.maxHistory = 1;
        component.events = mockData;
        component.ngOnChanges();
        expect(component.events.length).toEqual(1);
    })
    it('Events length is smaller than maxHistory', () => {
        component.maxHistory = 5;
        component.events = mockData;
        component.ngOnChanges();
        expect(component.events.length).toEqual(mockData.length);
    })
})
