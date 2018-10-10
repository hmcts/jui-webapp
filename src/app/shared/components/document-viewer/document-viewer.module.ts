import {NgModule} from '@angular/core';
import {DocumentViewerComponent} from './document-viewer.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {ViewerFactoryService} from './viewers/viewer-factory.service';
import {UnsupportedViewerComponent} from './viewers/unsupported-viewer/unsupported-viewer.component';
import {ImgViewerComponent} from './viewers/img-viewer/img-viewer.component';
import {ViewerAnchorDirective} from './viewers/viewer-anchor.directive';
import {UrlFixerService} from './url-fixer.service';
import {DocumentViewerService} from './document-viewer.service';
import { HmctsAnnotationUiModule } from '../hmcts-annotation-ui-lib/hmcts-annotation-ui.module';
import { AnnotationPdfViewerComponent } from '../hmcts-annotation-ui-lib/components/annotation-pdf-viewer/annotation-pdf-viewer.component';

@NgModule({
    declarations: [
        DocumentViewerComponent,
        ImgViewerComponent,
        UnsupportedViewerComponent,
        ViewerAnchorDirective
    ],
    entryComponents: [
        AnnotationPdfViewerComponent,
        ImgViewerComponent,
        UnsupportedViewerComponent
    ],
    exports: [DocumentViewerComponent],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        HmctsAnnotationUiModule
    ],
    providers: [
        ViewerFactoryService,
        UrlFixerService,
        DocumentViewerService
    ],
})
export class DocumentViewerModule {
}
