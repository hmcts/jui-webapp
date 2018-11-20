import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RadioButtonsComponent } from './radio-buttons.component';
import {FormsModule, FormGroup, FormControl} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';

describe('RadioButtonsComponent', () => {
    let component: RadioButtonsComponent;
    let fixture: ComponentFixture<RadioButtonsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule],
            declarations: [ RadioButtonsComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RadioButtonsComponent);
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
