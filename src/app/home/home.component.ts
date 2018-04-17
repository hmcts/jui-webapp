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
    docId = '59940c1b-f154-41a2-9d46-b4bfea9409a2';

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
