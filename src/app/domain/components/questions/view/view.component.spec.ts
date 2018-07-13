import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewQuestionComponent } from './view.component';
import { DomainModule } from '../../../domain.module';
import { SharedModule } from '../../../../shared/shared.module';
import { QuestionService } from '../../../services/question.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ConfigService } from '../../../../config.service';
import { BrowserTransferStateModule, StateKey } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

const configMock = {
    config: {
        api_base_url: ''
    }
};

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
                RouterTestingModule
            ],
            providers: [
                QuestionService,
                {
                    provide: ConfigService,
                    useValue: configMock
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

    describe('when there is no data', () => {
        it('should create', () => {
            expect(component)
                .toBeTruthy();
        });
    });
});
