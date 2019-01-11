import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HmctsDetailsBarComponent } from './hmcts-details-bar.component';
import {Component, CUSTOM_ELEMENTS_SCHEMA, DebugElement, Input, ViewChild} from '@angular/core';
import {By} from '@angular/platform-browser';
describe('HmctsDetailsBarComponent', () => {
    @Component({
        selector: `app-host-dummy-component`,
        template: `<app-hmcts-details-bar  
                    [reference]="iconFallbackText"
                    [title]="type"
                    [items]="text"></app-hmcts-details-bar>`
    })
    class TestDummyHostComponent {
        reference = 'FR1231612322';
        title = {
            html: '<b>John Smith</b> v <b>Jane Smith</b>'
        };
        items = [
            {
                text: 'Make a decision'
            },
            {
                classes: 'hmcts-button--secondary',
                text: 'List for hearing'
            }
        ];
        @ViewChild(HmctsDetailsBarComponent)
        public hmctsDetailsBarComponent: HmctsDetailsBarComponent;
    }
    let testHostComponent: TestDummyHostComponent;
    let testHostFixture: ComponentFixture<TestDummyHostComponent>;
    let el: DebugElement;
    let de: any;
    let component: HmctsDetailsBarComponent;
    let fixture: ComponentFixture<HmctsDetailsBarComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
          declarations: [ HmctsDetailsBarComponent, TestDummyHostComponent ],
          schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
        .compileComponents();
    }));
    beforeEach(() => {
        testHostFixture = TestBed.createComponent(TestDummyHostComponent);
        testHostComponent = testHostFixture.componentInstance;
        fixture = TestBed.createComponent(HmctsDetailsBarComponent);
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
        expect(testHostComponent.hmctsDetailsBarComponent.reference).toBeUndefined();
        expect(testHostComponent.hmctsDetailsBarComponent.items).toBeUndefined();
        expect(testHostComponent.hmctsDetailsBarComponent.title).toBeUndefined();
        testHostFixture.detectChanges();
    });
    it('should not render any button class as item is undefined', () => {
        expect(testHostFixture.debugElement.queryAll(By.css('.govuk-button')).length).toEqual(0);
    });
    it('test DOM if the title is listed ', () => {
        testHostFixture.detectChanges();
        component.title = {
            html: '<b>John Smith</b> v <b>Jane Smith</b>'
        };
        fixture.detectChanges();
        expect(component.title.html).toEqual('<b>John Smith</b> v <b>Jane Smith</b>');
    });
    it('@input fiels be the correct type', () => {
        component.reference = 'FR12316xxxx';
        component.title = {
            html: '<b>John Smith</b> v <b>Jane Smith</b>'
        };
        fixture.detectChanges();
        expect( typeof component.reference === 'string').toBeTruthy();
        expect( typeof component.title === 'object').toBeTruthy();
    });
});
