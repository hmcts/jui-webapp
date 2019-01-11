import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommentsComponent } from './viewers/annotation-pdf-viewer/comments/comments.component';
import { CommentItemComponent } from './viewers/annotation-pdf-viewer/comments/comment-item/comment-item.component';
import { PdfAdapter } from './data/pdf-adapter';
import { NpaService } from './data/npa.service';
import { PdfService } from './data/pdf.service';
import { AnnotationStoreService } from './data/annotation-store.service';
import { AnnotationPdfViewerComponent } from './viewers/annotation-pdf-viewer/annotation-pdf-viewer.component';
import { Utils } from './data/utils';
import { ApiHttpService } from './data/api-http.service';
import { ContextualToolbarComponent } from './viewers/annotation-pdf-viewer/contextual-toolbar/contextual-toolbar.component';
import { PdfAnnotateWrapper } from './data/js-wrapper/pdf-annotate-wrapper';
import { PdfWrapper } from './data/js-wrapper/pdf-wrapper';
import { NgtUniversalModule } from '@ng-toolkit/universal';
import { ImageViewerComponent } from './viewers/image-viewer/image-viewer.component';
import { UnsupportedViewerComponent } from './viewers/unsupported-viewer/unsupported-viewer.component';
import { UrlFixerService } from './data/url-fixer.service';
import { ViewerFactoryService } from './viewers/viewer-factory.service';
import { DocumentViewerComponent } from './document-viewer/document-viewer.component';
import { ViewerAnchorDirective } from './document-viewer/viewer-anchor.directive';
import { BrowserModule } from '@angular/platform-browser';
import { DocumentViewerService } from './document-viewer/document-viewer.service';
import { RotationComponent } from './viewers/annotation-pdf-viewer/rotation-toolbar/rotation.component';
import { RotationFactoryService } from './viewers/annotation-pdf-viewer/rotation-toolbar/rotation-factory.service';
import { PdfRenderService } from './data/pdf-render.service';
import { EmLoggerService } from './logging/em-logger.service';

@NgModule({
  imports: [
    BrowserModule,
    NgtUniversalModule,
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  declarations: [
    CommentsComponent,
    CommentItemComponent,
    ContextualToolbarComponent,
    AnnotationPdfViewerComponent,
    ImageViewerComponent,
    UnsupportedViewerComponent,
    DocumentViewerComponent,
    ViewerAnchorDirective,
    RotationComponent
  ],
  entryComponents: [
    AnnotationPdfViewerComponent,
    ImageViewerComponent,
    UnsupportedViewerComponent,
    RotationComponent
],
  providers: [
    PdfAnnotateWrapper,
    PdfWrapper,
    PdfService,
    AnnotationStoreService,
    PdfAdapter,
    NpaService,
    ApiHttpService,
    Utils,
    UrlFixerService,
    ViewerFactoryService,
    DocumentViewerService,
    RotationFactoryService,
    PdfRenderService,
    EmLoggerService
  ],
  exports: [
    CommentsComponent,
    CommentItemComponent,
    ContextualToolbarComponent,
    AnnotationPdfViewerComponent,
    ImageViewerComponent,
    UnsupportedViewerComponent,
    DocumentViewerComponent
  ]
})
export class HmctsEmViewerUiModule { }
