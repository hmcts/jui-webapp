import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {
    private subject = new Subject<any>();
    constructor() { }

    newEvent(event) {
        this.subject.next(event);
    }

    get events () {
        return this.subject.asObservable();
    }
}
