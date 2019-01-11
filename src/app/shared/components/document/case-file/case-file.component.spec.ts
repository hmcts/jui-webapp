import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseFileComponent } from './case-file.component';
import {Component, CUSTOM_ELEMENTS_SCHEMA, DebugElement, Input, ViewChild} from '@angular/core';
import {Selector} from '../../../selector-helper';
import {RouterTestingModule} from '@angular/router/testing';
import {By} from '@angular/platform-browser';

describe('CaseFileComponent', () => {
    @Component({
        selector: `app-host-dummy-component`,
        template: `<app-case-file
            [documents]="documents" 
            [selectedDocument]="selectedDocument"
            [documentUrl]="documentUrl"
            [caseFileType]="caseFileType"
            [allowAnnotations]="allowAnnotations"
        ></app-case-file>`
    })
    class TestDummyHostComponent {
        documents: any[] = [];
        selectedDocument: any;
        documentUrl: string;
        caseFileType: String;
        allowAnnotations: boolean;
        @ViewChild(CaseFileComponent)
        public caseFileComponent: CaseFileComponent;
    }

    let testHostComponent: TestDummyHostComponent;
    let testHostFixture: ComponentFixture<TestDummyHostComponent>;
    let el: DebugElement;
    let de: any;
    let component: CaseFileComponent;
    let fixture: ComponentFixture<CaseFileComponent>;
    let element: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule
            ],
            declarations: [ CaseFileComponent, TestDummyHostComponent ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        testHostFixture = TestBed.createComponent(TestDummyHostComponent);
        testHostComponent = testHostFixture.componentInstance;
    });
    beforeEach(() => {
        fixture = TestBed.createComponent(CaseFileComponent);
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
        expect(testHostComponent.caseFileComponent.documents).toBeUndefined();
        expect(testHostComponent.caseFileComponent.selectedDocument).toBeUndefined();
        expect(testHostComponent.caseFileComponent.documentUrl).toBeUndefined();
        expect(testHostComponent.caseFileComponent.caseFileType).toBeUndefined();
        expect(testHostComponent.caseFileComponent.allowAnnotations).toBeUndefined();
    });
    it('Data-selector: no-documents', () => {
        testHostFixture.detectChanges();
        expect(testHostFixture.debugElement.nativeElement.querySelector(Selector.selector('no-documents')).textContent).toContain('This case file is empty.');
    });
    it('should display the actionSecondaryButton', () => {
        testHostFixture.detectChanges();
        expect(typeof testHostComponent.caseFileComponent.documents === 'object').toBeTruthy();
        expect(typeof testHostComponent.caseFileComponent.documentUrl === 'string').toBeFalsy();
        expect(typeof testHostComponent.caseFileComponent.caseFileType === 'string').toBeFalsy();
    });

    it('testing update() function to change allowAnnotations value', () => {
        component.caseFileType = 'comment';
        component.ngOnInit();
        expect( component.caseFileType).toEqual('comment');
        expect( component.allowAnnotations).toEqual(true);
        component.caseFileType = 'something';
        component.ngOnChanges({});
        expect( component.allowAnnotations).toEqual(false);
    });
});
