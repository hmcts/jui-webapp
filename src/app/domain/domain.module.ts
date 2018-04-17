import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SearchResultComponent} from './search-result/search-result.component';
import {SharedModule} from '../shared/shared.module';
import { CcdService } from './ccd.service';

@NgModule({
    imports: [
        CommonModule,
        SharedModule
    ],
    exports: [
        SearchResultComponent
    ],
    declarations: [SearchResultComponent],
    providers: [CcdService]
})
export class DomainModule {
}
