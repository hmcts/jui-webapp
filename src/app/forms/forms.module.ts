import {NgModule, ModuleWithProviders } from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormComponent } from './components/form/form.component';
import { FormService } from "./services/form.service";
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { UniversalFormDirective } from './directives/universal-form.directive';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [FormComponent, UniversalFormDirective],
    exports:[
        FormComponent,
        UniversalFormDirective
    ]
})
export class JUIFormsModule {
    static forRoot(options: any = {}): ModuleWithProviders {
        return {
            ngModule: JUIFormsModule,
            providers: [
                // {provide: COOKIE_OPTIONS, useValue: options},
                FormService
            ]
        };
    }
}
