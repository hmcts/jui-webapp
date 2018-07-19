import {Component} from '@angular/core';
import {Location} from '@angular/common';

@Component({
    selector: 'app-backlink',
    templateUrl: './backlink.component.html',
    styleUrls: ['./backlink.component.scss']
})
export class BacklinkComponent {


    constructor(private location: Location) {}

    back() {
        this.location.back();
    }

}
