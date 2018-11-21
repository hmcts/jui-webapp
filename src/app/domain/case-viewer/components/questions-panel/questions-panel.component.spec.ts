import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {QuestionsPanelComponent} from './questions-panel.component';
import {CaseViewerModule} from '../../case-viewer.module';
import {Selector} from '../../../../../../test/selector-helper';
import {RouterTestingModule} from '@angular/router/testing';
import {ConfigService} from '../../../../config.service';
import { mockQuestion } from './mock/mock-questions.mock';

describe('QuestionsPanelComponent', () => {
    let component: QuestionsPanelComponent;
    let fixture: ComponentFixture<QuestionsPanelComponent>;
    let nativeElement;
    let mockConfigService;

    beforeEach(() => {
        mockConfigService = {
            config: {
                api_base_url: 'http://localhost:3000'
            }
        };
    });

    describe('when no create param is in the url', () => {
        describe('When there is one round of draft questions to appellant', () => {
            beforeEach(async(() => {
                TestBed
                    .configureTestingModule({
                        imports: [
                            CaseViewerModule,
                            RouterTestingModule
                        ],
                        declarations: []
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

            it('should display a list of draft questions to appellant', () => {
                expect(nativeElement.querySelectorAll(Selector.selector('questions-item')).length)
                    .toBe(2);
            });

            it('should display details of when draft questions were added', () => {
                expect(nativeElement.querySelector(Selector.selector('draft-questions-details')).textContent)
                    .toBe('You have not sent these questions to the appellant.');
            });

            it('should display two draft questions', () => {
                expect(nativeElement.querySelectorAll(Selector.selector('questions-item')).length)
                    .toBe(2);
            });

            it('should display two draft questions headings with a link to the associated question', () => {
                const links = nativeElement.querySelectorAll(Selector.selector('questions-subject-link'));
                expect(links[0].attributes.href.value)
                    .toEqual('/be8ac935-ed7a-47b5-84ce-b5aa25e64512');
                expect(links[1].attributes.href.value)
                    .toEqual('/c7935438-b54c-4dad-bbe8-34fff72caf81');
            });

            it('should display two draft questions meta data', () => {
                const metadata = nativeElement.querySelectorAll(Selector.selector('questions-meta-data'));
                expect(metadata[0].textContent)
                    .toBe('Last updated by 5899 on 13 July 2018 at 8:52am');
                expect(metadata[1].textContent)
                    .toBe('Last updated by 5899 on 14 July 2018 at 8:52am');
            });

            it('should display link to add more draft questions', () => {
                expect(nativeElement.querySelector(Selector.selector('create-draft-questions-link')).textContent)
                    .toBe('Add questions');
                expect(nativeElement.querySelector(Selector.selector('create-draft-questions-link')).attributes.href.value)
                    .toEqual('/new/1');
            });

            it('should display link to send all draft questions', () => {
                expect(nativeElement.querySelector(Selector.selector('send-draft-questions-link')).textContent)
                    .toBe('Send questions');
                expect(nativeElement.querySelector(Selector.selector('send-draft-questions-link')).attributes.href.value)
                    .toEqual('/check/1');
            });
        });
    });

    describe('When there are no draft questions to appellant', () => {
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

        const data = {
            'name': 'Questions',
            'type': 'questions-panel',
            'fields': [
                {
                    'value': []
                }
            ]
        };

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

        xit('should display round 1 title', () => {
            expect(nativeElement.querySelector(Selector.selector('round-1')).textContent)
                .toBe('Round 1');
        });

        xit('should display details of why no draft questions', () => {
            expect(nativeElement.querySelector(Selector.selector('no-draft-questions-details')).textContent)
                .toBe('You haven’t asked any questions.');
        });

        xit('should display link to add draft questions', () => {
            expect(nativeElement.querySelector(Selector.selector('no-draft-add-questions-link')).textContent)
                .toBe('Add questions');
            expect(nativeElement.querySelector(Selector.selector('no-draft-add-questions-link')).attributes.href.value)
                .toEqual('/new/1');
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

        const data = {
            'name': 'Questions',
            'type': 'questions-panel',
            'fields': [
                {
                    'value': [{
                        'question_round_number': '1',
                        'state': 'question_issue_pending',
                        'questions': [
                            {
                                'id': 'be8ac935-ed7a-47b5-84ce-b5aa25e64512',
                                'header': 'Test header 1',
                                'body': 'Test body 1',
                                'owner_reference': '5899',
                                'state_datetime': new Date(Date.UTC(2018, 6, 13, 8, 52, 38)),
                                'state': 'question_issue_pending'
                            },
                            {
                                'id': 'c7935438-b54c-4dad-bbe8-34fff72caf81',
                                'header': 'Test header 2',
                                'body': 'Test Header 2',
                                'owner_reference': '5899',
                                'state_datetime': new Date(Date.UTC(2018, 6, 14, 8, 52, 38)),
                                'state': 'question_issue_pending'
                            }
                        ]
                    }]
                }
            ]
        };

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

        it('should display round 1 title', () => {
            expect(nativeElement.querySelector(Selector.selector('round-1')).textContent)
                .toBe('Round 1');
        });

        xit('should display round 2 title', () => {
            expect(nativeElement.querySelector(Selector.selector('round-2')).textContent)
                .toBe('Round 2');
        });

        xit('should display details of why no draft questions', () => {
            expect(nativeElement.querySelector(Selector.selector('no-draft-questions-details')).textContent)
                .toBe('You haven’t asked any questions.');
        });

        xit('should display link to add draft questions', () => {
            expect(nativeElement.querySelector(Selector.selector('no-draft-add-questions-link')).textContent)
                .toBe('Add questions');
            expect(nativeElement.querySelector(Selector.selector('no-draft-add-questions-link')).attributes.href.value)
                .toEqual('/new/2');
        });

        it('should display sent questions', () => {
            expect(nativeElement.querySelectorAll(Selector.selector('questions-item')).length)
                .toBe(2);
        });

        it('should display a message to say when the questions were sent', () => {
            expect(nativeElement.querySelector(Selector.selector('sent-questions-details')).textContent)
                .toEqual('You sent 2 questions to the appellant at 8:52am on 13 July 2018');
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

        const data = {
            'name': 'Questions',
            'type': 'questions-panel',
            'fields': [
                {
                    'value': [{
                        'question_round_number': '1',
                        'state': 'question_issue_pending',
                        'questions': [
                            {
                                'id': 'be8ac935-ed7a-47b5-84ce-b5aa25e64512',
                                'header': 'Test header 1',
                                'body': 'Test body 1',
                                'owner_reference': '5899',
                                'state_datetime': new Date(Date.UTC(2018, 6, 13, 8, 52, 38)),
                                'state': 'question_answered'
                            },
                            {
                                'id': 'c7935438-b54c-4dad-bbe8-34fff72caf81',
                                'header': 'Test header 2',
                                'body': 'Test Header 2',
                                'owner_reference': '5899',
                                'state_datetime': new Date(Date.UTC(2018, 6, 14, 8, 52, 38)),
                                'state': 'question_issued'
                            }
                        ]
                    }]
                }
            ]
        };

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

        it('should display a message to say when the questions were sent', () => {
            expect(nativeElement.querySelector(Selector.selector('questions-issued-meta-data')).textContent)
                .toEqual('Sent by 5899 on 14 July 2018 at 8:52am');
        });

        it('should display a message to say when the answer was sent', () => {
            expect(nativeElement.querySelector(Selector.selector('questions-answered-meta-data')).textContent)
                .toEqual('Responded by Appellant on 13 July 2018 at 8:52am');
        });
    });
});

