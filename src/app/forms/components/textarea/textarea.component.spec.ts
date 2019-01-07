import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TextareaComponent } from './textarea.component';
import {FormsModule, FormGroup, FormControl} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import { TextEditorComponent } from '../text-editor/text-editor.component';
import { TextareaCustomComponent } from '../text-editor/textarea-custom/textarea-custom.component';

describe('TextareaComponent', () => {
    let component: TextareaComponent;
    let fixture: ComponentFixture<TextareaComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule],
            declarations: [ TextareaComponent, TextEditorComponent, TextareaCustomComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TextareaComponent);
        component = fixture.componentInstance;
        component.id = 'bob';
        component.formGroup = new FormGroup({
            bob: new FormControl()
        }, null, null);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
