import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseViewerContainerComponent } from './case-viewer-container.component';
import {RouterTestingModule} from '@angular/router/testing';
import {CaseViewerComponent} from '../case-viewer/case-viewer.component';
import {CaseViewerModule} from '../../case-viewer.module';

describe('CaseViewerContainerComponent', () => {
    let component: CaseViewerContainerComponent;
    let fixture: ComponentFixture<CaseViewerContainerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CaseViewerModule, RouterTestingModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CaseViewerContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
