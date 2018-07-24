import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewQuestionComponent } from './view.component';
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
import { of } from 'rxjs';

xdescribe('ViewQuestionComponent', () => {
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
                        params: of({
                            'question_id': '43eb9981-9360-4d4b-b9fd-506b5818e7ff'
                        }),
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
        fixture = TestBed.createComponent(ViewQuestionComponent);
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        httpMock = TestBed.get(HttpTestingController);
        fixture.detectChanges();
    });
});
