import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {QuestionsPanelComponent} from './questions-panel.component';
import {CaseViewerModule} from '../../case-viewer.module';
import {Selector} from '../../../../../../test/selector-helper';
import {ActivatedRoute} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {ConfigService} from '../../../../config.service';
import {of} from 'rxjs';

describe('QuestionsPanelComponent', () => {
    let component: QuestionsPanelComponent;
    let fixture: ComponentFixture<QuestionsPanelComponent>;
    let nativeElement;
    const mockRoute = {
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
        queryParams: of({}),
    };
    const mockConfigService = {
        config: {
            api_base_url: 'http://localhost:3000'
        }
    };

    describe('when no create param is in the url', () => {
        describe('When there is one round of draft questions to appellant', () => {
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
                                provide: ActivatedRoute,
                                useValue: mockRoute
                            },
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
                'sections': [
                    {
                        'id': 'questions-to-appellant',
                        'name': 'Questions to appellant',
                        'type': 'data-list',
                        'sections': [
                            {
                                'id': 'draft-questions',
                                'name': 'Draft Questions',
                                'type': 'data-list',
                                'fields': [
                                    {
                                        'value': [
                                            {
                                                'id': '5eea164a-62ee-43ee-8051-67b82b5af24f',
                                                'header': 'What are you doing?',
                                                'body': 'Nothing.',
                                                'owner_reference': '5899',
                                                'state_datetime': new Date(Date.UTC(2018, 6, 13, 8, 52, 38))
                                            },
                                            {
                                                'id': '4eea164a-62ee-43ee-8051-67b82b5af24f',
                                                'header': 'What are you doing now?',
                                                'body': 'Still nothing.',
                                                'owner_reference': '5899',
                                                'state_datetime': new Date(Date.UTC(2018, 6, 14, 8, 52, 38))
                                            }
                                        ]
                                    }
                                ]
                            }, {
                                'id': 'sent-questions',
                                'name': 'Sent Questions',
                                'type': 'data-list',
                                'fields': [
                                    {
                                        'value': []
                                    }
                                ]
                            }
                        ]
                    }
                ]
            };

            beforeEach(async(() => {
                fixture = TestBed.createComponent(QuestionsPanelComponent);
                component = fixture.componentInstance;
                component.panelData = data;
                component.caseId = '13eb9981-9360-4d4b-b9fd-506b5818e7ff';
                nativeElement = fixture.nativeElement;
                fixture.detectChanges();
            }));

            it('should create', () => {
                expect(component)
                    .toBeTruthy();
            });

            it('should display a list of draft questions to appellant', () => {
                expect(nativeElement.querySelectorAll(Selector.selector('draft-questions-item')).length)
                    .toBe(2);
            });

            it('should display details of when draft questions were added', () => {
                expect(nativeElement.querySelector(Selector.selector('draft-questions-details')).textContent)
                    .toBe('You have not sent these questions to the appellant');
            });

            it('should display two draft questions', () => {
                expect(nativeElement.querySelectorAll(Selector.selector('draft-questions-item')).length)
                    .toBe(2);
            });

            it('should display two draft questions headings with a link to the associated question', () => {
                const links = nativeElement.querySelectorAll(Selector.selector('questions-subject-link'));
                expect(links[0].attributes.href.value)
                    .toEqual('/viewcase/13eb9981-9360-4d4b-b9fd-506b5818e7ff/questions/5eea164a-62ee-43ee-8051-67b82b5af24f');
                expect(links[1].attributes.href.value)
                    .toEqual('/viewcase/13eb9981-9360-4d4b-b9fd-506b5818e7ff/questions/4eea164a-62ee-43ee-8051-67b82b5af24f');
            });

            it('should display two draft questions meta data', () => {
                const metadata = nativeElement.querySelectorAll(Selector.selector('questions-meta-data'));
                expect(metadata[0].textContent)
                    .toBe('Last updated by 5899 at 8:52am on 13 July 2018');
                expect(metadata[1].textContent)
                    .toBe('Last updated by 5899 at 8:52am on 14 July 2018');
            });

            it('should display link to add more draft questions', () => {
                expect(nativeElement.querySelector(Selector.selector('create-draft-questions-link')).textContent)
                    .toBe('Add Questions');
                expect(nativeElement.querySelector(Selector.selector('create-draft-questions-link')).attributes.href.value)
                    .toEqual('/viewcase/13eb9981-9360-4d4b-b9fd-506b5818e7ff/questions/new');
            });

            it('should display link to send all draft questions', () => {
                expect(nativeElement.querySelector(Selector.selector('send-draft-questions-link')).textContent)
                    .toBe('Send Questions');
                expect(nativeElement.querySelector(Selector.selector('send-draft-questions-link')).attributes.href.value)
                    .toEqual('/viewcase/13eb9981-9360-4d4b-b9fd-506b5818e7ff/questions/check');
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
                            provide: ActivatedRoute,
                            useValue: mockRoute
                        },
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
            'sections': [
                {
                    'id': 'questions-to-appellant',
                    'name': 'Questions to appellant',
                    'type': 'data-list',
                    'sections': [
                        {
                            'id': 'draft-questions',
                            'name': 'Draft Questions',
                            'type': 'data-list',
                            'fields': [
                                {
                                    'value': []
                                }
                            ]
                        },
                        {
                            'id': 'sent-questions',
                            'name': 'Sent Questions',
                            'type': 'data-list',
                            'fields': [
                                {
                                    'value': []
                                }
                            ]
                        }
                    ]
                }
            ]
        };

        beforeEach(async(() => {
            fixture = TestBed.createComponent(QuestionsPanelComponent);
            component = fixture.componentInstance;
            component.panelData = data;
            component.caseId = '13eb9981-9360-4d4b-b9fd-506b5818e7ff';
            nativeElement = fixture.nativeElement;
            fixture.detectChanges();
        }));

        it('should create', () => {
            expect(component)
                .toBeTruthy();
        });

        it('should display a title', () => {
            expect(nativeElement.querySelector(Selector.selector('questions-to-appellant-heading')).textContent)
                .toBe('Questions to appellant');
        });

        it('should display round 1 title', () => {
            expect(nativeElement.querySelector(Selector.selector('round-1')).textContent)
                .toBe('Round 1');
        });

        it('should display details of why no draft questions', () => {
            expect(nativeElement.querySelector(Selector.selector('no-draft-questions-details')).textContent)
                .toBe('You haven’t asked any questions.');
        });

        it('should display link to add draft questions', () => {
            expect(nativeElement.querySelector(Selector.selector('no-draft-questions-link')).textContent)
                .toBe('Add Questions');
            expect(nativeElement.querySelector(Selector.selector('no-draft-questions-link')).attributes.href.value)
                .toEqual('/viewcase/13eb9981-9360-4d4b-b9fd-506b5818e7ff/questions/new');
        });

        it('should see no draft questions', () => {
            expect(nativeElement.querySelectorAll(Selector.selector('draft-questions-list')).length)
                .toBe(0);
        });
    });
});

