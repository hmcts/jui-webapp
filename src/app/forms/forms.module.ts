import {NgModule, ModuleWithProviders } from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormComponent } from './components/form/form.component';
import { FormService } from './services/form.service';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { TextareaComponent } from './components/textarea/textarea.component';
import { RadioButtonsComponent } from './components/radio-buttons/radio-buttons.component';
import { TextComponent } from './components/text/text.component';
import { TextEditorComponent } from './components/text-editor/text-editor.component';
import { TextareaCustomComponent } from './components/text-editor/textarea-custom/textarea-custom.component';

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
        TextComponent,
        TextEditorComponent,
        TextareaCustomComponent
    ],
    exports: [
        FormComponent,
        TextareaComponent,
        RadioButtonsComponent,
        TextComponent,
        TextEditorComponent
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
