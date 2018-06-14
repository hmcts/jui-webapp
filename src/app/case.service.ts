import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from './config.service';
import {makeStateKey, TransferState} from '@angular/platform-browser';
import 'rxjs/operators/map';

@Injectable()
export class CaseService {

    constructor(private httpClient: HttpClient, private configService: ConfigService, private state: TransferState) {
    }

    fetch(caseId): Observable<Object> {
        const url = `${this.configService.config.api_base_url}/api/cases/${caseId}`;
        const key = makeStateKey(url);
        const cache = this.state.get(key, null as any);
        if (cache) {
            return of(cache);
        }
        return this.httpClient.get(url).map(data => {
            this.state.set(key, data);
            return data;
        });
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
                for (const fieldName in enumColumns) {
                    result.case_fields[fieldName] = enumColumns[fieldName][result.case_fields[fieldName]];
                }
            });
        }

        return data;
    }

    search(): Observable<Object> {
        const url = `${this.configService.config.api_base_url}/api/cases`;
        const key = makeStateKey(url);
        const cache = this.state.get(key, null as any);
        if (cache) {
            return of(cache);
        }
        return this.httpClient
            .get(url)
            .map(data => this.transform(data))
            .map(data => {
                this.state.set(key, data);
                return data;
            });
    }
}
