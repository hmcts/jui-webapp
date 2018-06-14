import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DMStoreService {
  private readonly apiRoot = 'http://localhost:3000/api';

  constructor(private httpClient: HttpClient) {
  }

  getDoc(id: number): Observable<Object> {
    const url = `${this.apiRoot}/documents/${id}`;

    return this.httpClient.get(url);
  }

}
