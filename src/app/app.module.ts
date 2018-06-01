import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { APP_ID, Inject, NgModule, PLATFORM_ID } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { isPlatformBrowser } from '@angular/common';
import { SharedModule } from './shared/shared.module';
import { DomainModule } from './domain/domain.module';
import { RoutingModule } from './routing/routing.module';
import { HeaderComponent } from './header/header.component';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { ConfigService } from './config.server.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'jui'}),
    BrowserTransferStateModule,
    RoutingModule,
    // RouterModule.forRoot(routes),
    HttpClientModule,
    SharedModule,
    DomainModule
  ],
  providers: [
    ConfigService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              @Inject(APP_ID) private appId: string) {

    // const platform = isPlatformBrowser(platformId) ?
    //     'in the browser' : 'on the server';
    // console.log(`Running ${platform} with appId=${appId}`);
  }
}
