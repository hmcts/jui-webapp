import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Component, CUSTOM_ELEMENTS_SCHEMA, DebugElement, ViewChild} from '@angular/core';
import {PageDateCaseBar} from '../../models/section_fields';
import {CaseBarComponent} from './casebar.component';
import {CaseService} from '../../services/case.service';
import {mockCaseBarData} from './mock/case.mock';
import {ExchangeService} from '../../services/exchange.service';

describe('CaseBarComponent Component: Testing Input & Output', () => {
    @Component({
        selector: `app-host-dummy-component`,
        template: `<app-casebar [case]="data"></app-casebar>`
    })
    class TestDummyHostComponent {
        public data:  PageDateCaseBar = mockCaseBarData;
        @ViewChild(CaseBarComponent)
        public caseBarComponent: CaseBarComponent;
    }
    let testHostComponent: TestDummyHostComponent;
    let testHostFixture: ComponentFixture<TestDummyHostComponent>;
    let el: DebugElement;
    let de: any;
    let component: CaseBarComponent;
    let fixture: ComponentFixture<CaseBarComponent>;
    let element: DebugElement;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            providers: [
                CaseService,
                {
                    provide: {
                        ExchangeService,
                        useValue: {
                            events: [
                                {
                                    isHidden: true
                                }
                            ]
                        }
                    }
                }
            ],
            declarations: [ CaseBarComponent, TestDummyHostComponent ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        testHostFixture = TestBed.createComponent(TestDummyHostComponent);
        testHostComponent = testHostFixture.componentInstance;
    });
    beforeEach(() => {
        fixture = TestBed.createComponent(CaseBarComponent);
        component = fixture.componentInstance;
        element = fixture.debugElement;
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should be created by angular', () => {
        expect(fixture).not.toBeNull();
    });

    it('should @input case not load', () => {
        expect(testHostComponent.caseBarComponent.case).toBeUndefined();
        testHostFixture.detectChanges();
    });

    it('@input case should have data loaded', () => {
        testHostFixture.detectChanges();
        expect( typeof testHostComponent.caseBarComponent.case === 'object').toBeTruthy();
    });
    it('@input case check fields', () => {
        testHostFixture.detectChanges();
        expect( testHostComponent.caseBarComponent.case.details.fields.length).toEqual(2);
        expect( testHostComponent.caseBarComponent.case.id).toEqual('123123123');
    });
    it('Exchange service included', () => {
        testHostFixture.detectChanges();
        component.ngOnInit();
        expect(component.isHidden).toBe(false);
    });

    it('Exchange service included', () => {
        expect(component.isHidden).toBeFalsy();
    });
});

