import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ViewCaseComponent} from './view-case.component';
import {RouterTestingModule} from '@angular/router/testing';
import {CaseViewerModule} from '../../../domain/case-viewer/case-viewer.module';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import 'rxjs-compat/add/observable/of';
import {DomainModule} from '../../../domain/domain.module';
import {Selector} from '../../../../../test/selector-helper';
import {Router} from '@angular/router';
import {HmctsModule} from '../../../hmcts/hmcts.module';
import {SharedModule} from '../../../shared/shared.module';

describe('ViewCaseComponent', () => {
    let component: ViewCaseComponent;
    let fixture: ComponentFixture<ViewCaseComponent>;
    let activeRouteMock;
    let routerNavigateSpy;
    let router;

    beforeEach(async(() => {
        activeRouteMock = {
            params: Observable.of({section: 'section_id2'}),
            snapshot: {
                data: {
                    caseData: {
                        id: 'case_id',
                        case_jurisdiction: 'SSCS',
                        case_type_id: 'Benefit',
                        sections: [
                            {
                                id: 'section_id1',
                                name: 'section_name1'
                            },
                            {
                                id: 'section_id2',
                                name: 'section_name2'
                            },
                            {
                                id: 'section_id3',
                                name: 'section_name3'
                            }
                        ]
                    }
                }
            }
        };
        return setupModule();
    }));

    function setupModule(providers = []) {

        TestBed.configureTestingModule({
            declarations: [ViewCaseComponent],
            imports: [DomainModule, CaseViewerModule, RouterTestingModule, HmctsModule, SharedModule],
            providers: [
                { provide: ActivatedRoute, useFactory: () => activeRouteMock },
                ...providers
            ]
        })
            .compileComponents();
        router = TestBed.get(Router);
        routerNavigateSpy = spyOn(router, 'navigate').and.returnValue(Promise.resolve({}));
    }

    function createComponent() {
        fixture = TestBed.createComponent(ViewCaseComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }

    beforeEach(() => {
        createComponent();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('Links', () => {

        it('should create links for each section', () => {
            expect(component.links.length).toEqual(3);
        });

        it('should render anchor links for each link', () => {
            const linkElements = document.querySelectorAll(Selector.selector('case-viewer-component|sub-nav-link'));
            expect(linkElements.length).toEqual(3);
            const linkEl = linkElements[0];
            expect(linkEl.tagName).toEqual('A');
            expect(linkEl.getAttribute('href')).toEqual('/case/SSCS/Benefit/case_id/section_id1');
            expect(linkEl.innerHTML).toEqual('section_name1');
        });
    });

    describe('targetSection', () => {
        it('should set the target section', () => {
            expect(component.sectionId).toEqual('section_id2');
            expect(component.targetSection).toEqual({
                id: 'section_id2',
                name: 'section_name2'
            });
        });

        it('should navigate to the first link if it cannot find the section specified', () => {
            activeRouteMock.params = Observable.of({section: 'bob'});
            TestBed.resetTestingModule();
            setupModule([
                {
                    provide: ActivatedRoute,
                    useValue: activeRouteMock
                }
            ]);
            createComponent();
            expect(routerNavigateSpy).toHaveBeenCalledWith(['section_id1'], {relativeTo: TestBed.get(ActivatedRoute)});
        });
    });


});
