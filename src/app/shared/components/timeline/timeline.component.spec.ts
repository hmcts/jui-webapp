import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CaseViewerModule } from '../../../domain/case-viewer/case-viewer.module';
import { DebugElement } from '@angular/core';
import { Selector } from '../../../../../test/selector-helper';
import {TimelineComponent} from './timeline.component';
import {HmctsTimelineComponent} from '../../../hmcts/components/hmcts-timeline/hmcts-timeline.component';
import {SentenceCasePipe} from '../../../hmcts/pipes/sentence-case/sentence-case-pipe';

describe('TimelineComponent', () => {
    let component: TimelineComponent;
    let fixture: ComponentFixture<TimelineComponent>;
    let element: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TimelineComponent, HmctsTimelineComponent, SentenceCasePipe]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TimelineComponent);
        component = fixture.componentInstance;
        element = fixture.debugElement;
        fixture.detectChanges();
    });

    xit('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('when some data is available', () => {
        beforeEach(async(() => {
            component.events = [
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
            ];

            fixture.whenStable().then(() => {
                fixture.detectChanges();
            });
        }));

        xit('should see two events', () => {
            expect(element.nativeElement.querySelectorAll(Selector.selector('timeline-item')).length).toBe(2);
        });

        xit('should see Hearing first and Created_event second', () => {
            expect(element.nativeElement.querySelectorAll(Selector.selector('timeline-event-name'))[0].textContent).toBe('Hearing');
            expect(element.nativeElement.querySelectorAll(Selector.selector('timeline-event-name'))[1].textContent).toBe('Created_event');
        });

        xit('should see John first and Gilbert second', () => {
            expect(element.nativeElement.querySelectorAll(Selector.selector('timeline-by'))[0].textContent).toBe(' by John Smith');
            expect(element.nativeElement.querySelectorAll(Selector.selector('timeline-by'))[1].textContent).toBe(' by Gilbert Smith');
        });
    });
});
