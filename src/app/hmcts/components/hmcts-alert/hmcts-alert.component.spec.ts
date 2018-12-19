import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HmctsAlertComponent } from './hmcts-alert.component';
import {Component, CUSTOM_ELEMENTS_SCHEMA, DebugElement, Input, ViewChild} from '@angular/core';
import {By} from '@angular/platform-browser';

describe('HmctsAlertComponent', () => {
    @Component({
        selector: `app-host-dummy-component`,
        template: `<app-hmcts-alert  [iconFallbackText]="iconFallbackText"
                                     [type]="type"
                                     [text]="text"></app-hmcts-alert>`
    })
    class TestDummyHostComponent {
        type = 'information';
        text = 'Select text to add a comment.';
        iconFallbackText = 'Success';
        @ViewChild(HmctsAlertComponent)
        public hmctsAlertComponent: HmctsAlertComponent;
    }
    let testHostComponent: TestDummyHostComponent;
    let testHostFixture: ComponentFixture<TestDummyHostComponent>;
    let el: DebugElement;
    let de: any;
    let component: HmctsAlertComponent;
    let fixture: ComponentFixture<HmctsAlertComponent>;
    let element: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
          declarations: [ HmctsAlertComponent, TestDummyHostComponent ],
          schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        testHostFixture = TestBed.createComponent(TestDummyHostComponent);
        testHostComponent = testHostFixture.componentInstance;
    });
    beforeEach(() => {
        fixture = TestBed.createComponent(HmctsAlertComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
    expect(component).toBeTruthy();
    });
    it('should be created by angular', () => {
        expect(fixture).not.toBeNull();
    });

    it('should @input fields data be undefined', () => {
        expect(testHostComponent.hmctsAlertComponent.iconFallbackText).toBeUndefined();
        expect(testHostComponent.hmctsAlertComponent.text).toBeUndefined();
        expect(testHostComponent.hmctsAlertComponent.type).toBeUndefined();
        testHostFixture.detectChanges();
    });

    it('@input fiels be the correct type', () => {
        testHostFixture.detectChanges();
        expect( typeof testHostComponent.hmctsAlertComponent.iconFallbackText === 'string').toBeTruthy();
        expect( typeof testHostComponent.hmctsAlertComponent.type === 'string').toBeTruthy();
        expect( typeof testHostComponent.hmctsAlertComponent.type === 'string').toBeTruthy();
    });
    it('@input field check if data is set correctly', () => {
        testHostComponent.type = 'success';
        testHostFixture.detectChanges();
        expect(testHostComponent.hmctsAlertComponent.type).toEqual('success');
    });
    it('@input fields to check if class gets set valid: success', () => {
        testHostComponent.type = 'success';
        testHostFixture.detectChanges();
        const alertSuccessClass = testHostFixture.debugElement.query(By.css('.hmcts-alert--success'))
        expect(alertSuccessClass.classes['hmcts-alert--success']).toBeTruthy();
    });
    it('@input field type get set correctly but we select a wrong class', () => {
        testHostComponent.type = 'warning';
        testHostFixture.detectChanges();
        const alertSuccessClass = testHostFixture.debugElement.query(By.css('.hmcts-alert--warning'))
        expect(alertSuccessClass.classes['hmcts-alert--success']).toBeFalsy();
    });
    it('@input field set iconFallbackText and able to read DOM text field', () => {
        testHostFixture.detectChanges();
        const alertSuccessClass = testHostFixture.debugElement.query(By.css('.hmcts-alert__assistive'));
        expect(alertSuccessClass.nativeElement.textContent).toContain('Success');
        expect(testHostFixture.debugElement.query(By.css('.hmcts-alert__message')).nativeElement.textContent).toContain('Select text to add a comment.'); //'Success'
    });
    it('@input field iconFallbackText get set undifinied', () => {
        testHostComponent.iconFallbackText = undefined;
        testHostFixture.detectChanges();
        const alertSuccessClass = testHostFixture.debugElement.query(By.css('.hmcts-alert__assistive'))
        expect(alertSuccessClass).toBeFalsy();
    });

});
