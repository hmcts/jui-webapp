import {Inject, Injectable} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import {DOCUMENT} from '@angular/common';
import {ConfigService} from './config.service';

@Injectable()
export class CaseFileService {

    constructor(private httpClient: HttpClient,
                private configService: ConfigService) {
    }

    fetch(id: String): Observable<Object> {
        const url = `${this.configService.config.api_base_url}/api/cases/${id}`;

        return this.httpClient.get(url);
    }
}
