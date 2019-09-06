import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentPanelComponent } from './document-panel.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CaseViewerModule } from '../../case-viewer.module';
import { ConfigService } from '../../../../config.service';
import { RouterTestingModule } from '@angular/router/testing';
import { TransferState } from '@angular/platform-browser';
import { Selector } from '../../../../shared/selector-helper';
import { AuthService } from '../../../../auth/auth.service';


class MockAuthService {
    getLoggedInUserRoles() {
        return ['roleA', 'roleB'];
    }
}

describe('DocumentPanelComponent', () => {
    let component: DocumentPanelComponent;
    let fixture: ComponentFixture<DocumentPanelComponent>;
    let nativeElement;
    let mockRoute;
    let mockConfigService;
    let documentList;
    let data;

    function createComponent() {
        fixture = TestBed.createComponent(DocumentPanelComponent);
        component = fixture.componentInstance;
        component.docList = documentList;
        component.panelData = data;
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();
    }

    describe('when we have a document id in the url', () => {
        beforeEach(async(() => {
            documentList = [
                {
                    id: '13eb9981-9360-4d4b-b9fd-506b5818e7ff',
                    _links: {
                        self: {
                            href: 'http://dm.internal/documents/13eb9981-9360-4d4b-b9fd-506b5818e7ff'
                        }
                    },
                    createdOn: new Date()
                }
            ];

            mockRoute = {
                params: of({
                    'section_item_id': '13eb9981-9360-4d4b-b9fd-506b5818e7ff'
                }),
                snapshot: {
                    params: {
                        'section_item_id': '13eb9981-9360-4d4b-b9fd-506b5818e7ff'
                    }
                },
                queryParamMap: new Observable()
            };
            mockConfigService = {
                config: {
                    api_base_url: 'http://localhost:3000'
                }
            };

            TestBed.configureTestingModule({
                imports: [
                    CaseViewerModule,
                    RouterTestingModule
                ],
                declarations: [],
                providers: [
                    {
                        provide: ActivatedRoute,
                        useValue: mockRoute
                    },
                    {
                        provide: ConfigService,
                        useValue: mockConfigService
                    },
                    {
                        provide: AuthService,
                        useClass: MockAuthService
                    },
                    TransferState
                ]
            })
                .compileComponents();
        }));

        describe('when we receive a section with documents', () => {
            beforeEach(async(() => {
                data = {
                    id: 'documents',
                    name: 'Documents',
                    type: 'document-panel',
                    fields: [
                        {
                            value: [
                                {
                                    'id': '13eb9981-9360-4d4b-b9fd-506b5818e7ff',
                                    'value': {
                                        'documentLink': {
                                            'document_url': 'http://dm.internal/documents/13eb9981-9360-4d4b-b9fd-506b5818e7ff',
                                            'document_filename': 'H - Medical Notes.pdf',
                                            'document_binary_url': 'http://dm.internal/documents/13eb9981-9360-4d4b-b9fd-506b5818e7ff/binary'
                                        },
                                        'documentType': 'Medical evidence',
                                        'documentComment': null,
                                        'documentFileName': 'Medical notes',
                                        'documentDateAdded': null,
                                        'documentEmailContent': null
                                    }
                                }
                            ]
                        }
                    ]
                };
                documentList.documents = [
                    {
                        id: '13eb9981-9360-4d4b-b9fd-506b5818e7ff',
                        _links: {
                            self: {
                                href: 'http://dm.internal/documents/13eb9981-9360-4d4b-b9fd-506b5818e7ff'
                            }
                        },
                        createdOn: new Date()
                    }
                ];
                createComponent();

                fixture.whenStable().then(() => {
                    fixture.detectChanges();
                });
            }));

            it('should create', () => {
                expect(component).toBeTruthy();
            });

            it('should display a list of documents', () => {
                expect(nativeElement.querySelectorAll(Selector.selector('document')).length).toBe(1);
            });

            it('should set the document as current if matches the section id', () => {
                expect(nativeElement.querySelector(Selector.selector('document')).getAttribute('aria-current')).toBeNull();
            });
        });

        describe('when we receive a section without documents', () => {
            beforeEach(async(() => {
                data = {
                    id: 'documents',
                    name: 'Documents',
                    type: 'document-panel',
                    fields: [
                        {
                            value: []
                        }
                    ]
                };
                createComponent();
            }));

            it('should create', () => {
                expect(component).toBeTruthy();
            });

            it('should not display a list of documents', () => {
                expect(nativeElement.querySelectorAll(Selector.selector('document')).length).toBe(0);
            });

            it('should show a friendly message', () => {
                expect(nativeElement.querySelector(Selector.selector('no-documents'))).toBeTruthy();
            });
        });

        describe('when we receive a document without a document link...', () => {
            beforeEach(async(() => {
                data = {
                    id: 'documents',
                    name: 'Documents',
                    type: 'document-panel',
                    fields: [
                        {
                            value: [{
                                'id': '13eb9981-9360-4d4b-b9fd-506b5818e7ff',
                                'value': {
                                    'documentType': 'Medical evidence',
                                    'documentComment': null,
                                    'documentFileName': 'Medical notes',
                                    'documentDateAdded': null,
                                    'documentEmailContent': null
                                }
                            }]
                        }
                    ]
                };

                createComponent();
            }));

            it('should create', () => {
                expect(component).toBeTruthy();
            });

            it('should not display a list of documents', () => {
                expect(nativeElement.querySelectorAll(Selector.selector('document')).length).toBe(1);
            });

            it('should show a friendly message that there are no documents', () => {
                expect(nativeElement.querySelector(Selector.selector('no-documents'))).toBeNull();
            });

            it('should determine the correct content type from the mime type', () => {
                const mimes = [
                    {
                        mime: 'image/*',
                        expected: 'image'
                    },
                    {
                        mime: 'application/pdf',
                        expected: 'pdf'
                    },
                    {
                        mime: 'foo/bar',
                        expected: 'txt'
                    },
                ];
                mimes.forEach( mime => {
                    expect(DocumentPanelComponent.getContentType(mime.mime)).toBe(mime.expected);
                });
            });
        });
    });

});
