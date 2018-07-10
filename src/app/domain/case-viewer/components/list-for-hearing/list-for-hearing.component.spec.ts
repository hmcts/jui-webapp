import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListForHearingComponent } from './list-for-hearing.component';
import {RouterTestingModule} from '@angular/router/testing';

describe('ListForHearingComponent', () => {
    let component: ListForHearingComponent;
    let fixture: ComponentFixture<ListForHearingComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ListForHearingComponent ],
            imports: [RouterTestingModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ListForHearingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
