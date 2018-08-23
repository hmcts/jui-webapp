import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-data-list',
    templateUrl: './data-list.component.html',
    styleUrls: ['./data-list.component.scss']
})
export class DataListComponent implements OnInit {
    @Input() title;
    @Input() dataList = [];
    newDataList = [];

    ngOnInit(): void {
        // TODO: need to refactor this at the api level
        this.newDataList = this.dataList.map(o => [{text: o.label}, {text: o.value}]);
    }
}

