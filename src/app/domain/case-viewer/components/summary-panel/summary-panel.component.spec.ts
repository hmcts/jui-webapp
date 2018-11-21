import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CaseViewerModule } from '../../case-viewer.module';
import { SummaryPanelComponent } from './summary-panel.component';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { Selector } from '../../../../../../test/selector-helper';
import { RouterTestingModule } from '@angular/router/testing';
import { mockPanelData } from './mock/summary-panel.mock';

describe('SummaryPanelComponent', () => {
    let component: SummaryPanelComponent;
    let fixture: ComponentFixture<SummaryPanelComponent>;
    let element: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
            component.panelData = mockPanelData;
            fixture.detectChanges();
        });

        xit('should set a DataList Component for each section in panelData', () => {
            expect(element.nativeElement.querySelectorAll(Selector.selector('data-list-component')).length).toBe(2);
        });

        xit(`should set the DataList Component's title to the sections name`, () => {
            const actualTitles = element.nativeElement.querySelectorAll(Selector.selector('title'));
            component.panelData.sections.filter(s => s.type !== 'timeline').map((expectedItem, index) => {
                expect(actualTitles[index].textContent).toEqual(expectedItem.name);
            });
        });

        xit(`should see the recent events`, () => {
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

