import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ConfigService} from './config.service';
import {configMock} from './domain/services/mock/config.env.mock';
import {RouterTestingModule} from '@angular/router/testing';
describe('AppComponent', () => {
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
            schemas:[CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();
    }));
    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const component = fixture.componentInstance;
        expect(component).toBeTruthy();
        expect(component).not.toBeNull();
    }));
    it(`should have as title 'app'`, async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app.title).toEqual('JUI Web App');
    }));
    it(`should replace title`, async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(['test', '/']).toContain(app.replacedTitles('test'));
    }));
    it(`should return title mapping `, async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect('Your cases - Judicial case manager').toContain(app.getTitle('/'));
    }));
});
