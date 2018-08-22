import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './components/table/table.component';
import { DataListComponent } from './components/data-list/data-list.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import {CdkTableModule} from '@angular/cdk/table';
import {DocumentViewerModule} from './components/document-viewer/document-viewer.module';
import { RouterModule} from '@angular/router';
import { BacklinkComponent } from './components/backlink/backlink.component';
import { ReactiveFormsModule } from '@angular/forms';
import {GovukModule} from '../govuk/govuk.module';
import {HmctsModule} from '../hmcts/hmcts.module';
import {TimelineComponent} from './components/timeline/timeline.component';

@NgModule({
    imports: [
        CommonModule,
        CdkTableModule,
        FormsModule,
        ReactiveFormsModule,
        DocumentViewerModule,
        RouterModule,
        GovukModule,
        HmctsModule
    ],
    declarations: [
        TableComponent,
        DataListComponent,
        FooterComponent,
        BacklinkComponent,
        TimelineComponent
    ],
    exports: [
        TableComponent,
        DataListComponent,
        FooterComponent,
        BacklinkComponent,
        TimelineComponent
    ]
})

export class SharedModule {
}



