import {Component, OnChanges, Input} from '@angular/core';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnChanges {

    @Input() data: Object;

    resultView = {
        columns: [],
        results: []
    };

    displayedColumns() {
        const columns = this.resultView.columns.map(column => column.case_field_id);

        columns.splice(3, 1);
        columns.splice(3, 0, 'state');

        columns.splice(0, 1);
        columns.unshift('case_id');

        return columns;
    }

    ngOnChanges(changes) {
        this.resultView = changes.data.currentValue;
    }
}
