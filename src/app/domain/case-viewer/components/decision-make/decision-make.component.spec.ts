import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecisionMakeComponent } from './decision-make.component';
import {RouterTestingModule} from '@angular/router/testing';

describe('DecisionMakeComponent', () => {
    let component: DecisionMakeComponent;
    let fixture: ComponentFixture<DecisionMakeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ DecisionMakeComponent ],
            imports: [RouterTestingModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DecisionMakeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
