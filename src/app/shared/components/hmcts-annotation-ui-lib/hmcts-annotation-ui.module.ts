import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommentsComponent } from './components/comments/comments.component';
import { CommentItemComponent } from './components/comments/comment-item/comment-item.component';
import { CommentFormComponent } from './components/comments/comment-form/comment-form.component';
import { PdfAdapter } from './data/pdf-adapter';
import { NpaService } from './data/npa.service';
import { PdfService } from './data/pdf.service';
import { AnnotationStoreService } from './data/annotation-store.service';
import { AnnotationPdfViewerComponent } from './components/annotation-pdf-viewer/annotation-pdf-viewer.component';
import { Utils } from './data/utils';
import { ApiHttpService } from './data/api-http.service';
import { ContextualToolbarComponent } from './components/contextual-toolbar/contextual-toolbar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  declarations: [
    CommentsComponent,
    CommentItemComponent,
    CommentFormComponent,
    ContextualToolbarComponent,
    AnnotationPdfViewerComponent
  ],
  providers: [
    PdfService,
    AnnotationStoreService,
    PdfAdapter,
    NpaService,
    ApiHttpService,
    Utils
  ],
  exports: [
    CommentsComponent,
    CommentItemComponent,
    CommentFormComponent,
    ContextualToolbarComponent,
    AnnotationPdfViewerComponent
  ]
})
export class HmctsAnnotationUiModule { }
