import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableComponent} from '../table/table.component';
import {MatTableModule} from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        MatTableModule
    ],
    declarations: [TableComponent],
    exports: [
        TableComponent
    ]
})
export class SharedModule {
}



