import { Injectable } from '@angular/core';
declare function require(name:string);
const mockData = require('./mock.json');

import { Observable } from 'rxjs/Observable';


@Injectable()
export class MockServiceService {

  constructor() { }

  getData() {
      return new Promise(resolve => {
          setTimeout(() => {
              resolve(mockData);
          }, 5000);
      });
  }

}
