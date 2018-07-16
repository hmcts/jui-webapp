import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateQuestionsComponent } from './create.component';
import { SharedModule } from '../../../../shared/shared.module';
import { DomainModule } from '../../../domain.module';
import { QuestionService } from '../../../services/question.service';
import { Selector } from '../../../../../../test/selector-helper';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ConfigService } from '../../../../config.service';
import { BrowserTransferStateModule, StateKey } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { RedirectionService } from '../../../../routing/redirection.service';
import {CaseService} from '../../../../case.service';
import { of } from 'rxjs';

const questionsUrl = '/api/questions';
const mockRoute = {
    params: of({
        'case_id': '13eb9981-9360-4d4b-b9fd-506b5818e7ff'
    }),
    queryParams: of({}),
    snapshot: {
        params: {
            'case_id': '13eb9981-9360-4d4b-b9fd-506b5818e7ff'
        },
        queryParams: {}
    }
};
const configMock = {
    config: {
        api_base_url: ''
    }
};

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
                RouterModule
            ],
            providers: [
                RedirectionService,
                CaseService,
                QuestionService,
                {
                    provide: ActivatedRoute,
                    useValue: mockRoute
                },
                {
                    provide: ConfigService,
                    useValue: configMock
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

    beforeEach(async(() => {
        fixture.whenStable().then(() => {
            fixture.detectChanges();
        });
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display a back button that returns user to previous page', () => {
        expect(nativeElement.querySelector(Selector.selector('back-button')).textContent).toBe('Back');
        expect(nativeElement.querySelector(Selector.selector('back-button')).attributes.href.value).toEqual('/');
        expect(nativeElement.querySelector(Selector.selector('back-button')).attributes.routerlink.value).toEqual('..');
    });

    it('should display a heading', () => {
        expect(nativeElement.querySelector(Selector.selector('create-questions-heading')).textContent).toBe('Create questions');
    });

    it('should display a heading for each new question item', () => {
        expect(nativeElement.querySelectorAll(Selector.selector('new-question-item-heading')).length).toBe(1);
        expect(nativeElement.querySelector(Selector.selector('new-question-item-heading')).textContent).toBe('Question');
    });

    it('should display a subject text input for each new question item', () => {
        expect(nativeElement.querySelectorAll(Selector.selector('new-question-item-subject')).length).toBe(1);
        expect(nativeElement.querySelector(Selector.selector('new-question-item-subject-label')).textContent).toBe('Subject');
        expect(nativeElement.querySelectorAll(Selector.selector('new-question-item-subject-input')).length).toBe(1);
    });

    it('should display a question text area for each new question item', () => {
        expect(nativeElement.querySelectorAll(Selector.selector('new-question-item-question-body')).length).toBe(1);
        expect(nativeElement.querySelector(Selector.selector('new-question-item-question-label')).textContent).toBe('Question');
        expect(nativeElement.querySelectorAll(Selector.selector('new-question-item-question-textarea')).length).toBe(1);
    });

    it('should display a button to save question items', () => {
        expect(nativeElement.querySelectorAll(Selector.selector('save-button')).length).toBe(1);
    });
});
