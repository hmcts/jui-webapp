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
            const mockData =  {
                'number_question': '2',
                'number_question_answer': '2',
                'question_deadline_expired': 'false',
                'question_round_number': '1',
                'questions': [
                    {
                        'rounds': '1',
                        'header': 'test1',
                        'body': 'test1',
                        'owner_reference': '5899',
                        'id': '0e8c2310-8972-4479-a3af-5660ecdf086e',
                        'state': 'question_issue_pending',
                        'state_datetime': '2018-07-24T13:28:47.45Z'
                    },
                    {
                        'rounds': '1',
                        'header': 'test2',
                        'body': 'test22',
                        'owner_reference': '58991',
                        'id': '0e8c2310-8972-4479-a3af-5660ecdf086e2',
                        'state': 'question_issue_pending',
                        'state_datetime': '2018-07-24T13:28:47.45Z'
                    },
                ],
                'state': {
                    'state_name': 'question_answered'
                }
            };
            request = httpMock.expectOne('/api/cases/123456789/rounds/1');
            request.flush(mockData);
            fixture.detectChanges();
        }));
        it('should create', () => {
            expect(component)
                .toBeTruthy();
        });

        it('should have filtered out the issued questions', () => {
            console.log('I am natie element', nativeElement);
            console.log('I am elements', nativeElement.querySelectorAll(Selector.selector('question-check')));

            expect(nativeElement.querySelectorAll(Selector.selector('question-check')).length).toBe(1);
        });

        describe('when we click send questions', () => {
            // beforeEach(() => {
            //     nativeElement.querySelector(Selector.selector('send-questions')).click();
            // });

            // describe('and it succeeds', () => {
            //     beforeEach(() => {
            //         const req = httpMock.expectOne('/api/cases/123456789/rounds/1');
            //         req.flush({});
            //     });
            //
            //     it('should redirect with success', () => {
            //         expect(redirectionService.redirect).toHaveBeenCalledWith('/jurisdiction/SSCS/casetype/Benefit/viewcase/123456789/questions?sent=success');
            //     });
            // });

            // describe('and it fails', () => {
            //     beforeEach(() => {
            //         const req = httpMock.expectOne('/api/cases/123456789/rounds/1');
            //         req.flush({}, {status: 500, statusText: 'It broke'});
            //     });
            //
            //     it('should redirect with failure', () => {
            //         expect(redirectionService.redirect).toHaveBeenCalledWith('/jurisdiction/SSCS/casetype/Benefit/viewcase/123456789/questions?sent=failure');
            //     });
            // });

        });
    });
});
