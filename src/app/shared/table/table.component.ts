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
        // console.log(this.resultView);
        // this.resultView.columns.sort((a,b) => {
        //     if(a.order > b.order) return 1;
        //     return -1;
        // });
        const columns = this.resultView.columns.map(column => {
            return column.case_field_id
        });
        columns.unshift('case_id');
        return columns;
    }

    constructor() {
    }


    ngOnChanges(changes) {
        // console.log('change!!!', changes);
        var bob = changes.data.currentValue;
        this.resultView = bob;
    }

    // convert(results) {
    //     console.log(results)
    //     const colInfo = {};
    //     results.columns.forEach(column => {
    //
    //     });
    //     console.log(colInfo)
    // }

    ngOnInit() {
        // var bob  = this .getData();
        // this.resultView = this.getData();
        // this.convert(this.resultView);
        // console.log(this.data);
    }

    // getData() {
    //     return data;
    //     // return [{
    //     //     "label": "FamilyMan ref.",
    //     //     "order": 1,
    //     //     "case_field_id": "D8caseReference",
    //     //     "case_field_type": {
    //     //         "id": "D8caseReference-66e1a4cc-950c-4e0a-a630-b733d7712990",
    //     //         "type": "Text",
    //     //         "min": null,
    //     //         "max": null,
    //     //         "regular_expression": "^(EZ|RS|LV|SQ)\\\\d{2}D8\\\\d{4}$",
    //     //         "fixed_list_items": [],
    //     //         "complex_fields": [],
    //     //         "collection_field_type": null
    //     //     }
    //     // }, {
    //     //     "label": "Created Date",
    //     //     "order": 6,
    //     //     "case_field_id": "createdDate",
    //     //     "case_field_type": {
    //     //         "id": "Date",
    //     //         "type": "Date",
    //     //         "min": null,
    //     //         "max": null,
    //     //         "regular_expression": null,
    //     //         "fixed_list_items": [],
    //     //         "complex_fields": [],
    //     //         "collection_field_type": null
    //     //     }
    //     // }];
    // }
}
