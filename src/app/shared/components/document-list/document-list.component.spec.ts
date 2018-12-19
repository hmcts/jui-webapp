import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {Component, CUSTOM_ELEMENTS_SCHEMA, DebugElement, Input, ViewChild} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {DocumentStoreService} from '../../services/documentStore/document-store.service';
import {of} from 'rxjs';
import {DocumentListComponent} from './document-list.component';

describe('DocumentListComponent', () => {
    @Component({
        selector: `app-host-dummy-component`,
        template: `<app-document-list
            [page]="page"
            [sortby]="sortby"
            [order]="order"
            [size]="size"
        ></app-document-list>`
    })
    class TestDummyHostComponent {
       page = 0;
       sortby = 'desc';
       order = 'createdOn';
       size = 15;

        @ViewChild(DocumentListComponent)
        public documentListComponent: DocumentListComponent;
    }

    let testHostComponent: TestDummyHostComponent;
    let testHostFixture: ComponentFixture<TestDummyHostComponent>;
    let el: DebugElement;
    let de: any;
    let component: DocumentListComponent;
    let fixture: ComponentFixture<DocumentListComponent>;
    let element: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule
            ],
            declarations: [
                DocumentListComponent,
                TestDummyHostComponent
            ],
            providers: [
                {
                    provide: DocumentStoreService,
                    useValue: {
                        convertUrlToProxy: () => {
                            return '';
                        },
                        postFile: () => {
                            return of({});
                        },
                        deleteDocument: () => {
                            return of({});
                        },
                        getCreatorDocuments: () => {
                            return of({});
                        },
                        getDmFindByCreatorUrlWithParams:() => {
                            return '';
                        }
                    }
                }

            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        testHostFixture = TestBed.createComponent(TestDummyHostComponent);
        testHostComponent = testHostFixture.componentInstance;
    });
    beforeEach(() => {
        fixture = TestBed.createComponent(DocumentListComponent);
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
        expect(testHostComponent.documentListComponent.page).toBeUndefined();
        expect(testHostComponent.documentListComponent.sortby).toBeUndefined();
        expect(testHostComponent.documentListComponent.order).toBeUndefined();
        expect(testHostComponent.documentListComponent.size).toBeUndefined();
    });
    it('should display the actionSecondaryButton', () => {
        testHostFixture.detectChanges();
        expect(typeof testHostComponent.documentListComponent.page === 'number').toBeTruthy();
        expect(typeof testHostComponent.documentListComponent.sortby === 'string').toBeTruthy();
        expect(typeof testHostComponent.documentListComponent.order === 'string').toBeTruthy();
        expect(typeof testHostComponent.documentListComponent.size === 'number').toBeTruthy();
    });
});
