import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewQuestionComponent } from './view.component';
import { DomainModule } from '../../../domain.module';
import { SharedModule } from '../../../../shared/shared.module';
import { QuestionService } from '../../../services/question.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ConfigService } from '../../../../config.service';
import { BrowserTransferStateModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CaseService } from '../../../services/case.service';
import { of } from 'rxjs';
import { Selector } from '../../../../../../test/selector-helper';
import { RedirectionService } from '../../../../routing/redirection.service';

describe('ViewQuestionComponent', () => {
    let component: ViewQuestionComponent;
    let fixture: ComponentFixture<ViewQuestionComponent>;
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
                RouterModule
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
                    provide: ConfigService,
                    useValue: {
                        config: {
                            api_base_url: ''
                        }
                    }
                },
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: {
                            _lastPathIndex: 0,
                            params: of({
                                'question_id': '43eb9981-9360-4d4b-b9fd-506b5818e7ff'
                            }),
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
                        params: of({
                            'question_id': '43eb9981-9360-4d4b-b9fd-506b5818e7ff'
                        }),
                        fragment: of(['question-fragment', 'subject-fragment'])
                    }
                },
            ]
        })
               .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ViewQuestionComponent);
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        httpMock = TestBed.get(HttpTestingController);
        fixture.detectChanges();
    });

    afterEach(() => {
        httpMock.verify();
    });

    describe('when we receive a question and no answer', () => {
        beforeEach(async(() => {
            httpMock
                .expectOne('/api/caseQ/13eb9981-9360-4d4b-b9fd-506b5818e7ff/questions/43eb9981-9360-4d4b-b9fd-506b5818e7ff')
                .flush({
                    'id': '43eb9981-9360-4d4b-b9fd-506b5818e7ff',
                    'header': 'Locality',
                    'body': 'Are you local?',
                    'owner_reference': '5899',
                    'state_datetime': new Date(Date.UTC(2018, 6, 13, 8, 52, 38)),
                    'answer': null
                });

            fixture.detectChanges();
        }));

        it('should display question subject', () => {
            expect(nativeElement.querySelector(Selector.selector('question-header')).textContent)
                .toBe('Locality');
        });

        it('should display date question was added', () => {
            expect(nativeElement.querySelector(Selector.selector('question-date')).textContent).toBe('From 5899, added on 13 July 2018');
        });

        it('should display question body', () => {
            expect(nativeElement.querySelector(Selector.selector('question-body')).textContent).toBe('Are you local?');
        });

        it('should not display answer section', () => {
            expect(nativeElement.querySelectorAll(Selector.selector('answer-item')).length).toBe(0);
        });
    });

    describe('when we receive a question and an answer', () => {
        beforeEach(async(() => {
            httpMock
                .expectOne('/api/caseQ/13eb9981-9360-4d4b-b9fd-506b5818e7ff/questions/43eb9981-9360-4d4b-b9fd-506b5818e7ff')
                .flush({
                    'id': '43eb9981-9360-4d4b-b9fd-506b5818e7ff',
                    'header': 'Locality',
                    'body': 'Are you local?',
                    'owner_reference': '5899',
                    'state_datetime': new Date(Date.UTC(2018, 6, 13, 8, 52, 38)),
                    'answer': {
                        'answer_id': '0b20e096-6c15-4b8a-95d4-8c3481f8884e',
                        'answer_text': 'I need help and assistance to move from place to place.',
                        'current_answer_state': {
                            'state_name': 'answer_submitted',
                            'state_datetime': new Date(Date.UTC(2018, 7, 13, 9, 53, 38)),
                        }
                    }
                });

            fixture.detectChanges();
        }));

        it('should display question subject', () => {
            expect(nativeElement.querySelector(Selector.selector('question-header')).textContent)
                .toBe('Locality');
        });

        it('should display date question was added', () => {
            expect(nativeElement.querySelector(Selector.selector('question-date')).textContent).toBe('From 5899, added on 13 July 2018');
        });

        it('should display question body', () => {
            expect(nativeElement.querySelector(Selector.selector('question-body')).textContent).toBe('Are you local?');
        });

        it('should display answer heading', () => {
            expect(nativeElement.querySelector(Selector.selector('answer-header')).textContent).toBe('Response');
        });

        it('should display date question was answered', () => {
            expect(nativeElement.querySelector(Selector.selector('answer-date')).textContent).toBe('From Appellant, received on 13 August 2018');
        });

        it('should display answer body', () => {
            expect(nativeElement.querySelector(Selector.selector('answer-body')).textContent).toBe('I need help and assistance to move from place to place.');
        });
    });
});
