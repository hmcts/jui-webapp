import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './components/table/table.component';
import { TabComponent } from './components/tab/tab.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { DataListComponent } from './components/data-list/data-list.component';
import { FooterComponent } from './components/footer/footer.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { FormsModule } from '@angular/forms';
import { ImageViewerComponent } from './components/viewers/image-viewer/image-viewer.component';
import { PdfViewerComponent } from './components/viewers/pdf-viewer/pdf-viewer.component';
import { UnsupportedViewerComponent } from './components/viewers/unsupported-viewer/unsupported-viewer.component';
import {CdkTableModule} from '@angular/cdk/table';

@NgModule({
    imports: [
        CommonModule,
        CdkTableModule,
        FormsModule,
        PdfViewerModule
    ],
    declarations: [
        TabComponent,
        TabsComponent,
        TableComponent,
        DataListComponent,
        FooterComponent,
        PdfViewerComponent,
        ImageViewerComponent,
        UnsupportedViewerComponent
    ],
    exports: [
        TabComponent,
        TabsComponent,
        TableComponent,
        DataListComponent,
        FooterComponent,
        PdfViewerComponent,
        ImageViewerComponent,
        UnsupportedViewerComponent
    ]
})

export class SharedModule {
}



