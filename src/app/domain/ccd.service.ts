import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/map'

declare function require(name: string);

const mockData = require('./mock.json');


@Injectable()
export class CcdService {

    constructor() {
    }

    getFixedList(listItems) {
        const obj = {};
        listItems.forEach(listItem => {
            obj[listItem.code] = listItem.label;
        });
        return obj;
    }

    transform(data) {
        const enumColumns = {};
        data.columns.forEach(column => {
            if (column.case_field_type.fixed_list_items.length) {
                enumColumns[column.case_field_id] = this.getFixedList(column.case_field_type.fixed_list_items);
            }
        });

        if (Object.keys(enumColumns).length > 0) {
            data.results.forEach(result => {
                for (var fieldName in enumColumns) {
                    result.case_fields[fieldName] = enumColumns[fieldName][result.case_fields[fieldName]];
                }
            });
        }
        return data;
    }

    search(): Observable<Object> {
        return of(JSON.parse(JSON.stringify(mockData))).map(data => {
            return this.transform(data);
        });
    }

}
