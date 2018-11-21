import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DomainModule } from '../../../domain.module';
import { CaseViewerModule } from '../../case-viewer.module';
import { PartiesPanelComponent } from './parties-panel.component';
import { Observable } from 'rxjs';
import { SharedModule } from '../../../../shared/shared.module';
import {mockSnapshot} from './mock/parties-panel.mock';

describe('Component: PartiesPanelComponent', () => {
    let component: PartiesPanelComponent;
    let fixture: ComponentFixture<PartiesPanelComponent>;
    let activeRouteMock;
    let routerNavigateSpy;
    let router;

    beforeEach(async(() => {
        activeRouteMock = {
            params: Observable.of({
                section: 'parties',
                jur: 'SSCS',
                casetype: 'Benefit',
                case_id: '1234',
                section_item_id: 'petitioner'
            }),
            fragment: Observable.of('petitioner'),
            snapshot: {
                data: mockSnapshot
            }
        };
        return setupModule();
    }));

    function setupModule(providers = []) {

        TestBed.configureTestingModule({
            declarations: [],
            imports: [ SharedModule, DomainModule, CaseViewerModule, RouterTestingModule],
            providers: [
                { provide: ActivatedRoute, useFactory: () => activeRouteMock },
                ...providers
            ]
        }).compileComponents();

        router = TestBed.get(Router);
        routerNavigateSpy = spyOn(router, 'navigate').and.returnValue(Promise.resolve({}));
    }

    function createComponent() {
        fixture = TestBed.createComponent(PartiesPanelComponent);
        component = fixture.componentInstance;
        component.panelData = mockSnapshot;
        fixture.detectChanges();
    }

    beforeEach(() => {
        createComponent();
    });

    it('should create PartiesComponent', () => {
        expect(component).toBeTruthy();
    });

});
