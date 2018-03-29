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

    constructor(private mockService: MockServiceService) {
        this.url = '/demproxy/dm/documents/833ce931-c21f-4f84-84e0-9b80b4291c69';
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
