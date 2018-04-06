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
        this.url = '/demproxy/dm/documents/b2ea8421-be90-4902-bd88-23fdddf4e28c';
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
