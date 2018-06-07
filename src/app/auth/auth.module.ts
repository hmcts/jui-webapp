import { Inject, NgModule } from '@angular/core';
import {CookieModule} from "ngx-cookie";

@NgModule({
    imports: [
        CookieModule.forRoot()
    ],
})
export class AuthModule {}
