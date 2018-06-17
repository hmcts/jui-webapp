import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CaseFileService {
  private readonly apiRoot = 'http://localhost:3000/api';

  constructor(private httpClient: HttpClient) {
  }

  fetch(id: String): Observable<Object> {
    const url = `${this.apiRoot}/cases/${id}`;

    return this.httpClient.get(url);
  }
}
