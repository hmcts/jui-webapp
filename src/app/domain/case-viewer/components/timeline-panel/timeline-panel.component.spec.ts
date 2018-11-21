import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CaseViewerModule } from '../../case-viewer.module';
import { TimelinePanelComponent } from './timeline-panel.component';
import {CUSTOM_ELEMENTS_SCHEMA, DebugElement} from '@angular/core';
import { Selector } from '../../../../../../test/selector-helper';
import {SentenceCasePipe} from '../../../../hmcts/pipes/sentence-case/sentence-case-pipe';
import {HmctsTimelineComponent} from '../../../../hmcts/components/hmcts-timeline/hmcts-timeline.component';
import {TimelineComponent} from '../../../../shared/components/timeline/timeline.component';

describe('TimelinePanelComponent', () => {
    let component: TimelinePanelComponent;
    let fixture: ComponentFixture<TimelinePanelComponent>;
    let element: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            declarations: [TimelinePanelComponent, TimelineComponent, HmctsTimelineComponent, SentenceCasePipe]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TimelinePanelComponent);
        component = fixture.componentInstance;
        element = fixture.debugElement;
    });

    xit('should create', () => {
        expect(component)
            .toBeTruthy();
    });

    describe('When there is some data', () => {
        beforeEach(async(() => {
            component.panelData = {
                name: 'events',
                type: 'timeline-panel',
                fields: [
                    {
                        value: [
                            {
                                title: 'HEARING',
                                by: 'John Smith',
                                dateUtc: '2018-08-06T15:14:11Z',
                                date: '6 Aug 2018',
                                time: '15:14pm',
                                documents: []
                            },
                            {
                                title: 'CREATED_EVENT',
                                by: 'Gilbert Smith',
                                dateUtc: '2018-08-06T15:14:11Z',
                                date: '6 Aug 2018',
                                time: '15:14pm',
                                documents: []
                            }
                        ]
                    }
                ]
            };
            fixture.whenStable().then(() => {
                fixture.detectChanges();
            });
        }));

        // xit('should see two events', () => {
        //     expect(element.nativeElement.querySelectorAll(Selector.selector('timeline-item')).length).toBe(2);
        // });
        //
        // xit('should see Hearing first and Created_event second', () => {
        //     expect(element.nativeElement.querySelectorAll(Selector.selector('timeline-event-name'))[0].textContent).toBe('Hearing');
        //     expect(element.nativeElement.querySelectorAll(Selector.selector('timeline-event-name'))[1].textContent).toBe('Created_event');
        // });
        //
        // xit('should see John first and Gilbert second', () => {
        //     expect(element.nativeElement.querySelectorAll(Selector.selector('timeline-by'))[0].textContent).toBe(' by John Smith');
        //     expect(element.nativeElement.querySelectorAll(Selector.selector('timeline-by'))[1].textContent).toBe(' by Gilbert Smith');
        // });

    });

    describe('When there is no data', () => {
        beforeEach(async(() => {
            component.panelData = {
                name: 'events',
                type: 'timeline-panel',
                fields: [
                    {
                        value: []
                    }
                ]
            };
            fixture.whenStable().then(() => {
                fixture.detectChanges();
            });
        }));
        xit('should see no events', () => {
            expect(element.nativeElement.querySelectorAll(Selector.selector('timeline-item')).length).toBe(0);
        });
    });
});

