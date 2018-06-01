import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchResultComponent } from './search-result/search-result.component';
import { SharedModule } from '../shared/shared.module';
import { CaseViewerModule } from './case-viewer/case-viewer.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    SearchResultComponent,
    CaseViewerModule
  ],
  declarations: [SearchResultComponent],
  providers: []
})
export class DomainModule {
}
