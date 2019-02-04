import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {DocumentStoreService} from '../../../shared/services/documentStore/document-store.service';

import {UploadComponent} from './upload.component';
import {Observable} from "rxjs/Rx";
import {mockActivateRoute} from '../../mock/activateRoute.mock';

class MockDocumentStoreService {
    postFileAndAssociateWithCase() {
    }
}

describe('UploadComponent', () => {

    let component: UploadComponent;
    let fixture: ComponentFixture<UploadComponent>;

    const mockDocumentStoreService = new MockDocumentStoreService();

    const blob = new Blob([''], {type: 'text/html'});
    blob['lastModifiedDate'] = '';
    blob['name'] = 'filename';

    const fakeFile = <File>blob;
    const caseId = '42';
    const fileNotes = 'comments on the file contents';

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UploadComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                UploadComponent,
                {
                    provide: ActivatedRoute,
                    useValue: mockActivateRoute
                },
                {provide: DocumentStoreService, useFactory: () => mockDocumentStoreService}
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UploadComponent);
        component = fixture.componentInstance;
    });

    it('should set and get an input file.', () => {

        component.inputFileHandler(fakeFile);

        expect(component.inputFile).toBe(fakeFile);
    });

    it('should send file to document service.', () => {

        spyOn(mockDocumentStoreService, 'postFileAndAssociateWithCase').and.returnValue(Observable.of(true));

        component.postFile(fakeFile, caseId, fileNotes);

        expect(mockDocumentStoreService.postFileAndAssociateWithCase).toHaveBeenCalledTimes(1);
    });
});
