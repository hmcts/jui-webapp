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
        this.url = '/demproxy/dm/documents/ff89843f-71a7-49c1-a879-50e3655d8d7c';
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
