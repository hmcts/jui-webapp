import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckQuestionsComponent } from './check.component';
import { QuestionService } from '../../../services/question.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ConfigService } from '../../../../config.service';
import { BrowserTransferStateModule} from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import {ActivatedRoute} from '@angular/router';
import {Selector} from '../../../../shared/selector-helper';
import {RedirectionService} from '../../../../routing/redirection.service';
import {mockQuestionCheckActivatedRoute} from '../../../mock/activateRoute.mock';
import {mockConfigService} from '../../../mock/config.mock';
import {mockQuestionCheckData} from '../../../mock/check.mock';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('CheckQuestionsComponent', () => {
    let component: CheckQuestionsComponent;
    let fixture: ComponentFixture<CheckQuestionsComponent>;
    let httpMock: HttpTestingController;
    let nativeElement;
    let redirectionService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CheckQuestionsComponent],
            imports: [
                BrowserTransferStateModule,
                HttpClientTestingModule,
                RouterTestingModule
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                QuestionService,
                {
                    provide: ActivatedRoute,
                    useValue: mockQuestionCheckActivatedRoute
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

            const mockData = mockQuestionCheckData;
            request = httpMock.expectOne('/api/caseQ/123456789/rounds/1');
            request.flush(mockData);
            fixture.detectChanges();
        }));
        it('should create', () => {
            expect(component)
                .toBeTruthy();
        });

        it('should have filtered out the issued questions', () => {
            expect(nativeElement.querySelectorAll(Selector.selector('question-check')).length).toBe(0);
        });


        describe('when we click send questions', () => {
            beforeEach(() => {
                nativeElement.querySelector(Selector.selector('send-questions')).click();
            });

            describe('and it succeeds', () => {
                beforeEach(() => {
                    const req = httpMock.expectOne('/api/caseQ/123456789/rounds/1');
                    req.flush({});
                });

                it('should redirect with success', () => {
                    expect(redirectionService.redirect).toHaveBeenCalledWith('/case/SSCS/Benefit/123456789/questions?sent=success');
                });
            });

            describe('and it fails', () => {
                beforeEach(() => {
                    const req = httpMock.expectOne('/api/caseQ/123456789/rounds/1');
                    req.flush({}, {status: 500, statusText: 'It broke'});
                });

                it('should redirect with failure', () => {
                    expect(redirectionService.redirect).toHaveBeenCalledWith('/case/SSCS/Benefit/123456789/questions?sent=failure');
                });
            });

        });
    });
});
