import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HmctsSubNavigationComponent } from './hmcts-sub-navigation.component';
import {RouterTestingModule} from '@angular/router/testing';
import {mockLabel, mockNav} from './mock/hmcts-sub-navigation.mock';
import {Component, DebugElement, ViewChild} from '@angular/core';
import {By} from '@angular/platform-browser';
import {SubNavigation} from '../../models/nav';


@Component({
    selector: `app-host-dummy-component`,
    template: `<app-hmcts-sub-navigation [items]="items" [label]="label"></app-hmcts-sub-navigation>`
})
class TestDummyHostComponent {
    private label: string = mockLabel;
    private items: Array<SubNavigation>  = mockNav;
    @ViewChild(HmctsSubNavigationComponent)
    public HmctsSubNavigationComponent: HmctsSubNavigationComponent;
}

describe('HmctsSubNavigationComponent', () => {
    let component: HmctsSubNavigationComponent;
    let fixture: ComponentFixture<HmctsSubNavigationComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ HmctsSubNavigationComponent ],
            imports: [RouterTestingModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HmctsSubNavigationComponent);
        component = fixture.componentInstance;
        component.items = mockNav;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should be created by angular', () => {
        expect(fixture).not.toBeNull();
    });

});
describe('HmctsSubNavigationComponent: Testing Input & Outputs', () => {
    let testHostComponent: TestDummyHostComponent;
    let testHostFixture: ComponentFixture<TestDummyHostComponent>;

    let de: any;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ HmctsSubNavigationComponent, TestDummyHostComponent ],
            imports: [RouterTestingModule]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        testHostFixture = TestBed.createComponent(TestDummyHostComponent);
        testHostComponent = testHostFixture.componentInstance;
        // de = testHostFixture.debugElement.queryAll(By.css('.hmcts-sub-navigation__item'));
    });

    it('should show ITEMS pass data: Dataflow working ', () => {
        expect(testHostComponent.HmctsSubNavigationComponent.label).toBeUndefined();
        expect(testHostComponent.HmctsSubNavigationComponent.items).toBeUndefined();
        testHostFixture.detectChanges();
        de = testHostFixture.debugElement.queryAll(By.css('.hmcts-sub-navigation__item'));

        expect(testHostComponent.HmctsSubNavigationComponent.label).toEqual('Sub navigation');
        // expect(testHostFixture.debugElement.queryAll(By.css('.hmcts-sub-navigation__item'))[0].nativeElement.innerText).toEqual('');
        // expect(testHostFixture.debugElement.queryAll(By.css('.hmcts-sub-navigation__item'))[1].nativeElement.innerText).toEqual('Nav item 2Nav item 2');
        // expect(testHostFixture.debugElement.queryAll(By.css('.hmcts-sub-navigation__item'))[2].nativeElement.innerText).toEqual('Nav item 3Nav item 3');

        testHostComponent.HmctsSubNavigationComponent.items[1].active = true;
        //expect(testHostFixture.debugElement.queryAll(By.css('.hmcts-sub-navigation__item'))[1].nativeElement.innerText).toEqual('Nav item 2');
    });
    it('checking @Inputs are correct type ', () => {
        testHostFixture.detectChanges();
        expect( typeof testHostComponent.HmctsSubNavigationComponent.label === 'string').toBeTruthy();
        expect( testHostComponent.HmctsSubNavigationComponent.items instanceof Array).toBeTruthy();
    });

    it('should ITEMS have length of 3 items: NgFor working', () => {
        expect(testHostComponent.HmctsSubNavigationComponent.label).toBeUndefined();
        expect(testHostComponent.HmctsSubNavigationComponent.items).toBeUndefined();
        testHostFixture.detectChanges();
        expect(testHostFixture.debugElement.queryAll(By.css('.hmcts-sub-navigation__item')).length).toEqual(3);
    });


});


