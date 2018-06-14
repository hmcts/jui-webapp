import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './components/table/table.component';
import { MatTableModule } from '@angular/material';
import { TabComponent } from './components/tab/tab.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { DatalistComponent } from './components/datalist/datalist.component';
import { CaseFileViewerModule } from './components/case-file-viewer/case-file-viewer.module';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';

@NgModule({
    imports: [
        CommonModule,
        MatTableModule
    ],
    declarations: [
        TabComponent,
        TabsComponent,
        TableComponent,
        DatalistComponent,
        HeaderComponent,
        FooterComponent
    ],
    exports: [
        TabComponent,
        TabsComponent,
        TableComponent,
        DatalistComponent,
        CaseFileViewerModule,
        HeaderComponent,
        FooterComponent
    ]
})

export class SharedModule {
}



