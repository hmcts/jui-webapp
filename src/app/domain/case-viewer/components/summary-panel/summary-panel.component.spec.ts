import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CaseViewerModule } from '../../case-viewer.module';
import { SummaryPanelComponent } from './summary-panel.component';
import { DebugElement } from '@angular/core';
import { Selector } from '../../../../../../test/selector-helper';

describe('SummaryPanelComponent', () => {
    let component: SummaryPanelComponent;
    let fixture: ComponentFixture<SummaryPanelComponent>;
    let element: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CaseViewerModule]
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
            component.panelData.sections.map((expectedItem, index) => {
                expect(actualTitles[index].textContent).toEqual(expectedItem.name);
            });
        });
    });
});

