import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CaseBarComponent } from './casebar.component';
import { SharedModule } from '../../../shared/shared.module';
import { DomainModule } from '../../domain.module';
import { CaseService } from '../../../case.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ConfigService } from '../../../config.service';
import { BrowserTransferStateModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

const caseUrl = '/api/cases/1531309876267122';
const configMock = {
    config: {
        api_base_url: ''
    }
};

describe('CaseBarComponent', () => {
    let component: CaseBarComponent;
    let fixture: ComponentFixture<CaseBarComponent>;
    let httpMock: HttpTestingController;
    let nativeElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [],
            imports: [
                DomainModule,
                SharedModule,
                BrowserTransferStateModule,
                HttpClientTestingModule,
                RouterTestingModule
            ],
            providers: [
                CaseService,
                {
                    provide: ConfigService,
                    useValue: configMock
                }
            ]
        })
               .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CaseBarComponent);
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        httpMock = TestBed.get(HttpTestingController);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
