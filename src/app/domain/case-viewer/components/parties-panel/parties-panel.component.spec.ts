import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DomainModule } from '../../../domain.module';
import { CaseViewerModule } from '../../case-viewer.module';
import { PartiesPanelComponent } from './parties-panel.component';
import { Observable } from 'rxjs';
import { SharedModule } from '../../../../shared/shared.module';

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
                data: {
                    'id': 'parties-tabs',
                    'name': 'Parties',
                    'type': 'parties-panel',
                    'sections': [
                        {
                            'id': 'petitioner',
                            'name': 'Petitioner',
                            'type': 'tab',
                            'fields': [
                                {
                                    'label': 'Full name',
                                    'value': ['David ', 'Francis']
                                },
                                {
                                    'label': 'Date of birth',
                                    'value': '7 June 1981'
                                },
                                {
                                    'label': 'Address',
                                    'value': '24 Park Road<br>Lewisham<br>London<br>E11 4PR'
                                },
                                {
                                    'label': 'Phone',
                                    'value': '07787 557 967'
                                },
                                {
                                    'label': 'Email',
                                    'value': 'david.francis@gmail.com'
                                },
                                {
                                    'label': 'Representative',
                                    'value': 'Unrepresented'
                                }
                            ]
                        },
                        {
                            'id': 'respondent',
                            'name': 'Respondent',
                            'type': 'tab',
                            'fields': [
                                {
                                    'label': 'Full name',
                                    'value': ['Susan ', 'Francis']
                                },
                                {
                                    'label': 'Date of birth',
                                    'value': '16 April 1979'
                                },
                                {
                                    'label': 'Address',
                                    'value': '89 London Road<br>Hinckley<br>London<br>LE10 1HH'
                                },
                                {
                                    'label': 'Phone',
                                    'value': '07700 900 772'
                                },
                                {
                                    'label': 'Email',
                                    'value': 'susan.francis@gmail.com'
                                },
                                {
                                    'label': 'Representative',
                                    'value': 'Unrepresented'
                                }
                            ]
                        }
                    ]
                }
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
        component.panelData = activeRouteMock.snapshot.data;
        fixture.detectChanges();
    }

    beforeEach(() => {
        createComponent();
    });

    it('should create PartiesComponent', () => {
        expect(component).toBeTruthy();
    });
});
