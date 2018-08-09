import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckQuestionsComponent } from './check.component';
import { DomainModule } from '../../../domain.module';
import { SharedModule } from '../../../../shared/shared.module';
import { QuestionService } from '../../../services/question.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ConfigService } from '../../../../config.service';
import { BrowserTransferStateModule, StateKey } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';
import {Selector} from '../../../../../../test/selector-helper';
import {RedirectionService} from '../../../../routing/redirection.service';

const configMock = {
    config: {
        api_base_url: ''
    }
};
const routeMock = {
    parent: {
        params: of({
            'case_id': '123456789',
            jur: 'SSCS',
            casetype: 'Benefit'
        })
    }
};

describe('CheckQuestionsComponent', () => {
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
                    provide: ConfigService,
                    useValue: configMock
                },
                {
                provide: ActivatedRoute,
                    useValue: routeMock

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
            request = httpMock.expectOne('/api/cases/123456789/questions');
            request.flush([
                {
                    'id': '0e8c2310-8972-4479-a3af-5660ecdf086e',
                    'header': 'test',
                    'body': 'test',
                    'owner_reference': '5899',
                    'state_datetime': '2018-07-24 13:28:47.45',
                    'state': 'question_drafted'
                },
                {
                    'id': '0e8c2310-8972-4479-a3af-5660ecdf086e',
                    'header': 'test issued',
                    'body': 'test issued',
                    'owner_reference': '5899',
                    'state_datetime': '2018-07-24 13:28:47.45',
                    'state': 'question_issue_pending'
                }
            ]);

        }));

        beforeEach(async(() => {
            fixture.whenStable().then(() => {
                fixture.detectChanges();
            });
        }));

        it('should have filtered out the issued questions', () => {
            expect(nativeElement.querySelectorAll(Selector.selector('question-check')).length).toBe(1);
        });

        describe('when we click send questions', () => {
            beforeEach(() => {
                nativeElement.querySelector(Selector.selector('send-questions')).click();
            });

            describe('and it succeeds', () => {
                beforeEach(() => {
                    const req = httpMock.expectOne('/api/cases/123456789/questions/rounds/1');
                    req.flush({});
                });

                it('should redirect with success', () => {
                    expect(redirectionService.redirect).toHaveBeenCalledWith('/jurisdiction/SSCS/casetype/Benefit/viewcase/123456789/questions?sent=success');
                });
            });

            describe('and it fails', () => {
                beforeEach(() => {
                    const req = httpMock.expectOne('/api/cases/123456789/questions/rounds/1');
                    req.flush({}, {status: 500, statusText: 'It broke'});
                });

                it('should redirect with failure', () => {
                    expect(redirectionService.redirect).toHaveBeenCalledWith('/jurisdiction/SSCS/casetype/Benefit/viewcase/123456789/questions?sent=failure');
                });
            });

        });
    });
});
