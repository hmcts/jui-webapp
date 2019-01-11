import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {Component, CUSTOM_ELEMENTS_SCHEMA, DebugElement, Input, ViewChild} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {DocumentUploadComponent} from './document-upload.component';
import {DocumentStoreService} from '../../services/documentStore/document-store.service';
import {RedirectionService} from '../../../routing/redirection.service';
import {of} from 'rxjs';

describe('DocumentUploadComponent', () => {
    @Component({
        selector: `app-host-dummy-component`,
        template: `<app-document-upload
            [redirect]="redirect"
        ></app-document-upload>`
    })
    class TestDummyHostComponent {
       redirect = '/';

        @ViewChild(DocumentUploadComponent)
        public documentUploadComponent: DocumentUploadComponent;
    }

    let testHostComponent: TestDummyHostComponent;
    let testHostFixture: ComponentFixture<TestDummyHostComponent>;
    let el: DebugElement;
    let de: any;
    let component: DocumentUploadComponent;
    let fixture: ComponentFixture<DocumentUploadComponent>;
    let element: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule
            ],
            declarations: [
                DocumentUploadComponent,
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
                },
                {
                    provide: RedirectionService,
                    useValue: {
                        redirect: () => {
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
        fixture = TestBed.createComponent(DocumentUploadComponent);
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
        expect(testHostComponent.documentUploadComponent.redirect).toBeUndefined();
    });
    it('should display the actionSecondaryButton', () => {
        testHostFixture.detectChanges();
        expect(typeof testHostComponent.documentUploadComponent.redirect === 'string').toBeTruthy();
    });
});
