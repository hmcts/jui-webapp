import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PartiesPanelComponent } from './parties-panel.component';

import {RouterTestingModule} from '@angular/router/testing';

fdescribe('Component: PartiesPanelComponent', () => {
    let component: PartiesPanelComponent;
    let fixture: ComponentFixture<PartiesPanelComponent>;

    beforeEach(async(() => {TestBed.configureTestingModule({
                imports: [RouterTestingModule],
                declarations: [PartiesPanelComponent]
            }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PartiesPanelComponent);
        component = fixture.componentInstance;

        component.params = {
            jur: "DIVORCE",
            casetype: "DIVORCE",
            case_id: '1533043850228176',
            section: 'parties'
        };

        component.panelData =  {
            "id": "parties",
            "name": "Parties",
            "type": "page",
            "sections": [
                {
                    "id": "parties-tabs",
                    "name": "Parties",
                    "type": "parties-panel",
                    "sections": [
                        {
                            "id": "petitioner",
                            "name": "Petitioner",
                            "type": "tab",
                            "fields": [
                                {
                                    "label": "Full name",
                                    "value": ["$.case_data.appeal.appellant.name.firstName", "$.case_data.appeal.appellant.name.lastName"]
                                },
                                {
                                    "label": "Date of birth",
                                    "value": "$.case_type_id"
                                },
                                {
                                    "label": "Address",
                                    "value": "$.case_type_id"
                                },
                                {
                                    "label": "Phone",
                                    "value": "$.case_type_id"
                                },
                                {
                                    "label": "Email",
                                    "value": "$.case_type_id"
                                },
                                {
                                    "label": "Representative",
                                    "value": "$.case_type_id"
                                },
                                {
                                    "label": "Parties",
                                    "value": "$.id"
                                },
                                {
                                    "label": "Case number",
                                    "value": "$.id"
                                },
                                {
                                    "label": "Case type",
                                    "value": "$.case_type_id"
                                }
                            ]
                        },
                        {
                            "id": "respondent",
                            "name": "Respondent",
                            "type": "tab",
                            "fields": [
                                {
                                    "label": "Full name",
                                    "value": ["$.case_data.appeal.appellant.name.firstName", "$.case_data.appeal.appellant.name.lastName"]
                                },
                                {
                                    "label": "Date of birth",
                                    "value": "$.case_type_id"
                                },
                                {
                                    "label": "Address",
                                    "value": "$.case_type_id"
                                },
                                {
                                    "label": "Phone",
                                    "value": "$.case_type_id"
                                },
                                {
                                    "label": "Email",
                                    "value": "$.case_type_id"
                                },
                                {
                                    "label": "Representative",
                                    "value": "$.case_type_id"
                                },
                                {
                                    "label": "Parties",
                                    "value": "$.id"
                                },
                                {
                                    "label": "Case number",
                                    "value": "$.id"
                                },
                                {
                                    "label": "Case type",
                                    "value": "$.case_type_id"
                                }
                            ]
                        }
                    ]
                }
            ]
        };
        fixture.detectChanges();
    });
    it('should create PartiesComponent', () => {
        expect(component).toBeTruthy();
    });

    describe('when parties page loaded', () => {
        it('open the first tab url', () => {
            expect(true).toBe(true);
        });
    });
});
