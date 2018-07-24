import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateQuestionsComponent } from './create.component';
import { SharedModule } from '../../../../shared/shared.module';
import { DomainModule } from '../../../domain.module';
import { QuestionService } from '../../../services/question.service';
import { Selector } from '../../../../../../test/selector-helper';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ConfigService } from '../../../../config.service';
import { BrowserTransferStateModule } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { RedirectionService } from '../../../../routing/redirection.service';
import { CaseService } from '../../../../case.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('CreateQuestionsComponent', () => {
    let component: CreateQuestionsComponent;
    let fixture: ComponentFixture<CreateQuestionsComponent>;
    let httpMock: HttpTestingController;
    let nativeElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [],
            imports: [
                DomainModule,
                SharedModule,
                BrowserTransferStateModule,
                HttpClientTestingModule,
                RouterTestingModule,
                RouterModule,
                ReactiveFormsModule,
                FormsModule
            ],
            providers: [
                {
                    provide: RedirectionService,
                    useValue: {
                        redirect: {}
                    }
                },
                CaseService,
                QuestionService,
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: {
                            _lastPathIndex: 0
                        },
                        parent: {
                            params: of({
                                'case_id': '13eb9981-9360-4d4b-b9fd-506b5818e7ff'
                            }),
                            snapshot: {
                                params: {
                                    'case_id': '13eb9981-9360-4d4b-b9fd-506b5818e7ff'
                                },
                                queryParams: {}
                            }
                        },
                        queryParams: of({}),
                    }
                },
                {
                    provide: ConfigService,
                    useValue: {
                        config: {
                            api_base_url: ''
                        }
                    }
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
    });

    beforeEach(async(() => {
        fixture.whenStable()
               .then(() => {
                   fixture.detectChanges();
               });
    }));

    afterEach( () => {
        httpMock.verify();
    });

    it('form invalid when empty', () => {
        expect(component.form.valid).toBeFalsy();
    });

    it('subject field validity', () => {
        let errors = {};
        let subject = component.form.controls['subject'];
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
        let question = component.form.controls['question'];
        expect(question.valid).toBeFalsy();

        // Question field is required
        errors = question.errors || {};
        expect(errors['required']).toBeTruthy();

        // Set question to something correct
        question.setValue('Example question');
        errors = question.errors || {};
        expect(errors['required']).toBeFalsy();
    });

    describe('When request is a success', () => {
        beforeEach(async(() => {
            fixture.whenStable()
                   .then(() => {
                       fixture.detectChanges();
                   });
        }));

        it('submitting a form emits a put request', () => {
            expect(component.form.valid).toBeFalsy();
            component.form.controls['subject'].setValue('Example subject');
            component.form.controls['question'].setValue('Example question');
            expect(component.form.valid).toBeTruthy();

            component.onSubmit();

            httpMock
                .expectOne('/api/cases/13eb9981-9360-4d4b-b9fd-506b5818e7ff/questions')
                .flush({question_id: '9727a0fc-11bb-4212-821f-b36e312bbace'});
        });
    });

    it('should display a heading', () => {
        expect(nativeElement.querySelector(Selector.selector('create-questions-heading')).textContent)
            .toBe('Create questions');
    });

    it('should display a heading for new question item', () => {
        expect(nativeElement.querySelectorAll(Selector.selector('item-heading')).length).toBe(1);
        expect(nativeElement.querySelector(Selector.selector('item-heading')).textContent).toBe('Question');
    });

    it('should display a subject text input for new question item', () => {
        expect(nativeElement.querySelector(Selector.selector('item-subject-label')).textContent).toBe('Subject');
        expect(nativeElement.querySelectorAll(Selector.selector('item-subject-input')).length).toBe(1);
    });

    it('should display a question text area for each new question item', () => {
        expect(nativeElement.querySelector(Selector.selector('item-question-label')).textContent).toBe('Question');
        expect(nativeElement.querySelectorAll(Selector.selector('item-question-textarea')).length).toBe(1);
    });

    it('should display a button to save question items', () => {
        expect(nativeElement.querySelectorAll(Selector.selector('save-button')).length).toBe(1);
    });
});
