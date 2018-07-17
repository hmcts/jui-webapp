import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentPanelComponent } from './document-panel.component';
import { Selector } from '../../../../../../test/selector-helper';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { CaseViewerModule } from '../../case-viewer.module';
import { ConfigService } from '../../../../config.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('DocumentPanelComponent', () => {
    let component: DocumentPanelComponent;
    let fixture: ComponentFixture<DocumentPanelComponent>;
    let nativeElement;
    let mockRoute;
    let mockConfigService;
    let caseData;
    let data;

    function createComponent() {
        fixture = TestBed.createComponent(DocumentPanelComponent);
        component = fixture.componentInstance;
        component.case = caseData;
        component.panelData = data;
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();
    }

    describe('when we have a document id in the url', () => {
        beforeEach(async(() => {
            caseData = {
                documents: []
            };

            mockRoute = {
                params: of({
                    'section_item_id': '13eb9981-9360-4d4b-b9fd-506b5818e7ff'
                }),
                snapshot: {
                    params: {
                        'section_item_id': '13eb9981-9360-4d4b-b9fd-506b5818e7ff'
                    }
                }
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
                    }
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
                                    'id': '7f6e94e0-68cf-4658-95d3-ea8d21a19245',
                                    'value': {
                                        'documentLink': {
                                            'document_url': 'http://dm.internal/documents/7f6e94e0-68cf-4658-95d3-ea8d21a19245',
                                            'document_filename': 'H - Medical Notes.pdf',
                                            'document_binary_url': 'http://dm.internal/documents/7f6e94e0-68cf-4658-95d3-ea8d21a19245/binary'
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
                caseData.documents = [
                    {
                        _links: {
                            self: {
                                href: 'http://dm.internal/documents/7f6e94e0-68cf-4658-95d3-ea8d21a19245'
                            }
                        },
                        createdOn: new Date()
                    }
                ];
                createComponent();
            }));

            it('should create', () => {
                expect(component).toBeTruthy();
            });

            it('should display a list of documents', () => {
                expect(nativeElement.querySelectorAll(Selector.selector('document')).length).toBe(1);
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
                expect(nativeElement.querySelectorAll(Selector.selector('document')).length).toBe(0);
            });

            it('should show a friendly message that there are no documents', () => {
                expect(nativeElement.querySelector(Selector.selector('no-documents'))).toBeTruthy();
            });
        });
    });

});
