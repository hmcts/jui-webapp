import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServerModule, ServerTransferStateModule  } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

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
    providers: [
        // Add universal-only providers here
    ],
    bootstrap: [ AppComponent ],
})
export class AppServerModule {}