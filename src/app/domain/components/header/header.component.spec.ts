import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {HeaderComponent} from './header.component';
import {AuthService} from '../../../auth/auth.service';
import {HmctsGlobalHeaderComponent} from '../../../hmcts/components/hmcts-global-header/hmcts-global-header.component';
import {HmctsPrimaryNavigationComponent} from '../../../hmcts/components/hmcts-primary-navigation/hmcts-primary-navigation.component';

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HeaderComponent, HmctsGlobalHeaderComponent, HmctsPrimaryNavigationComponent],
            providers: [
                { provide: AuthService, useValue: {
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
});
