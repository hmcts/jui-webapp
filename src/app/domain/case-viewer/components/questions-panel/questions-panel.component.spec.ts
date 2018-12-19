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
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ QuestionsPanelComponent, TestQuestionsPanelDummyHostComponent ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [RouterTestingModule]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        testHostFixture = TestBed.createComponent(TestQuestionsPanelDummyHostComponent);
        testHostComponent = testHostFixture.componentInstance;
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
})




describe('QuestionsPanelComponent: testing route.queryParams', () => {
    let component: QuestionsPanelComponent;
    let fixture: ComponentFixture<QuestionsPanelComponent>;
    let nativeElement;
    let mockConfigService;

    beforeEach(() => {
        mockConfigService = {
            config: {
                api_base_url: api_base_url
            }
        };
    });

    describe('when no create param is in the url', () => {
        describe('When there is one round of draft questions to appellant', () => {
            beforeEach(async(() => {
                TestBed
                    .configureTestingModule({
                        imports: [
                            // CaseViewerModule,
                            RouterTestingModule
                        ],
                        schemas: [CUSTOM_ELEMENTS_SCHEMA],
                        declarations: [QuestionsPanelComponent]
                    })
                    .compileComponents();
            }));

            const data = mockQuestion;

            beforeEach(async(() => {
                fixture = TestBed.createComponent(QuestionsPanelComponent);
                component = fixture.componentInstance;
                component.panelData = data;
                nativeElement = fixture.nativeElement;
                fixture.detectChanges();
            }));

            it('should create', () => {
                expect(component)
                    .toBeTruthy();
            });


        });
    });

    describe('When there are no draft questions to appellant', () => {
        beforeEach(async(() => {
            TestBed
                .configureTestingModule({
                    imports: [
                        RouterTestingModule
                    ],
                    declarations: [QuestionsPanelComponent],
                    schemas: [CUSTOM_ELEMENTS_SCHEMA],
                    providers: [
                        {
                            provide: ConfigService,
                            useValue: mockConfigService
                        }
                    ]
                })
                .compileComponents();
        }));

        const data = mockQuestionEmpty;

        beforeEach(async(() => {
            fixture = TestBed.createComponent(QuestionsPanelComponent);
            component = fixture.componentInstance;
            component.panelData = data;
            nativeElement = fixture.nativeElement;
            fixture.detectChanges();
        }));

        it('should create', () => {
            expect(component)
                .toBeTruthy();
        });

        it('should not display link to send all draft questions', () => {
            expect(nativeElement.querySelector(Selector.selector('send-draft-questions-link')))
                .toBeFalsy();
        });

        it('should see no draft questions', () => {
            expect(nativeElement.querySelectorAll(Selector.selector('draft-questions-list')).length)
                .toBe(0);
        });
    });

    describe('When there are sent questions to appellant', () => {
        beforeEach(async(() => {
            TestBed
                .configureTestingModule({
                    imports: [
                        RouterTestingModule
                    ],
                    declarations: [QuestionsPanelComponent],
                    schemas: [CUSTOM_ELEMENTS_SCHEMA],
                    providers: [
                        {
                            provide: ConfigService,
                            useValue: mockConfigService
                        }
                    ]
                })
                .compileComponents();
        }));

        const data = mockQuestionsPanelData;

        beforeEach(async(() => {
            fixture = TestBed.createComponent(QuestionsPanelComponent);
            component = fixture.componentInstance;
            component.panelData = data;
            nativeElement = fixture.nativeElement;
            fixture.detectChanges();
        }));

        it('should create', () => {
            expect(component)
                .toBeTruthy();
        });
        it('should display sent questions', () => {
            expect(nativeElement.querySelectorAll(Selector.selector('questions-item')).length)
                .toBe(0);
        });


    });

    describe('When there are answers from appellant', () => {
        beforeEach(async(() => {
            TestBed
                .configureTestingModule({
                    imports: [
                        CaseViewerModule,
                        RouterTestingModule
                    ],
                    declarations: [],
                    providers: [
                        {
                            provide: ConfigService,
                            useValue: mockConfigService
                        }
                    ]
                })
                .compileComponents();
        }));

        const data = mockQuestions2;

        beforeEach(async(() => {
            fixture = TestBed.createComponent(QuestionsPanelComponent);
            component = fixture.componentInstance;
            component.panelData = data;
            nativeElement = fixture.nativeElement;
            fixture.detectChanges();
        }));

        it('should create', () => {
            expect(component)
                .toBeTruthy();
        });
        it('should display sent questions', () => {
            expect(nativeElement.querySelectorAll(Selector.selector('questions-item')).length)
                .toBe(2);
        });
    });
});

