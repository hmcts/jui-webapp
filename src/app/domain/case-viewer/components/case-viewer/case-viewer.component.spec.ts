import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CaseViewerComponent } from './case-viewer.component';
import { CaseViewerModule } from '../../case-viewer.module';
import {CUSTOM_ELEMENTS_SCHEMA, DebugElement} from '@angular/core';
import { Selector } from '../../../../../../test/selector-helper';

describe('CaseViewerComponent', () => {
    let component: CaseViewerComponent;
    let fixture: ComponentFixture<CaseViewerComponent>;
    let element: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [CaseViewerModule]
        })
               .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CaseViewerComponent);
        component = fixture.componentInstance;
        element = fixture.debugElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('when no case data is available', () => {
        beforeEach(() => {
            component.case = null;
            component.ngOnChanges({
                case: {
                    currentValue: null
                }
            });
            fixture.detectChanges();
        });

        it('should have no rows', () => {
            expect(element.nativeElement.querySelectorAll(Selector.selector('heading')).length).toBe(0);
        });
    });
});
