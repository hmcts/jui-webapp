import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServerModule, ServerTransferStateModule  } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { CookieService, CookieBackendService } from 'ngx-cookie';


@NgModule({
    imports: [
        //Make sure the string matches
        BrowserModule.withServerTransition({
            appId: 'jui'
        }),
        ServerModule,
        ServerTransferStateModule,
        AppModule,
        ModuleMapLoaderModule // The new module
    ],
    bootstrap: [ AppComponent ],
    providers: [{ provide: CookieService, useClass: CookieBackendService }]
})
export class AppServerModule {
    constructor() {
        console.log('server!');
    }
}
