import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CaseDetailsBarComponent } from './case-details-bar.component';
import {DebugElement} from '@angular/core';
import { Selector } from '../../../../../../test/selector-helper';

describe('CaseDetailsBarComponent', () => {
    let component: CaseDetailsBarComponent;
    let fixture: ComponentFixture<CaseDetailsBarComponent>;
    let element: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ CaseDetailsBarComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CaseDetailsBarComponent);
        component = fixture.componentInstance;
        element = fixture.debugElement;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('Setting inputs', () => {
        beforeEach(() => {
            component.case = {
                details: {
                    fields: [
                        {
                            value: '1234'
                        },
                        {
                            value: 'Alec DT vs DWP',
                        }
                    ]
                }};

            fixture.detectChanges();
        });

        it('should set a DataList Component for each section in panelData', () => {
            expect(element.nativeElement.querySelectorAll(Selector.selector('data-casebar-details-component')).length).toBe(1);
        });

        it(`should set the DataList Component's title to the sections name`, () => {
            const actualDetails = element.nativeElement.querySelectorAll(Selector.selector('data-casebar-details-component'));
            expect(actualDetails.textContent).toEqual(component.case.details.fields[0].textContent);
        });

        it(`should set the DataList Component's title to the sections name`, () => {
            const actualTitles = element.nativeElement.querySelectorAll(Selector.selector('data-casebar-title-component'));
            expect(actualTitles.textContent).toEqual(component.case.details.fields[1].textContent);
        });
    });
});

