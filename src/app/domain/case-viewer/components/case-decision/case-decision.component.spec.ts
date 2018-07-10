import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseDecisionContainerComponent } from './case-decision.component';
import {RouterTestingModule} from '@angular/router/testing';

describe('CaseDecisionComponent', () => {
    let component: CaseDecisionContainerComponent;
    let fixture: ComponentFixture<CaseDecisionContainerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ CaseDecisionContainerComponent ],
            imports: [RouterTestingModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CaseDecisionContainerComponent);
        component = fixture.componentInstance;
        component.caseId = 123456;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
