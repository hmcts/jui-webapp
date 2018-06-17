import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './components/table/table.component';
import { MatTableModule } from '@angular/material';
import { TabComponent } from './components/tab/tab.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { DatalistComponent } from './components/datalist/datalist.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { FormsModule } from '@angular/forms';
import { ImageViewerComponent } from './components/viewers/image-viewer/image-viewer.component';
import { PdfViewerComponent } from './components/viewers/pdf-viewer/pdf-viewer.component';
import { UnsupportedViewerComponent } from './components/viewers/unsupported-viewer/unsupported-viewer.component';

@NgModule({
    imports: [
        CommonModule,
        MatTableModule,
        FormsModule,
        PdfViewerModule
    ],
    declarations: [
        TabComponent,
        TabsComponent,
        TableComponent,
        DatalistComponent,
        HeaderComponent,
        FooterComponent,
        PdfViewerComponent,
        ImageViewerComponent,
        UnsupportedViewerComponent
    ],
    exports: [
        TabComponent,
        TabsComponent,
        TableComponent,
        DatalistComponent,
        HeaderComponent,
        FooterComponent,
        PdfViewerComponent,
        ImageViewerComponent,
        UnsupportedViewerComponent
    ]
})

export class SharedModule {
}



