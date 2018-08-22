import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GovukBackLinkComponent } from './govuk-back-link.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('GovukBackLinkComponent', () => {
    let component: GovukBackLinkComponent;
    let fixture: ComponentFixture<GovukBackLinkComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ GovukBackLinkComponent ],
            imports: [ HttpClientTestingModule, RouterTestingModule],

        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GovukBackLinkComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
