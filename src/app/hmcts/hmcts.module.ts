import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HmctsGlobalHeaderComponent } from './components/hmcts-global-header/hmcts-global-header.component';
import { HmctsProgressBarComponent } from './components/hmcts-progress-bar/hmcts-progress-bar.component';
import { HmctsPrimaryNavigationComponent } from './components/hmcts-primary-navigation/hmcts-primary-navigation.component';
import { HmctsSubNavigationComponent } from './components/hmcts-sub-navigation/hmcts-sub-navigation.component';
import { HmctsTimelineComponent } from './components/hmcts-timeline/hmcts-timeline.component';
import {RouterModule} from '@angular/router';
import {SentenceCasePipe} from './pipes/sentence-case/sentence-case-pipe';
import { HmctsAlertComponent } from './components/hmcts-alert/hmcts-alert.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [
        HmctsGlobalHeaderComponent,
        HmctsProgressBarComponent,
        HmctsPrimaryNavigationComponent,
        HmctsSubNavigationComponent,
        HmctsTimelineComponent,
        HmctsAlertComponent,
        SentenceCasePipe
    ],
    exports: [
        HmctsGlobalHeaderComponent,
        HmctsProgressBarComponent,
        HmctsPrimaryNavigationComponent,
        HmctsSubNavigationComponent,
        HmctsTimelineComponent,
        HmctsAlertComponent,
        SentenceCasePipe
    ]
})
export class HmctsModule {

}
