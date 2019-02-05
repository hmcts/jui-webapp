import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {DocumentStoreService} from '../../../shared/services/documentStore/document-store.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
    redirect = '/';
    uploadForm: FormGroup;
    inputFile: File = null;
    caseId: string;

    userNotSelectedFileError: boolean;

    /**
     * Generic human readable upload error message.
     */
    systemFailedToUploadError: boolean;

    constructor(private documentService: DocumentStoreService,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.parent.params.subscribe(parentParams => {
            this.caseId = parentParams['case_id'];
        });
    }

    /**
     * inputFileHandler
     *
     * @param file
     */
    inputFileHandler(file: File) {

        this.inputFile = file;

        this.userNotSelectedFileError = false;
        this.systemFailedToUploadError = false;
    }

    /**
     * uploadDocument
     *
     * @param file
     * @param fileNotes
     */
    uploadDocument(file: File, fileNotes: string) {

        if (file) {
            this.postFile(file, this.caseId, fileNotes);
        } else {
            this.userNotSelectedFileError = true;
        }
    }

    /**
     * postFile
     *
     * We currently POST the file to the DM Store.
     *
     * @param {File} file
     * @param {String} caseId
     * @param {String} fileNotes
     */
    postFile(file: File, caseId: string, fileNotes: string) {

        this.documentService.postFileAndAssociateWithCase('PRIVATE', caseId, file, fileNotes)
            .subscribe((response) => {
                    console.log(response);
                    //TODO: Where should we redirect to on success?
                },
                (error) => {
                    console.log(error);
                    this.systemFailedToUploadError = true;
                }
            );
    }
}
