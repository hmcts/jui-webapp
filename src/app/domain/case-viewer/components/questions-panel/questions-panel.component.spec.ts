import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CaseViewerModule } from '../../case-viewer.module';
import { QuestionsPanelComponent } from './questions-panel.component';
import { DebugElement } from '@angular/core';
import { Selector } from '../../../../../../test/selector-helper';

describe('QuestionsPanelComponent', () => {
    let component: QuestionsPanelComponent;
    let fixture: ComponentFixture<QuestionsPanelComponent>;
    let element: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CaseViewerModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(QuestionsPanelComponent);
        component = fixture.componentInstance;
        element = fixture.debugElement;
    });

    it('should create', () => {
        expect(component)
            .toBeTruthy();
    });

    describe('When there is some data', () => {
        beforeEach(async(() => {
            component.panelData = {
                name: 'questions',
                type: 'questions-panel',
                fields: [
                    {
                        value: [
                            {
                                question_round: "1",
                                question_ordinal: "1",
                                question_header_text: "Title Example 1",
                                question_body_text: "More detail about this question 1.",
                                owner_reference: "John Smith",
                                question_id: "14555f9c-2981-430f-bb0a-52d163a5425f",
                                question_state: {
                                    state_name: "DRAFTED"
                                }
                            },
                            {
                                question_round: "1",
                                question_ordinal: "1",
                                question_header_text: "Title Example 2",
                                question_body_text: "More detail about this question 2.",
                                owner_reference: "John Smith",
                                question_id: "14555f9c-2981-430f-bb0a-52d163a5425g",
                                question_state: {
                                    state_name: "DRAFTED"
                                }
                            }
                        ]
                    }
                ]
            };

            fixture.whenStable().then(() => {
                fixture.detectChanges();
            });
        }));

        it('should see two questions', () => {
            expect(element.nativeElement.querySelectorAll(Selector.selector('questions-item')).length).toBe(2);
        });
    });

    describe('When there is no data', () => {
        beforeEach(async(() => {
            component.panelData = {
                name: 'questions',
                type: 'questions-panel',
                fields: [
                    {
                        value: []
                    }
                ]
            }

            fixture.whenStable().then(() => {
                fixture.detectChanges();
            });
        }));
        it('should see no questions', () => {
            expect(element.nativeElement.querySelectorAll(Selector.selector('questions-item')).length).toBe(0);
        });
    });
});

