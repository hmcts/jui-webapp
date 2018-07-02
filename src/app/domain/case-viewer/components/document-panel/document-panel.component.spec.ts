import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DocumentPanelComponent} from './document-panel.component';
import {Selector} from '../../../../../../test/selector-helper';
import {ActivatedRoute, Router} from '@angular/router';
import {of} from 'rxjs';
import {CaseViewerModule} from '../../case-viewer.module';

describe('DocumentPanelComponent', () => {
    let component: DocumentPanelComponent;
    let fixture: ComponentFixture<DocumentPanelComponent>;
    let nativeElement;
    let mockRouter;
    let mockRoute;

    describe('when we have a document id in the url', () => {
        beforeEach(async(() => {
            mockRouter = jasmine.createSpyObj(['navigate']);
            mockRoute = {queryParamMap: of({doc_id: '13eb9981-9360-4d4b-b9fd-506b5818e7ff'})};

            TestBed.configureTestingModule({
                imports: [CaseViewerModule],
                declarations: [],
                providers: [{
                    provide: ActivatedRoute,
                    useValue: mockRoute
                }, {
                    provide: Router,
                    useValue: mockRouter
                }]
            })
                .compileComponents();
        }));

        describe('when we receive a section with documents', () => {
            const data = {
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
            beforeEach(async(() => {
                fixture = TestBed.createComponent(DocumentPanelComponent);
                component = fixture.componentInstance;
                component.panelData = data;
                nativeElement = fixture.nativeElement;
                fixture.detectChanges();
            }));

            it('should create', () => {
                expect(component).toBeTruthy();
            });

            it('when display a list of documents', () => {
                expect(nativeElement.querySelectorAll(Selector.selector('document')).length).toBe(1);
            });
        });
    });




});
