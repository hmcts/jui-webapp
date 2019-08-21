import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ConfigService} from './config.service';
import {configMock} from './domain/services/mock/config.env.mock';
import {RouterTestingModule} from '@angular/router/testing';
import { Router } from '@angular/router';
describe('AppComponent', () => {

    let app;
    let fixture;
    let router: Router;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [
                AppComponent
            ],
            providers: [
                {
                    provide: ConfigService,
                    useValue: configMock
                }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(AppComponent);
        app = fixture.debugElement.componentInstance;
        router = TestBed.get(Router);

    }));
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
});
