import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CaseFileToolBarComponent } from './case-file-tool-bar.component';
import {Component, CUSTOM_ELEMENTS_SCHEMA, DebugElement, Input, ViewChild} from '@angular/core';
import {By} from '@angular/platform-browser';
import {Selector} from '../../../selector-helper';
import {RouterTestingModule} from '@angular/router/testing';

describe('CaseFileToolBarComponent', () => {
    @Component({
        selector: `app-host-dummy-component`,
        template: `<app-case-file-tool-bar
                    [reference]="iconFallbackText"
                    [title]="type"
                    [items]="text"></app-case-file-tool-bar>`
    })
    class TestDummyHostComponent {
        commentViewRedirect = {
            command: [],
            extra: { queryParams: { type: 'comment'} }
        };

        listViewRedirect = {
            command: [],
            extra: {queryParams: {type: 'list'}}
        };
        @ViewChild(CaseFileToolBarComponent)
        public caseFileToolBarComponent: CaseFileToolBarComponent;
    }
    let testHostComponent: TestDummyHostComponent;
    let testHostFixture: ComponentFixture<TestDummyHostComponent>;
    let el: DebugElement;
    let de: any;
    let component: CaseFileToolBarComponent;
    let fixture: ComponentFixture<CaseFileToolBarComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [ CaseFileToolBarComponent, TestDummyHostComponent ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        testHostFixture = TestBed.createComponent(TestDummyHostComponent);
        testHostComponent = testHostFixture.componentInstance;
        fixture = TestBed.createComponent(CaseFileToolBarComponent);
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
        expect(testHostComponent.caseFileToolBarComponent.commentViewRedirect).toBeUndefined();
        expect(testHostComponent.caseFileToolBarComponent.listViewRedirect).toBeUndefined();
        testHostFixture.detectChanges();
    });
    it('should display the title', () => {
        testHostFixture.detectChanges();
        expect(testHostFixture.debugElement.nativeElement.querySelector(Selector.selector('button-items')).textContent).toBe(' All items ');
        expect(testHostFixture.debugElement.nativeElement.querySelector(Selector.selector('button-comments')).textContent).toBe(' Comments ');
    });
    it('test if listViewRedirect.extra data works', () => {
        testHostComponent.caseFileToolBarComponent.commentViewRedirect = {
            command: [],
            extra: { queryParams: { type: 'comment'} }
        };
        testHostComponent.caseFileToolBarComponent.listViewRedirect = {
            command: [],
            extra: {queryParams: {type: 'list'}}
        };
        testHostFixture.detectChanges();
        fixture.detectChanges();
        expect(testHostComponent.caseFileToolBarComponent.commentViewRedirect.extra).toEqual({queryParams: {type: 'comment'} });
        expect(testHostComponent.caseFileToolBarComponent.listViewRedirect.extra).toEqual({queryParams: {type: 'list'} });
    });
});
