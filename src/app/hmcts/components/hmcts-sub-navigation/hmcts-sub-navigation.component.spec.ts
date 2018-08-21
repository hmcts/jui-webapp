import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HmctsSubNavigationComponent } from './hmcts-sub-navigation.component';
import {RouterTestingModule} from '@angular/router/testing';

describe('HmctsSubNavigationComponent', () => {
    let component: HmctsSubNavigationComponent;
    let fixture: ComponentFixture<HmctsSubNavigationComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ HmctsSubNavigationComponent ],
            imports: [RouterTestingModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HmctsSubNavigationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
