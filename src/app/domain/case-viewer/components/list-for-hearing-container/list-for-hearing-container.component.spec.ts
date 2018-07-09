import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListForHearingContainerComponent } from './list-for-hearing-container.component';
import {RouterTestingModule} from '@angular/router/testing';

describe('ListForHearingContainerComponent', () => {
    let component: ListForHearingContainerComponent;
    let fixture: ComponentFixture<ListForHearingContainerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ListForHearingContainerComponent ],
            imports: [RouterTestingModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ListForHearingContainerComponent);
        component = fixture.componentInstance;
        component.caseId = 123456;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
