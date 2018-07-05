import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CaseViewerModule } from '../../case-viewer.module';
import { SummaryPanelComponent } from './summary-panel.component';
import { DebugElement } from '@angular/core';
import { Selector } from '../../../../../../test/selector-helper';
import {RouterTestingModule} from '@angular/router/testing';

describe('SummaryPanelComponent', () => {
    let component: SummaryPanelComponent;
    let fixture: ComponentFixture<SummaryPanelComponent>;
    let element: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CaseViewerModule, RouterTestingModule]
        })
       .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SummaryPanelComponent);
        component = fixture.componentInstance;
        element = fixture.debugElement;
    });

    it('should create', () => {
        expect(component)
            .toBeTruthy();
    });

    describe('Setting inputs', () => {
        beforeEach(() => {

            component.panelData = {
                'name': 'Summary',
                'type': 'summary-panel',
                'sections': [
                    {
                        'name': 'Case Details',
                        'fields': [
                            {
                                'label': 'Parties',
                                'value': 'A May_146863 vs DWP'
                            },
                            {
                                'label': 'Case number',
                                'value': 'SC001/01/46863'
                            },
                        ]
                    },
                    {
                        'name': 'Representative',
                        'fields': [
                            {
                                'label': 'Judge',
                                'value': 'na'
                            },
                            {
                                'label': 'Medical Member',
                                'value': 'na'
                            },
                            {
                                'label': 'Disability qualified member',
                                'value': 'na'
                            }
                        ]
                    },
                    {
                        'id': 'recentEvents',
                        'name': 'Recent events',
                        'fields': [
                            {
                                'value': [
                                    {
                                        'event_name': 'Create/update Panel',
                                        'user_first_name': 'John',
                                        'user_last_name': 'Smith',
                                        'created_date': '2018-07-05T11:37:44.854'
                                    },
                                    {
                                        'event_name': 'Appeal created',
                                        'user_first_name': 'Gilbert',
                                        'user_last_name': 'Smith',
                                        'created_date': '2018-07-05T11:36:51.125'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            };

            fixture.detectChanges();
        });

        it('should set a DataList Component for each section in panelData', () => {
            expect(element.nativeElement.querySelectorAll(Selector.selector('data-list-component')).length).toBe(2);
        });

        it(`should set the DataList Component's title to the sections name`, () => {
            const actualTitles = element.nativeElement.querySelectorAll(Selector.selector('title'));
            component.panelData.sections.filter(s => s.id !== 'recentEvents').map((expectedItem, index) => {
                expect(actualTitles[index].textContent).toEqual(expectedItem.name);
            });
        });

        it(`should see the recent events`, () => {
            it('should see two events', () => {
                expect(element.nativeElement.querySelectorAll(Selector.selector('timeline-item')).length).toBe(2);
            });

            it('should see HEARING first and CREATED_EVENT second', () => {
                expect(element.nativeElement.querySelectorAll(
                    Selector.selector('timeline-event-name'))[0].textContent).toBe('Create/update Panel');
                expect(element.nativeElement.querySelectorAll(
                    Selector.selector('timeline-event-name'))[1].textContent).toBe('Appeal created');
            });

            it('should see John first and Gilbert second', () => {
                expect(element.nativeElement.querySelectorAll(Selector.selector('timeline-by'))[0].textContent).toBe('by John Smith');
                expect(element.nativeElement.querySelectorAll(Selector.selector('timeline-by'))[1].textContent).toBe('by Gilbert Smith');
            });
        });
    });
});

