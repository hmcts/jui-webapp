import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SearchResultComponent} from './components/search-result/search-result.component';
import {SharedModule} from '../shared/shared.module';
import {CaseViewerModule} from './case-viewer/case-viewer.module';
import {HeaderComponent} from './components/header/header.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule
    ],
    exports: [
        SearchResultComponent,
        CaseViewerModule,
        HeaderComponent
    ],
    declarations: [
        SearchResultComponent,
        HeaderComponent
    ],
    providers: []
})
export class DomainModule {
}
