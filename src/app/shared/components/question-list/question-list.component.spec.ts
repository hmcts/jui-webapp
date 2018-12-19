import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionListComponent } from './question-list.component';
import {RouterTestingModule} from '@angular/router/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('QuestionListComponent', () => {
    let component: QuestionListComponent;
    let fixture: ComponentFixture<QuestionListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            declarations: [ QuestionListComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(QuestionListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
