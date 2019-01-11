import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseActionsComponent } from './case-actions.component';
import {RouterTestingModule} from '@angular/router/testing';
import {Component, CUSTOM_ELEMENTS_SCHEMA, DebugElement, Input, ViewChild} from '@angular/core';
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LinkItem} from '../../../domain/models/section_fields';
import {Selector} from '../../selector-helper';

describe('CaseActionsComponent', () => {
    @Component({
        selector: `app-host-dummy-component`,
        template: `<app-case-actions 
            [header]="header" 
            [actionPrimaryButton]="actionPrimaryButton"
            [actionSecondaryButton]="actionSecondaryButton"
        ></app-case-actions>`
    })
    class TestDummyHostComponent {
        header =  'Questions';
        actionPrimaryButton: LinkItem = {href: '../decision/create', text: 'Make decision'};
        actionSecondaryButton: LinkItem = {href: '../hearing/list', text: 'List for hearing'};
        @ViewChild(CaseActionsComponent)
        public caseActionsComponent: CaseActionsComponent;
    }

    let testHostComponent: TestDummyHostComponent;
    let testHostFixture: ComponentFixture<TestDummyHostComponent>;
    let el: DebugElement;
    let de: any;
    let component: CaseActionsComponent;
    let fixture: ComponentFixture<CaseActionsComponent>;
    let element: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                FormsModule,
                RouterTestingModule
            ],
            declarations: [ CaseActionsComponent, TestDummyHostComponent ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        testHostFixture = TestBed.createComponent(TestDummyHostComponent);
        testHostComponent = testHostFixture.componentInstance;
    });
    beforeEach(() => {
        fixture = TestBed.createComponent(CaseActionsComponent);
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
        expect(testHostComponent.caseActionsComponent.header).toBeUndefined();
        expect(testHostComponent.caseActionsComponent.actionPrimaryButton).toBeUndefined();
        expect(testHostComponent.caseActionsComponent.actionSecondaryButton).toBeUndefined();
        });
    it('should load data', () => {
        testHostFixture.detectChanges();
        expect(testHostComponent.caseActionsComponent.header).toEqual('Questions');
        expect(testHostComponent.caseActionsComponent.actionPrimaryButton).toEqual({href: '../decision/create', text: 'Make decision'});
    });
    it('should display the title', () => {
        testHostFixture.detectChanges();
        expect(testHostFixture.debugElement.nativeElement.querySelector(Selector.selector('heading')).textContent).toBe(testHostComponent.caseActionsComponent.header);
    });
    it('should display the actionPrimaryButton', () => {
        testHostFixture.detectChanges();
        expect(testHostFixture.debugElement.nativeElement.querySelector(Selector.selector('primary-button')).textContent).toContain(testHostComponent.caseActionsComponent.actionPrimaryButton.text);
    });
    it('should display the actionSecondaryButton', () => {
        testHostFixture.detectChanges();
        expect(testHostFixture.debugElement.nativeElement.querySelector(Selector.selector('secondary-button')).textContent).toContain(testHostComponent.caseActionsComponent.actionSecondaryButton.text);
    });
    it('should display the actionSecondaryButton', () => {
        testHostFixture.detectChanges();
        expect(typeof testHostComponent.caseActionsComponent.header === 'string').toBeTruthy();
        expect(typeof testHostComponent.caseActionsComponent.actionPrimaryButton === 'object').toBeTruthy();
        expect(typeof testHostComponent.caseActionsComponent.actionSecondaryButton === 'object').toBeTruthy();
    });
});
