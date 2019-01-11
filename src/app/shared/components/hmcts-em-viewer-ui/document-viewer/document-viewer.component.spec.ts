import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DocumentViewerComponent} from './document-viewer.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {DebugElement, SimpleChange} from '@angular/core';
import {DocumentViewerService} from './document-viewer.service';
import {of} from 'rxjs';
import { TransferState } from '@angular/platform-browser';
import { HmctsEmViewerUiModule } from '../hmcts-em-viewer-ui.module';
import { EmLoggerService } from '../logging/em-logger.service';

const originalUrl = 'http://api-gateway.dm.com/documents/1234-1234-1234';
const url = '/demproxy/dm/documents/1234-1234-1234';

class MockTransferState {
    hasKey() {}
    remove() {}
    set() {}
}

describe('DocumentViewerComponent', () => {
    const mockTransferState = new MockTransferState();
    let component: DocumentViewerComponent;
    let fixture: ComponentFixture<DocumentViewerComponent>;
    let element: DebugElement;
    let mockDocuments;

    const DocumentViewerServiceMock = {
        fetch: () => {
            return of(mockDocuments);
        }
    };

    beforeEach(async(() => {
        const testingModule = TestBed.configureTestingModule({
            imports: [HmctsEmViewerUiModule, HttpClientTestingModule],
            providers: [
                EmLoggerService,
                { provide: TransferState, useFactory: () => mockTransferState},
                { provide: DocumentViewerService, useValue: DocumentViewerServiceMock
            }]
        });

        testingModule.compileComponents();
    }));

    function createComponent() {
        fixture = TestBed.createComponent(DocumentViewerComponent);
        component = fixture.componentInstance;
        component.url = originalUrl;
        component.baseUrl = '/demproxy/dm';
        element = fixture.debugElement;
        fixture.detectChanges();
        component.ngOnChanges({url: new SimpleChange(null, component.url, true)});
    }


    describe('when the mime type is an image', () => {
        beforeEach(() => {
            mockDocuments = {
                mimeType: 'image/jpeg',
                originalDocumentName: 'image.jpeg',
                _links: {
                    binary: {
                        href: `${originalUrl}/binary`
                    },
                    self: {
                        href: `${originalUrl}`
                    }
                }
            };
            createComponent();
        });

        it('img element should be visible', () => {
            expect(element.nativeElement.querySelector('app-image-viewer')).toBeTruthy();
        });

        it('and pdf element should not be visible', () => {
            expect(element.nativeElement.querySelector('app-annotation-pdf-viewer')).not.toBeTruthy();
        });

        describe('when the url is changed', () => {
            const newUrl = 'http://api-gateway.dm.com/documents/5678-5678-5678';
            beforeEach(() => {
                component.url = newUrl;
                component.ngOnChanges({url: new SimpleChange(originalUrl, newUrl, false)});
                fixture.detectChanges();
            });

            beforeEach(() => {
                mockDocuments = {
                    mimeType: 'image/jpeg',
                    originalDocumentName: 'new-image.jpeg',
                    _links: {
                        binary: {
                            href: `${newUrl}/binary`
                        },
                        self: {
                            href: `${newUrl}`
                        }
                    }
                };
                createComponent();
            });

            it('img element should still be visible', () => {
                expect(element.nativeElement.querySelector('app-image-viewer')).toBeTruthy();
            });

            it('and pdf element should still not be visible', () => {
                expect(element.nativeElement.querySelector('app-annotation-pdf-viewer')).not.toBeTruthy();
            });
        });
    });

    describe('when the mime type is pdf', () => {
        beforeEach(() => {
            mockDocuments = {
                mimeType: 'application/pdf',
                originalDocumentName: 'cert.pdf',
                _links: {
                    binary: {
                        href: `${originalUrl}/binary`
                    },
                    self: {
                        href: `${originalUrl}`
                    }
                }
            };
            createComponent();
        });

        it('img element should not be visible', () => {
            expect(element.nativeElement.querySelector('app-image-viewer')).not.toBeTruthy();
        });

        it('pdf element should be visible', () => {
            expect(element.nativeElement.querySelector('app-annotation-pdf-viewer')).toBeTruthy();
        });
        it('img element should not be visible', () => {
            expect(element.nativeElement.querySelector('app-image-viewer')).not.toBeTruthy();
        });
    });
});
