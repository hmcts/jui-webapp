import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {HeaderComponent} from './header.component';
import {AuthService} from '../../../auth/auth.service';
import {HmctsGlobalHeaderComponent} from '../../../hmcts/components/hmcts-global-header/hmcts-global-header.component';
import {HmctsPrimaryNavigationComponent} from '../../../hmcts/components/hmcts-primary-navigation/hmcts-primary-navigation.component';
import {RouterTestingModule} from '@angular/router/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [HeaderComponent, HmctsGlobalHeaderComponent, HmctsPrimaryNavigationComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                {
                  provide: AuthService,
                  useValue: {
                    generateLoginUrl: () => {}
                }}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should test predefined data', () => {
        fixture.detectChanges();
        expect( component.navItems.length).toEqual(1);
        expect( component.navigations.items.length).toEqual(1);
    });
});
