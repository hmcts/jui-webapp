import { JUIFormsModule } from './forms.module';
import { TestBed } from '@angular/core/testing';
import { TextEditorComponent } from './components/text-editor/text-editor.component';
import { TextareaCustomComponent } from './components/text-editor/textarea-custom/textarea-custom.component';

describe('JUIFormsModule', () => {
    let formsModule: JUIFormsModule;
    beforeEach(() => {
        formsModule = new JUIFormsModule();
    });
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                TextEditorComponent,
                TextareaCustomComponent
            ],
            providers: []
        });
    });
    it('should create an instance', () => {
        expect(formsModule).toBeTruthy();
    });
});
