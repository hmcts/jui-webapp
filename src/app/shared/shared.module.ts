import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableComponent} from './components/table/table.component';
import {MatTableModule} from '@angular/material';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {TabComponent} from './tab/tab.component';
import {TabsComponent} from './tabs/tabs.component';
import {DatalistComponent} from './components/datalist/datalist.component';


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
        HeaderComponent,
        FooterComponent
    ]
})
export class SharedModule {
}



