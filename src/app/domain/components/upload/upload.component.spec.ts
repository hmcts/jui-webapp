import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import {DocumentStoreService} from '../../../shared/services/documentStore/document-store.service';

import {UploadComponent} from './upload.component';
import {Observable} from "rxjs/Rx";

class MockDocumentStoreService {
    postFile() {
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
    const caseId = '424242';
    const fileNotes = 'comments on the file contents';

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UploadComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                UploadComponent,
                {provide: DocumentStoreService, useFactory: () => mockDocumentStoreService}
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UploadComponent);
        component = fixture.componentInstance;
    });

    // it('should set and get an input file.', () => {
    //
    //     component.inputFileHandler(fakeFile);
    //
    //     expect(component.inputFile).toBe(fakeFile);
    // });
    //
    // it('should send file to document service.', () => {
    //
    //
    //     spyOn(mockDocumentStoreService, 'postFile').and.returnValue(Observable.of(true));
    //
    //     component.postFile(fakeFile, caseId, fileNotes);
    //
    //     expect(mockDocumentStoreService.postFile).toHaveBeenCalledTimes(1);
    // });

    it('should set and get an input file.', () => {

        component.inputFileHandler(fakeFile);

        expect(component.inputFile).toBe(fakeFile);
    });

    it('should send file to document service.', () => {

        spyOn(mockDocumentStoreService, 'postFile').and.returnValue(Observable.of(true));

        component.postFile(fakeFile, '1', '');

        expect(mockDocumentStoreService.postFile).toHaveBeenCalledTimes(1);
    });


    // Works
    // it('should hook into component class function', () => {
    //
    //     expect(component.testFunction()).toBeFalsy();
    // });

    // Works
    // it('should contain upload new item', () => {
    //     const inputElement: HTMLElement = fixture.nativeElement;
    //     expect(inputElement.textContent).toContain('Upload new item');
    // });
});
