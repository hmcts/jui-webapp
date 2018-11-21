import {NgModule, ModuleWithProviders } from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormComponent } from './components/form/form.component';
import { FormService } from './services/form.service';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { TextareaComponent } from './components/textarea/textarea.component';
import { RadioButtonsComponent } from './components/radio-buttons/radio-buttons.component';
import { TextComponent } from './components/text/text.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        FormComponent,
        TextareaComponent,
        RadioButtonsComponent,
        TextComponent
    ],
    exports: [
        FormComponent,
        TextareaComponent,
        RadioButtonsComponent,
        TextComponent
    ]
})
export class JUIFormsModule {
    static forRoot(options: any = {}): ModuleWithProviders {
        return {
            ngModule: JUIFormsModule,
            providers: [
                FormService
            ]
        };
    }
}
