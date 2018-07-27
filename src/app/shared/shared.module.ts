import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './components/table/table.component';
import { TabComponent } from './components/tab/tab.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { DataListComponent } from './components/data-list/data-list.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import {CdkTableModule} from '@angular/cdk/table';
import {DocumentViewerModule} from './components/document-viewer/document-viewer.module';
import { RouterModule} from '@angular/router';
import { BacklinkComponent } from './components/backlink/backlink.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        CdkTableModule,
        FormsModule,
        ReactiveFormsModule,
        DocumentViewerModule,
        RouterModule
    ],
    declarations: [
        TabComponent,
        TabsComponent,
        TableComponent,
        DataListComponent,
        FooterComponent,
        BacklinkComponent
    ],
    exports: [
        TabComponent,
        TabsComponent,
        TableComponent,
        DataListComponent,
        FooterComponent,
        BacklinkComponent
    ]
})

export class SharedModule {
}



