import { NgModule } from '@angular/core';
import { CaseFileViewerComponent } from './case-file-viewer.component';
import { BrowserModule } from '@angular/platform-browser';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { FormsModule } from '@angular/forms';
import { ImageViewerComponent } from './viewers/image-viewer/image-viewer.component';
import { PdfViewerComponent } from './viewers/pdf-viewer/pdf-viewer.component';
import { UnsupportedViewerComponent } from './viewers/unsupported-viewer/unsupported-viewer.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    PdfViewerModule
  ],
  declarations: [
    PdfViewerComponent,
    ImageViewerComponent,
    UnsupportedViewerComponent,
    CaseFileViewerComponent
  ],
  exports: [
    CaseFileViewerComponent
  ]
})

export class CaseFileViewerModule {
}
