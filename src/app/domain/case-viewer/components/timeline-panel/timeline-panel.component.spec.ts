import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CaseViewerModule } from '../../case-viewer.module';
import { TimelinePanelComponent } from './timeline-panel.component';
import { DebugElement } from '@angular/core';
import { Selector } from '../../../../../../test/selector-helper';

describe('TimelinePanelComponent', () => {
    let component: TimelinePanelComponent;
    let fixture: ComponentFixture<TimelinePanelComponent>;
    let element: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CaseViewerModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TimelinePanelComponent);
        component = fixture.componentInstance;
        element = fixture.debugElement;
    });

    it('should create', () => {
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
                                event_name: 'HEARING',
                                user_first_name: 'John',
                                user_last_name: 'Smith',
                                created_date: new Date()
                            },
                            {
                                event_name: 'CREATED_EVENT',
                                user_first_name: 'Gilbert',
                                user_last_name: 'Smith',
                                created_date: new Date()
                            }
                        ]
                    }
                ]
            };

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
            expect(element.nativeElement.querySelectorAll(Selector.selector('timeline-by'))[0].textContent).toBe('by John Smith');
            expect(element.nativeElement.querySelectorAll(Selector.selector('timeline-by'))[1].textContent).toBe('by Gilbert Smith');
        });

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
            }

            fixture.whenStable().then(() => {
                fixture.detectChanges();
            });
        }));
        it('should see no events', () => {
            expect(element.nativeElement.querySelectorAll(Selector.selector('timeline-item')).length).toBe(0);
        });
    });
});

