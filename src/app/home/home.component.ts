import {Component, OnInit} from '@angular/core';
import {MockServiceService} from '../mock-service.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    data = null;
    url = '';
    baseUrl = '/demproxy/dm/documents';
    // docId = 'c0596ab3-5bd3-46d8-a9da-e367a54d7f15';

    docId = '2d7bd87e-a0f5-4a65-9ffe-bf8ebc05330f';


    // 2d7bd87e-a0f5-4a65-9ffe-bf8ebc05330f

    constructor(private mockService: MockServiceService) {
        this.url = `${this.baseUrl}/${this.docId}`;

        setTimeout(() => {

        })
    }

    onEnter(value: string) {
        console.log('bobobobo')
        this.docId = value;
        this.url = `${this.baseUrl}/${this.docId}`;
    }

    getData() {

        this.mockService.getData().then(data => {
            this.data = data;
        });
    }

    ngOnInit() {
        this.getData();
    }

}
