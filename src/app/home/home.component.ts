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
    docId = '82dbab2d-20ae-4810-80ad-f7e8a5cc8ef1';
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
