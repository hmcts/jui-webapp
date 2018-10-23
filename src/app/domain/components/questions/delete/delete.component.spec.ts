import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteQuestionComponent } from './delete.component';
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
import { CaseService } from '../../../services/case.service';
import { Observable, of } from 'rxjs';


describe('DeleteQuestionComponent', () => {
    let component: DeleteQuestionComponent;
    let fixture: ComponentFixture<DeleteQuestionComponent>;
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
                    provide: ActivatedRoute,
                    useValue: {
                        params: of({
                            'question_id': '13eb9981-9360-4d4b-b9fd-506b5818e7ff'
                        }),
                        queryParams: of({}),
                        parent: {
                            params: of({
                                'case_id': '99eb9981-9360-4d4b-b9fd-506b5818e7ff'
                            }),
                        }
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
        fixture = TestBed.createComponent(DeleteQuestionComponent);
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        httpMock = TestBed.get(HttpTestingController);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('When request is a success', () => {
        let redirectionServiceMock;

        beforeEach(async(() => {
            const redirectionService = TestBed.get(RedirectionService);
            redirectionServiceMock = spyOn(redirectionService, 'redirect');
            fixture.whenStable()
                   .then(() => {
                       fixture.detectChanges();
                   });
        }));

        it('submitting a form emits a delete request', () => {
            component.remove();

            httpMock
                .expectOne('/api/case/99eb9981-9360-4d4b-b9fd-506b5818e7ff/questions/13eb9981-9360-4d4b-b9fd-506b5818e7ff')
                .flush(null);

            expect(redirectionServiceMock).toHaveBeenCalled();
        });
    });

    it('should display a heading', () => {
        expect(nativeElement.querySelector(Selector.selector('delete-heading')).textContent)
            .toBe('Are you sure you want to delete this question?');
    });

    it('should display a button to save question items', () => {
        expect(nativeElement.querySelector(Selector.selector('delete-link')).textContent)
            .toBe('Delete question');
    });
});
