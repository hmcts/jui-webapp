import {NgModule} from '@angular/core';
import {DocumentViewerComponent} from './document-viewer.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import {FormsModule} from '@angular/forms';
import {ViewerFactoryService} from './viewers/viewer-factory.service';
import {PdfViewerComponent} from './viewers/pdf-viewer/pdf-viewer.component';
import {UnsupportedViewerComponent} from './viewers/unsupported-viewer/unsupported-viewer.component';
import {ImgViewerComponent} from './viewers/img-viewer/img-viewer.component';
import {ViewerAnchorDirective} from './viewers/viewer-anchor.directive';
import {UrlFixerService} from './url-fixer.service';
import {DocumentViewerService} from './document-viewer.service';
import {NotesComponent} from './annotations/notes/notes.component';
import {NotesService} from './annotations/notes.service';

@NgModule({
    declarations: [
        DocumentViewerComponent,
        PdfViewerComponent,
        ImgViewerComponent,
        UnsupportedViewerComponent,
        ViewerAnchorDirective,
        NotesComponent
    ],
    entryComponents: [
        PdfViewerComponent,
        ImgViewerComponent,
        UnsupportedViewerComponent
    ],
    exports: [DocumentViewerComponent],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        PdfViewerModule],
    providers: [
        ViewerFactoryService,
        UrlFixerService,
        DocumentViewerService,
        NotesService
    ],
})
export class DocumentViewerModule {
}
