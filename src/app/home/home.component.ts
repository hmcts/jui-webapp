import {Component, OnInit} from '@angular/core';
// import {MockServiceService} from '../mock-service.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    data = null;

    baseUrl = '/demproxy/dm/documents';
    docId = '52f55a07-dbc6-4d78-ad8a-0a9bcfec9d76';
    url = `${this.baseUrl}/${this.docId}`;

    constructor() {
    }

    onEnter(value: string) {
        this.docId = value;
        this.url = `${this.baseUrl}/${this.docId}`;
    }

    // getData() {
    //     this.mockService.getData().then(data => {
    //         this.data = data;
    //     });
    // }

    ngOnInit() {
        // this.getData();
    }

}
