import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableComponent} from './components/table/table.component';
import {MatTableModule} from '@angular/material';
import {TabComponent} from './components/tab/tab.component';
import {TabsComponent} from './components/tabs/tabs.component';
import { DatalistComponent } from './components/datalist/datalist.component';


@NgModule({
    imports: [
        CommonModule,
        MatTableModule
    ],
    declarations: [
        TabComponent,
        TabsComponent,
        TableComponent,
        DatalistComponent
    ],
    exports: [
        TabComponent,
        TabsComponent,
        TableComponent,
        DatalistComponent
    ]
})
export class SharedModule {
}



