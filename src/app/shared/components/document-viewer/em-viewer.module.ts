import {NgModule} from '@angular/core';
import {EmViewerComponent} from './em-viewer.component';
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

@NgModule({
  declarations: [
    EmViewerComponent,
    PdfViewerComponent,
    ImgViewerComponent,
    UnsupportedViewerComponent,
    ViewerAnchorDirective
  ],
  entryComponents: [
    PdfViewerComponent,
    ImgViewerComponent,
    UnsupportedViewerComponent
  ],
  exports: [EmViewerComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    PdfViewerModule],
  providers: [
    ViewerFactoryService,
    UrlFixerService
  ],
})
export class EmViewerModule {
}
