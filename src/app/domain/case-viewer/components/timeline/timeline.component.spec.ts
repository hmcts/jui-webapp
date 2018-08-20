import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CaseViewerModule } from '../../case-viewer.module';
import { DebugElement } from '@angular/core';
import { Selector } from '../../../../../../test/selector-helper';
import {TimelineComponent} from './timeline.component';
import {GovukModule} from '../../../../govuk/govuk.module';
import {HmctsModule} from '../../../../hmcts/hmcts.module';

describe('TimelineComponent', () => {
    let component: TimelineComponent;
    let fixture: ComponentFixture<TimelineComponent>;
    let element: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CaseViewerModule, GovukModule, HmctsModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TimelineComponent);
        component = fixture.componentInstance;
        element = fixture.debugElement;
        fixture.detectChanges();
    });

    it('should create', () => {
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

        it('should see two events', () => {
            expect(element.nativeElement.querySelectorAll(Selector.selector('timeline-item')).length).toBe(2);
        });

        it('should see HEARING first and CREATED_EVENT second', () => {
            expect(element.nativeElement.querySelectorAll(Selector.selector('timeline-event-name'))[0].textContent).toBe('HEARING');
            expect(element.nativeElement.querySelectorAll(Selector.selector('timeline-event-name'))[1].textContent).toBe('CREATED_EVENT');
        });

        it('should see John first and Gilbert second', () => {
            expect(element.nativeElement.querySelectorAll(Selector.selector('timeline-by'))[0].textContent).toBe(' by John Smith');
            expect(element.nativeElement.querySelectorAll(Selector.selector('timeline-by'))[1].textContent).toBe(' by Gilbert Smith');
        });
    });
});
