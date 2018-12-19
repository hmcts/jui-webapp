import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HmctsTimelineComponent } from './hmcts-timeline.component';
import {Component, CUSTOM_ELEMENTS_SCHEMA, DebugElement, ViewChild} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {SentenceCasePipe} from '../../../shared/pipes/sentence-case/sentence-case-pipe';
import {HmctsTimeline} from './mock/hmcts-timeline.mock';
import {By} from '@angular/platform-browser';
import {Timeline} from '../../models/timeline';

describe('HmctsTimelineComponent', () => {
    @Component({
        selector: `app-host-dummy-component`,
        template: `<app-hmcts-timeline [events]="data" ></app-hmcts-timeline>`
    })
    class TestDummyHostTimelineComponent {
        private data: Array<Timeline> = HmctsTimeline;
        @ViewChild(HmctsTimelineComponent)
        public hmctsTimelineComponent: HmctsTimelineComponent;
    }

    let testHostComponent: TestDummyHostTimelineComponent;
    let testHostFixture: ComponentFixture<TestDummyHostTimelineComponent>;
    let el: DebugElement;
    let de: any;
    let component: HmctsTimelineComponent;
    let fixture: ComponentFixture<HmctsTimelineComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [ HmctsTimelineComponent, SentenceCasePipe, TestDummyHostTimelineComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
        testHostFixture = TestBed.createComponent(TestDummyHostTimelineComponent);
        testHostComponent = testHostFixture.componentInstance;
        fixture = TestBed.createComponent(HmctsTimelineComponent);
        component = fixture.componentInstance;
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should be created by angular', () => {
        expect(fixture).not.toBeNull();
    });
    it('should input data be undefined ', () => {
        expect(testHostComponent.hmctsTimelineComponent.events).toBeUndefined();
        testHostFixture.detectChanges();
        expect(testHostComponent.hmctsTimelineComponent.events).toBeDefined();
    });
    it('test if data gets passed ', () => {
        testHostFixture.detectChanges();
        expect(testHostComponent.hmctsTimelineComponent.events).toEqual(HmctsTimeline);
        expect(testHostComponent.hmctsTimelineComponent.events.length).toEqual(3);
    });
    it('test DOM if renders the loop ', () => {
        testHostFixture.detectChanges();
        de = testHostFixture.debugElement.queryAll(By.css('.hmcts-timeline__title'));
        expect(de.length).toEqual(3);
    });
    it('test DOM if renders the loop ', () => {
        testHostFixture.detectChanges();
        de = testHostFixture.debugElement.queryAll(By.css('.hmcts-timeline__item'));
        expect(de.length).toEqual(3);
    });
    it('should have container class hmcts-timeline', () => {
        testHostFixture.detectChanges();
        de = testHostFixture.debugElement.queryAll(By.css('.hmcts-timeline'));
        expect(de.length).toEqual(1);
    });
});
