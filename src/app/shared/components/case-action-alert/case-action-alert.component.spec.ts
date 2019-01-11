import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CaseActionAlertComponent } from './case-action-alert.component';
import {Component, CUSTOM_ELEMENTS_SCHEMA, DebugElement, Input, ViewChild} from '@angular/core';
import {Selector} from '../../selector-helper';
import {RouterTestingModule} from '@angular/router/testing';

describe('CaseActionAlertComponent', () => {
    @Component({
        selector: `app-host-dummy-component`,
        template: `<app-case-action-alert
            [title]="title" 
            [href]="href"
            [status]="status"
        ></app-case-action-alert>`
    })
    class TestDummyHostComponent {
        title = 'Decision needed';
        href = '#';
        status = { name: 'Some action', actionGoTo: '#', ID: '123'};
        state = '';
        @ViewChild(CaseActionAlertComponent)
        public caseActionAlertComponent: CaseActionAlertComponent;
    }

    let testHostComponent: TestDummyHostComponent;
    let testHostFixture: ComponentFixture<TestDummyHostComponent>;
    let el: DebugElement;
    let de: any;
    let component: CaseActionAlertComponent;
    let fixture: ComponentFixture<CaseActionAlertComponent>;
    let element: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule
            ],
            declarations: [ CaseActionAlertComponent, TestDummyHostComponent ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        testHostFixture = TestBed.createComponent(TestDummyHostComponent);
        testHostComponent = testHostFixture.componentInstance;
    });
    beforeEach(() => {
        fixture = TestBed.createComponent(CaseActionAlertComponent);
        component = fixture.componentInstance;
        element = fixture.debugElement;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should be created by angular', () => {
        expect(fixture).not.toBeNull();
    });
    it('should be all data undefined until detectChanges kicks in', () => {
        expect(testHostComponent.caseActionAlertComponent.href).toBeUndefined();
        expect(testHostComponent.caseActionAlertComponent.state).toBeDefined();
        expect(testHostComponent.caseActionAlertComponent.title).toBeUndefined();
    });
    it('should load data', () => {
        testHostFixture.detectChanges();
        expect(testHostComponent.caseActionAlertComponent.title).toEqual('Decision needed');
        expect(testHostComponent.caseActionAlertComponent.status).toEqual( { name: 'Some action', actionGoTo: '#', ID: '123'});
        expect(testHostComponent.caseActionAlertComponent.href).toEqual( '../#/123');
    });
    it('should display the title', () => {
        testHostFixture.detectChanges();
        expect(testHostFixture.debugElement.nativeElement.querySelector(Selector.selector('title')).textContent).toBe(testHostComponent.caseActionAlertComponent.title);
    });
    it('should display the actionPrimaryButton', () => {
        testHostFixture.detectChanges();
        expect(testHostFixture.debugElement.nativeElement.querySelector(Selector.selector('primary-button')).textContent).toContain(testHostComponent.caseActionAlertComponent.status.name);
    });
    it('should load have ID in URL` ', () => {
        testHostFixture.detectChanges();
        expect(testHostComponent.caseActionAlertComponent.href).toEqual(`../#/123`);
    });
    it('should load  `../${this.status.actionGoTo}` ', () => {
        testHostComponent.caseActionAlertComponent.status = {};
        const tempStatus = { name: 'Some action', actionGoTo: '#', ID: ''};
        testHostComponent.caseActionAlertComponent.status = tempStatus;
        testHostComponent.caseActionAlertComponent.ngOnInit();
        expect(testHostComponent.caseActionAlertComponent.status).toEqual({ name: 'Some action', actionGoTo: '#', ID: '' });
        expect(testHostComponent.caseActionAlertComponent.href).toEqual(`../#`);
        expect(testHostComponent.caseActionAlertComponent.state).toEqual(testHostComponent.caseActionAlertComponent.status.name);
    });
    it('should display the actionSecondaryButton', () => {
        testHostFixture.detectChanges();
        expect(typeof testHostComponent.caseActionAlertComponent.href === 'string').toBeTruthy();
        expect(typeof testHostComponent.caseActionAlertComponent.status === 'object').toBeTruthy();
        expect(typeof testHostComponent.caseActionAlertComponent.title === 'string').toBeTruthy();
    });
});
