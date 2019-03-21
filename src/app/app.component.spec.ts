import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ConfigService} from './config.service';
import {configMock} from './domain/services/mock/config.env.mock';
import {RouterTestingModule} from '@angular/router/testing';
describe('AppComponent', () => {

    let app;
    let fixture;

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

        fixture = TestBed.createComponent(AppComponent);
        app = fixture.debugElement.componentInstance;

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
        expect(['test', '/']).toContain(app.replacedTitles('test'));
    }));
    it(`should return title mapping `, async(() => {
        expect('Your cases - Judicial case manager').toContain(app.getTitle('/'));
    }));
});
