import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA, Renderer2 } from '@angular/core';
import {ConfigService} from './config.service';
import {configMock} from './domain/services/mock/config.env.mock';
import {RouterTestingModule} from '@angular/router/testing';
import { Router } from '@angular/router';

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
        spyOn(renderer, 'addClass').and.callThrough();
        spyOn(renderer, 'removeClass').and.callThrough();
    });

    it('should create the app', () => {
        const component = fixture.componentInstance;
        expect(component).toBeTruthy();
        expect(component).not.toBeNull();
    });

    it(`should have as title 'app'`, () => {
        expect(app.title).toEqual('JUI Web App');
    });

    it(`should replace title`, () => {
        expect([...app.urls, '/']).toContain(app.replacedTitles('summary'));
    });

    it(`should replace title if not found`, () => {
        expect([...app.urls, '/']).toContain(app.replacedTitles('test'));
    });

    it(`should return title mapping `, () => {

        const mappings = {
            '/': 'Your cases - Judicial case manager',
            'summary': 'Summary - Judicial case manager',
            'parties': 'Parties - Judicial case manager',
            'caseFile': 'Case File - Judicial case manager',
            'timeline': 'Timeline - Judicial case manager',
            'decision': 'Make decision - Judicial case manager',
            'listOfHearing': 'List of hearing - Judicial case manager',
        };

        Object.keys(mappings).forEach( key => {
            expect(app.getTitle(key)).toBe(mappings[key]);
        });
    });

    it('should add the loading class if loading is true', () => {
        expect(renderer.addClass).not.toHaveBeenCalled();
        app.loading = true;
        expect(renderer.addClass).toHaveBeenCalledWith(jasmine.any(Object), app.loadingClass);
    });

    it('should remove the loading class if loading is false', () => {
        expect(renderer.removeClass).not.toHaveBeenCalled();
        app.loading = false;
        expect(renderer.removeClass).toHaveBeenCalledWith(jasmine.any(Object), app.loadingClass);
    });

    it('should subscribe to router events and call replacedTitles on navigation end', fakeAsync(() => {
        const title = 'Your cases - Judicial case manager';
        spyOn(app, 'replacedTitles').and.returnValue('/');
        spyOn(app, 'getTitle').and.returnValue(title);

        app.ngOnInit();
        router.navigate(['/']);
        tick();
        expect(app.replacedTitles).toHaveBeenCalledWith('/');
        expect(app.getTitle).toHaveBeenCalledWith('/');
        expect(app.title).toBe(title);
    }));

});
