import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComponent } from './form.component';
import {FormControl, FormGroup} from '@angular/forms';
import {FormService} from '../../services/form.service';
import {Listener} from 'selenium-webdriver';
import {HostListener} from '@angular/core';

describe('FormComponent', () => {
    let component: FormComponent;
    let fixture: ComponentFixture<FormComponent>;
    let formService;
    let mockFormGroup;
    let button;
    const newTemplate = `
        <form method="post" action="">
            <button>MockButton</button>
        </form>`;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ FormComponent ],
            providers: [{
                provide: FormService,
                useValue: {
                    getFormValues: () => {
                        return {
                            testFormControl1: 'testValue1',
                            testFormControl2: 'testValue2'
                        };
                    }
                }
            }]
        }).overrideTemplate(FormComponent, newTemplate )
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormComponent);
        component = fixture.componentInstance;
        formService = fixture.debugElement.injector.get(FormService);
        mockFormGroup = new FormGroup({
            testFormControl1: new FormControl(),
            testFormControl2: new FormControl()
        });
        component.formGroup = mockFormGroup;
        button = fixture.nativeElement.querySelector('button');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call submitListener', () => {
        console.log(component.submitListener());
        expect(component.submitListener()).toBe(undefined);
    });

    it('should emit call back when triggerCallback called', () => {
        component.callback_options = {
            eventEmitter: {
                emit: () => false
            }
        };
        component.triggerCallback(mockFormGroup);
        expect(component.callback_options.eventEmitter.emit(mockFormGroup)).toBe(false);
    });
});
