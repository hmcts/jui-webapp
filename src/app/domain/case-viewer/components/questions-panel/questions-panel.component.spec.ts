import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {QuestionsPanelComponent} from './questions-panel.component';
import {CaseViewerModule} from '../../case-viewer.module';
import {Selector} from '../../../../shared/selector-helper';
import {RouterTestingModule} from '@angular/router/testing';
import {ConfigService} from '../../../../config.service';
import {mockQuestion, mockQuestionEmpty, mockQuestions2, mockQuestionsPanelData} from './mock/mock-questions.mock';
import {api_base_url} from '../../../../enviorment.mock';
import {Component, CUSTOM_ELEMENTS_SCHEMA, DebugElement, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PageDateQuestion} from '../../../models/section_fields';
import {mockActiveRouteQuestionsPanel} from './mock/activeRoute.mock';
import {mockConfigService} from '../../../mock/config.mock';
@Component({
    selector: `app-host-dummy-component`,
    template: `<app-questions-panel [panelData]="data"></app-questions-panel>`
})
class TestQuestionsPanelDummyHostComponent {
    private data: PageDateQuestion = mockQuestion;
    @ViewChild(QuestionsPanelComponent)
    public QuestionsPanelComponent: QuestionsPanelComponent;
}
describe('Testing @input', () => {
    let testHostComponent: TestQuestionsPanelDummyHostComponent;
    let testHostFixture: ComponentFixture<TestQuestionsPanelDummyHostComponent>;
    let component: QuestionsPanelComponent;
    let fixture: ComponentFixture<QuestionsPanelComponent>;
    let nativeElement;
    let mockConfigService;


    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ QuestionsPanelComponent, TestQuestionsPanelDummyHostComponent ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [RouterTestingModule],
            providers: [
                {
                    provide: ConfigService,
                    useValue: mockConfigService
                }
            ]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        testHostFixture = TestBed.createComponent(TestQuestionsPanelDummyHostComponent);
        testHostComponent = testHostFixture.componentInstance;
        fixture = TestBed.createComponent(QuestionsPanelComponent);
        component = fixture.componentInstance;
    });
    it('should fail panelData as not be passed through', () => {
        expect(testHostComponent.QuestionsPanelComponent.panelData).toBeUndefined();
    });
    it('should pass panelData as not be passed through', () => {
        testHostFixture.detectChanges();
        expect(testHostComponent.QuestionsPanelComponent.panelData).toBeDefined();
        expect(testHostComponent.QuestionsPanelComponent.panelData.fields[0].value.length).toEqual(1);
    });
    it('panelData questions should be 2', () => {
        testHostFixture.detectChanges();
        expect(testHostComponent.QuestionsPanelComponent.panelData.fields[0].value.length).toEqual(1);
        expect(testHostComponent.QuestionsPanelComponent.panelData.fields[0].value instanceof Array).toBeTruthy();
    });


    it('should create', () => {
        component.panelData = mockQuestion;
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();
        expect(component)
            .toBeTruthy();
    });
    it('should not display link to send all draft questions', () => {
        component.panelData = mockQuestion;
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();
        expect(nativeElement.querySelector(Selector.selector('send-draft-questions-link')))
            .toBeFalsy();
    });

    it('should see no draft questions', () => {
        component.panelData = mockQuestion;
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();
        expect(nativeElement.querySelectorAll(Selector.selector('draft-questions-list')).length)
            .toBe(0);
    });

    it('mockQuestionsPanelData: should create with', () => {
        const data = mockQuestionsPanelData;
        component.panelData = data;
        fixture.detectChanges();
        expect(component)
            .toBeTruthy();
    });
    it('mockQuestionsPanelData: should display sent questions', () => {
        const data = mockQuestionsPanelData;
        component.panelData = data;
        fixture.detectChanges();
        expect(nativeElement.querySelectorAll(Selector.selector('questions-item')).length)
            .toBe(0);
    });
    it('should create', () => {
        component.panelData = mockQuestions2;
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();
        expect(component)
            .toBeTruthy();
    });
    it('should display sent questions', () => {
        component.panelData = mockQuestions2;
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();
        expect(nativeElement.querySelectorAll(Selector.selector('questions-item')).length)
            .toBe(0);
    });

})

