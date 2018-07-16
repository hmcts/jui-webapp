import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HearingMakeComponent } from './hearing-make.component';
import {RouterTestingModule} from '@angular/router/testing';

describe('HearingMakeComponent', () => {
    let component: HearingMakeComponent;
    let fixture: ComponentFixture<HearingMakeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ HearingMakeComponent ],
            imports: [RouterTestingModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HearingMakeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
