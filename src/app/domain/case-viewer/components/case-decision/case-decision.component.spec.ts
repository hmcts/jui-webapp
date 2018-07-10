import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseDecisionComponent } from './case-decision.component';
import {RouterTestingModule} from '@angular/router/testing';

describe('CaseDecisionComponent', () => {
    let component: CaseDecisionComponent;
    let fixture: ComponentFixture<CaseDecisionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ CaseDecisionComponent ],
            imports: [RouterTestingModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CaseDecisionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
