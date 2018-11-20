import {Component, Input, OnInit} from '@angular/core';
import {DocumentStoreService} from '../../services/documentStore/document-store.service';
import {RedirectionService} from '../../../routing/redirection.service';

@Component({
  selector: 'app-document-upload',
  templateUrl: './document-upload.component.html',
  styleUrls: ['./document-upload.component.scss']
})
export class DocumentUploadComponent implements OnInit {

    @Input() redirect = '/';
    error: string;
    fileToUpload: File = null;

    constructor(private documentService: DocumentStoreService, private redriectService: RedirectionService) {}

    ngOnInit(): void {
    }

    handleFileInput(file: File) {
        this.fileToUpload = file;
        this.error = null;
    }

    uploadDocument() {
        if (this.fileToUpload) {
            this.postFile();
        } else {
            this.error = new Error('You have not selected a file for upload.').message;
        }
    }

    postFile() {
        const metadataObj: Map<string, string> = new Map<string, string>();
        // metadataObj.set('title', 'some random Title');
        // metadataObj.set('author', 'Joe');
        // metadataObj.set('cake', 'yesplease');

        this.documentService.postFile('PRIVATE', metadataObj, this.fileToUpload)
            .subscribe( () => this.gotoRedirect(),
                err => { this.error = err; }
            );
    }

    gotoRedirect() {
        this.redriectService.redirect(this.redirect);
    }

    cancelUpload() {
        this.gotoRedirect();
    }


}
