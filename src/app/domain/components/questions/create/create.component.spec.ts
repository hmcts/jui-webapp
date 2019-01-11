import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CreateQuestionsComponent} from './create.component';
import {QuestionService} from '../../../services/question.service';
import {Selector} from '../../../../shared/selector-helper';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ConfigService} from '../../../../config.service';
import {BrowserTransferStateModule} from '@angular/platform-browser';
import {ActivatedRoute, RouterModule} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {RedirectionService} from '../../../../routing/redirection.service';
import {CaseService} from '../../../services/case.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {mockQuestionCreateActivateRoute} from '../../../mock/activateRoute.mock';
import {mockConfigService} from '../../../mock/config.mock';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('CreateQuestionsComponent', () => {
    let component: CreateQuestionsComponent;
    let fixture: ComponentFixture<CreateQuestionsComponent>;
    let httpMock: HttpTestingController;
    let nativeElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                CreateQuestionsComponent
            ],
            imports: [
                BrowserTransferStateModule,
                HttpClientTestingModule,
                RouterTestingModule,
                RouterModule,
                ReactiveFormsModule,
                FormsModule
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                {
                    provide: RedirectionService,
                    useValue: {
                        redirect: () => {
                        }
                    }
                },
                CaseService,
                QuestionService,
                {
                    provide: ActivatedRoute,
                    useValue: mockQuestionCreateActivateRoute
                },
                {
                    provide: ConfigService,
                    useValue: mockConfigService
                }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CreateQuestionsComponent);
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        httpMock = TestBed.get(HttpTestingController);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component)
            .toBeTruthy();
    });

    it('form invalid when empty', () => {
        expect(component.form.valid).toBeFalsy();
        expect(component.error.subject).toEqual(false);
        expect(component.error.question).toEqual(false);
    });

    it('subject field validity', () => {
        let errors = {};
        const subject = component.form.controls['subject'];
        expect(subject.valid).toBeFalsy();

        // Subject field is required
        errors = subject.errors || {};
        expect(errors['required']).toBeTruthy();

        // Set subject to something correct
        subject.setValue('Example subject');
        errors = subject.errors || {};
        expect(errors['required']).toBeFalsy();
    });

    it('question field validity', () => {
        let errors = {};
        const question = component.form.controls['question'];
        expect(question.valid).toBeFalsy();

        // Question field is required
        errors = question.errors || {};
        expect(errors['required']).toBeTruthy();

        // Set question to something correct
        question.setValue('Example question');
        errors = question.errors || {};
        expect(errors['required']).toBeFalsy();
    });

    describe('submitting a form', () => {
        beforeEach(async(() => {
            fixture.whenStable()
                .then(() => {
                    fixture.detectChanges();
                });
        }));

        it('should send a request for a valid form', () => {
            expect(component.form.valid).toBeFalsy();
            component.form.controls['subject'].setValue('Example subject');
            component.form.controls['question'].setValue('Example question');
            expect(component.form.valid).toBeTruthy();

            component.submitCallback({});
            httpMock
                .expectOne('/api/caseQ/13eb9981-9360-4d4b-b9fd-506b5818e7ff/questions')
                .flush({question_id: '9727a0fc-11bb-4212-821f-b36e312bbace'});

            httpMock.verify();
        });

        it('should set errors for an invalid form', () => {
            expect(component.form.valid).toBeFalsy();

            component.submitCallback({});

            expect(component.form.valid).toBeFalsy();
            expect(component.error.subject).toBeTruthy();
            expect(component.error.question).toBeTruthy();
        });

        it('should set an error for an invalid subject with whitespace only', () => {
            expect(component.form.valid).toBeFalsy();
            component.form.controls['subject'].setValue('      ');
            component.form.controls['question'].setValue('       ');
            expect(component.form.valid).toBeTruthy();

            component.submitCallback({});

            expect(component.form.valid).toBeTruthy();
        });
    });

    it('should display a heading', () => {
        expect(nativeElement.querySelector(Selector.selector('create-questions-heading')).textContent)
            .toBe('Create question');
    });
    it('should display a button to save question items', () => {
        expect(nativeElement.querySelectorAll(Selector.selector('save-button')).length).toBe(1);
    });
});
