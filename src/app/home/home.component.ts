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
    docId = 'f025b6d5-c8ae-43f7-b883-374c02a38b17';

    constructor(private mockService: MockServiceService) {
        this.url = `${this.baseUrl}/${this.docId}`;
    }

    onEnter(value: string) {
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
