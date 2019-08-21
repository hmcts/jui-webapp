import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA, Renderer2 } from '@angular/core';
import {ConfigService} from './config.service';
import {configMock} from './domain/services/mock/config.env.mock';
import {RouterTestingModule} from '@angular/router/testing';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

describe('AppComponent', () => {

    let app;
    let fixture;
    let router: Router;
    let renderer: Renderer2;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [
                AppComponent
            ],
            providers: [
                Renderer2,
                {
                    provide: ConfigService,
                    useValue: configMock
                }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();

    }));

    beforeEach( () => {
        fixture = TestBed.createComponent(AppComponent);
        app = fixture.debugElement.componentInstance;
        router = TestBed.get(Router);

        renderer = fixture.componentRef.injector.get(Renderer2);
        // and spy on it
        spyOn(renderer, 'addClass').and.callThrough();
        spyOn(renderer, 'removeClass').and.callThrough();
    });

    it('should create the app', async(() => {
        const component = fixture.componentInstance;
        expect(component).toBeTruthy();
        expect(component).not.toBeNull();
    }));
    it(`should have as title 'app'`, async(() => {
        expect(app.title).toEqual('JUI Web App');
    }));
    it(`should replace title`, async(() => {
        expect(['summary', 'parties', 'casefile', 'timeline', 'decision', 'hearing', 'reject-reasons', '/']).toContain(app.replacedTitles('test'));
    }));
    it(`should return title mapping `, async(() => {
        expect('Your cases - Judicial case manager').toContain(app.getTitle('/'));
    }));

    it('should call navigationInterceptor on init router subscribe', fakeAsync( () => {
        const spy = spyOn(app, 'navigationInterceptor');
        expect(spy).not.toHaveBeenCalled();
        app.ngOnInit();
        router.navigate(['']);
        tick();
        expect(spy).toHaveBeenCalled();
    }));

    it('should add the loading class if loading is true', async( () => {
        expect(renderer.addClass).not.toHaveBeenCalled();
        app.loading = true;
        expect(renderer.addClass).toHaveBeenCalledWith(jasmine.any(Object), app.loadingClass);
    }));

    it('should remove the loading class if loading is false', async( () => {
        expect(renderer.removeClass).not.toHaveBeenCalled();
        app.loading = false;
        expect(renderer.removeClass).toHaveBeenCalledWith(jasmine.any(Object), app.loadingClass);
    }));

    describe('navigationInterceptor', () => {

        let spy;

        beforeEach( () => {
            spy = spyOnProperty(app, 'loading', 'set');
        });

        it('should set loading state to true if navigation start', async( () => {
            const ne = new NavigationStart(0, 'http://localhost:4200', 'imperative');
            app.navigationInterceptor(ne);
            expect(spy).toHaveBeenCalledWith(true);
        }));

        it('should set loading state to false if navigation end', async( () => {
            const ne = new NavigationEnd(0, 'http://localhost:4200', 'http://localhost:4200/login');
            app.navigationInterceptor(ne);
            expect(spy).toHaveBeenCalledWith(false);
        }));

        it('should set loading state to false if navigation cancel', async( () => {
            const ne = new NavigationCancel(0, 'http://localhost:4200/login', 'cancelled');
            app.navigationInterceptor(ne);
            expect(spy).toHaveBeenCalledWith(false);
        }));

        it('should set loading state to false if navigation error', async( () => {
            const ne = new NavigationError(0, 'http://localhost:4200/login', 'error');
            app.navigationInterceptor(ne);
            expect(spy).toHaveBeenCalledWith(false);
        }));
    });

});
