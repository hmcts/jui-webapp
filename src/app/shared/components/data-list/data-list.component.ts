import {Component, Input, OnChanges} from '@angular/core';

@Component({
    selector: 'app-data-list',
    templateUrl: './data-list.component.html',
    styleUrls: ['./data-list.component.scss']
})
export class DataListComponent implements OnChanges {

    @Input() classes: string ;
    @Input() title: string;
    @Input() dataList: Array<any>;
    newDataList: Array<any>;

    // Todo: the dash '-' need to be moved to the API level one day.
    ngOnChanges(changes): void {
        this.newDataList = this.dataList.map(o => [{text: o.label}, {text: o.value || '-'}]);
    }
}

