import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SearchResultComponent} from './components/search-result/search-result.component';
import {SharedModule} from '../shared/shared.module';
import {CaseViewerModule} from './case-viewer/case-viewer.module';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        RouterModule
    ],
    exports: [
        SearchResultComponent,
        CaseViewerModule
    ],
    declarations: [
        SearchResultComponent
    ],
    providers: []
})
export class DomainModule {
}
