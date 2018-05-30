import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServerModule, ServerTransferStateModule  } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';



@NgModule({
    imports: [
        BrowserModule.withServerTransition({appId: 'jui'}),
        ServerModule,
        ServerTransferStateModule,
        AppModule,
        ModuleMapLoaderModule
    ],
    bootstrap: [ AppComponent ],
})
export class AppServerModule {
    constructor() {
        console.log('server!');





    }
}