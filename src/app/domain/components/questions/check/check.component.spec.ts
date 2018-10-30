import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckQuestionsComponent } from './check.component';
import { DomainModule } from '../../../domain.module';
import { SharedModule } from '../../../../shared/shared.module';
import { QuestionService } from '../../../services/question.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ConfigService } from '../../../../config.service';
import { BrowserTransferStateModule} from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';
import {Selector} from '../../../../../../test/selector-helper';
import {RedirectionService} from '../../../../routing/redirection.service';

fdescribe('CheckQuestionsComponent', () => {
    let component: CheckQuestionsComponent;
    let fixture: ComponentFixture<CheckQuestionsComponent>;
    let httpMock: HttpTestingController;
    let nativeElement;
    let redirectionService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [],
            imports: [
                DomainModule,
                SharedModule,
                BrowserTransferStateModule,
                HttpClientTestingModule,
                RouterTestingModule
            ],
            providers: [
                QuestionService,
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: {
                            _lastPathIndex: 0,
                            params: {
                                round: '1'
                            },
                            queryParams: {}
                        },
                        params: of({
                            round: '1'
                        }),
                        parent: {
                            params: of({
                                case_id: '123456789',
                                jur: 'SSCS',
                                casetype: 'Benefit'
                            }),
                            snapshot: {
                                params: of({
                                    case_id: '123456789',
                                    jur: 'SSCS',
                                    casetype: 'Benefit'
                                }),
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
        fixture = TestBed.createComponent(CheckQuestionsComponent);
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        httpMock = TestBed.get(HttpTestingController);
        redirectionService = TestBed.get(RedirectionService);
        spyOn(redirectionService, 'redirect');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component)
            .toBeTruthy();
    });

    describe('when we receive a list of questions', () => {
        let request;
        beforeEach(async(() => {
            // TODO: 'state_name': 'question_issue_pending', to 'question_drafted'

            const mockData =  {
                'question_round_number': '1',
                'question_references': [
                    {
                        'question_round': '1',
                        'question_ordinal': '1',
                        'question_header_text': 'do you like cake?',
                        'question_body_text': 'asdggdgs',
                        'owner_reference': '123141',
                        'question_id': '6f0ac76e-f445-4ec3-9e36-a0d13dc35204',
                        'deadline_extension_count': 0,
                        'current_question_state': {
                            'state_name': 'question_issue_pending',
                            'state_desc': 'Question Drafted',
                            'state_datetime': '2018-09-17T09:37:47Z'
                        }
                    },
                    {
                        'question_round': '1',
                        'question_ordinal': '2',
                        'question_header_text': 'do you like cake?',
                        'question_body_text': 'asdggdgs',
                        'owner_reference': '123141',
                        'question_id': '6f0ac76e-f445-4ec3-9e36-a0d13dc35204',
                        'deadline_extension_count': 0,
                        'current_question_state': {
                            'state_name': 'question_issue_pending',
                            'state_desc': 'Question Issue Pending',
                            'state_datetime': '2018-09-17T09:37:47Z'
                        }
                    }
                ],
                'question_round_state': {
                    'state_name': 'question_drafted'
                },
                'deadline_extension_count': 0
            };
            request = httpMock.expectOne('/api/case/123456789/rounds/1');
            request.flush(mockData);
            fixture.detectChanges();
        }));
        it('should create', () => {
            expect(component)
                .toBeTruthy();
        });

        xit('should have filtered out the issued questions', () => {
            expect(nativeElement.querySelectorAll(Selector.selector('question-check')).length).toBe(1);
        });

        describe('when we click send questions', () => {
            // beforeEach(() => {
            //     nativeElement.querySelector(Selector.selector('send-questions')).click();
            // });

            // describe('and it succeeds', () => {
            //     beforeEach(() => {
            //         const req = httpMock.expectOne('/api/case/123456789/rounds/1');
            //         req.flush({});
            //     });
            //
            //     it('should redirect with success', () => {
            //         expect(redirectionService.redirect).toHaveBeenCalledWith('/SSCS/Benefit/123456789/questions?sent=success');
            //     });
            // });

            // describe('and it fails', () => {
            //     beforeEach(() => {
            //         const req = httpMock.expectOne('/api/case/123456789/rounds/1');
            //         req.flush({}, {status: 500, statusText: 'It broke'});
            //     });
            //
            //     it('should redirect with failure', () => {
            //         expect(redirectionService.redirect).toHaveBeenCalledWith('/SSCS/Benefit/123456789/questions?sent=failure');
            //     });
            // });

        });
    });
});
