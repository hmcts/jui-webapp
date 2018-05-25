import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class CaseService {

  constructor(private httpClient: HttpClient) { }


  fetch(): Observable<Object> {
        return this.httpClient.get('http://localhost:3000/api/cases/bob');
  }
}
