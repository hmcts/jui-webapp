import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-govuk-file-upload',
    templateUrl: './govuk-file-upload.component.html',
    styleUrls: ['./govuk-file-upload.component.scss']
})
export class GovukFileUploadComponent {

    @Input() id = 'file-upload-1';
    @Input() name = 'file-upload-1';
    @Input() label = {
        text: 'Upload a file'
    };

    constructor() { }

}
