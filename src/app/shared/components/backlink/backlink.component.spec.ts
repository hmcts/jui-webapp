import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BacklinkComponent } from './backlink.component';
import {SharedModule} from '../../shared.module';
import {RouterTestingModule} from '@angular/router/testing';
import {DomainModule} from '../../../domain/domain.module';
import {BrowserTransferStateModule} from '@angular/platform-browser';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('BacklinkComponent', () => {
    let component: BacklinkComponent;
    let fixture: ComponentFixture<BacklinkComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SharedModule, HttpClientTestingModule, RouterTestingModule],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BacklinkComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
